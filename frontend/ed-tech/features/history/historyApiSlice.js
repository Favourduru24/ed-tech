import { apiSlice } from "@/app/api/apiSlice"
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

const historyAdapter = createEntityAdapter({})
 
const initialState = historyAdapter.getInitialState()

 export const historyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getQuizHistory: builder.query({
            query: () => '/history/get-user-quiz-history',
            validateStatus: (response, result) => {
              return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
              const loadedHistory = responseData.quizHistory.map(history => ({
                ...history,
                id: history._id
              }));
               return {
                quizes: historyAdapter.setAll(initialState, loadedHistory),
                quizsStats: responseData?.stats,
              }
              
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
          getTutorHistory: builder.query({
            query: () => '/history/get-user-tutor-history',
            validateStatus: (response, result) => {
              return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
              const loadedTutorHistory = responseData.tutorHistory.map(history => ({
                ...history,
                id: history._id
              }));
               return {
                tutors: historyAdapter.setAll(initialState, loadedTutorHistory),
                tutorStats: responseData?.stats,
              }
              
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
 useGetQuizHistoryQuery,
 useGetTutorHistoryQuery,
 useAddNewHistoryMutation,
} = historyApiSlice

// returns the query result object
export const selectHistoryResult = historyApiSlice.endpoints.getQuizHistory.select()

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

