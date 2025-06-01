import { apiSlice } from "@/app/api/apiSlice"
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

const historyAdapter = createEntityAdapter({})
 
const initialState = historyAdapter.getInitialState()

export const historyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getHistory: builder.query({
            query: () => '/history/get-user-history',
            validateStatus: (response, result) => {
              return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
              const loadedHistory = responseData.userHistory.map(history => ({
                ...history,
                id: history._id
              }));
              return historyAdapter.setAll(initialState, loadedHistory);
            },
            providesTags: (result, error, arg) => {
              if(result?.ids) {
                return [
                  { type: 'History', id: 'List' },
                  ...result.ids.map(id => ({ type: 'History', id }))
                ];
              } else {
                return [{ type: 'History', id: 'List' }];
              }
            }
          }),
          addNewHistory: builder.mutation({
            query: initailHistoryData => ({
                url: '/history/add-user-history',
                method: 'POST',
                body: {
                    ...initailHistoryData
                }
            }),
            invalidatesTags: [
                {type:'History', id: 'List'}
            ]
          }),
          }),
        overrideExisting: true

})

export const {  
 useGetHistoryQuery,
 useAddNewHistoryMutation,
} = historyApiSlice

// returns the query result object
export const selectHistoryResult = historyApiSlice.endpoints.getHistory.select()

// creates memoized selector
const selectHistoryData = createSelector(
selectHistoryResult,
historyResult => historyResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllHistorys,
selectById: selectHistoryById,
selectIds: selectHistoryIds
// Pass in a selector that returns the feeds slice of state
} = historyAdapter.getSelectors(state => selectHistoryData(state) ?? initialState)

