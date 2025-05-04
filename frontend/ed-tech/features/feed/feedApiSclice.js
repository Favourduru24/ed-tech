import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const feedsAdapter = createEntityAdapter({
     
})
 
const initialState = feedsAdapter.getInitialState()

export const feedsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFeeds: builder.query({
          query: ({ searchTerm = '', page = 1, limit = 5 }) => 
            `/feeds?search=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`,
          
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError
          },
          
          transformResponse: responseData => {
            // Transform the data before normalization
            const loadedFeeds = responseData.feeds.map(feed => ({ // Changed from responseData.feed to responseData.feeds
              ...feed,
              id: feed._id // Convert _id to id
            }));
            
            return feedsAdapter.setAll(initialState, loadedFeeds);
          },
          
          providesTags: (result, error, arg) => {
            if(result?.ids){
              return [
                { type: 'Feed', id: 'LIST' },
                ...result.ids.map(id => ({ type: 'Feed', id }))
              ]
            } else {
              return [{ type: 'Feed', id: 'LIST' }]
            }
          }
        }),
        getFeed: builder.query({
            query: (id) => `/feeds/feed/${id}`,
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
            //  keepUnusedDataFor:5,
            transformResponse: responseData => {
                // Single feed response doesn't need .feed property
                return feedsAdapter.setOne(initialState, {
                  ...responseData,
                  id: responseData._id
                });
              },
             providesTags: (result, error, arg) => {
                if(result?.ids){
             return [{type:'Feed', id:'List'},
             ...result.ids.map(id => ({type: 'Feed', id}))
            ]
                }else {
                    return [{type: 'Feed', id: 'List'}]
                }
             }
        }),
          getUserFeed: builder.query({
            query: (id) => `/feeds/user/${id}`,
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
            //  keepUnusedDataFor:5,
             transformResponse: responseData => {
                const loadedFeeds = responseData.map(feed => {
                    feed.id = feed._id
                      return feed 
                })
                return feedsAdapter.setAll(initialState, loadedFeeds)
             },
             providesTags: (result, error, arg) => {
                if(result?.ids){
             return [{type:'Feed', id:'List'},
             ...result.ids.map(id => ({type: 'Feed', id}))
            ]
                }else {
                    return [{type: 'Feed', id: 'List'}]
                }
             }
        }),
          addNewFeed: builder.mutation({
            query: initailFeedsData => ({
                url: '/feeds',
                method: 'POST',
                body: {
                    ...initailFeedsData
                }
            }),
            invalidatesTags: [
                {type:'Feed', id: 'List'}
            ]
          }),
                 updateFeed: builder.mutation({
                  query: ({ id, ...initailFeedsData }) => ({  // Destructure id from arguments
                    url: `/feeds/feed/${id}`,
                    method: 'PATCH',
                    body: initailFeedsData,  // The rest of the data
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json' // Explicitly request JSON
                    }
                  }),
                  transformErrorResponse: (response) => {
                    // Handle HTML errors
                    if (response.data.startsWith('<!DOCTYPE html>')) {
                      return { message: 'Resource not found' };
                    }
                    return response.data;
                  },
             invalidatesTags: (result, error, arg) => {
             return [{type: 'Feed', id: arg.id}]
            }
          }),

          likeFeed: builder.mutation({
            query: (id) => ({
                url: `/feeds/like/${id}`,
                method:'PUT',
            }),
            invalidatesTags: (result, error, arg) => {
             return [{type: 'Feed', id: arg.id}]
            }
          }),

          deleteFeed: builder.mutation({
            query: ({id}) => ({
                url: '/feeds',
                method: 'DELETE',
                body: {
                    id
                }
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Feed', id:arg.id}]
          }),
        }),
        overrideExisting: true
})

export const {  
useGetFeedsQuery,
useGetFeedQuery,
useGetUserFeedQuery,
useAddNewFeedMutation,
useUpdateFeedMutation,
useDeleteFeedMutation,
useLikeFeedMutation,
} = feedsApiSlice

// returns the query result object
export const selectFeedsResult = feedsApiSlice.endpoints.getFeeds.select()

// creates memoized selector
const selectFeedsData = createSelector(
selectFeedsResult,
feedsResult => feedsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllFeeds,
selectById: selectFeedById,
selectIds: selectFeedIds
// Pass in a selector that returns the feeds slice of state
} = feedsAdapter.getSelectors(state => selectFeedsData(state) ?? initialState)

