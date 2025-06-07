import { apiSlice } from "@/app/api/apiSlice";
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

const commentAdapter = createEntityAdapter({
  selectId: (comment) => comment.id,  // CRITICAL: Tell adapter how to get IDs
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt) // Optional sorting
})
 
const initialState = commentAdapter.getInitialState()

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
  //       getComment: builder.query({
  //           query: ({feedId}) => `/comment/get-comment/${feedId}`,
  //           validateStatus: (response, result) => {
  //             return response.status === 200 && !result.isError;
  //           },
  //           transformResponse: (responseData) => {
  //      const commentsWithIds = responseData.comment.map(comment => ({
  //   ...comment,
  //   id: comment._id  // Explicitly set id from _id
  // }))
  //              return commentAdapter.setAll(
  //   commentAdapter.getInitialState(), // Fresh initial state
  //   commentsWithIds
  // )
  //           },
  //           providesTags: (result, error, arg) => {
  //             if(result?.ids) {
  //               return [
  //                 { type: 'Comment', id: 'List' },
  //                 ...result.ids.map(id => ({ type: 'Comment', id }))
  //               ];
  //             } else {
  //               return [{ type: 'Comment', id: 'List' }];
  //             }
  //           }
  //         }),
    getComment: builder.query({
      query: (feedId) => `/comment/get-comment/${feedId}`, // Remove object destructuring
      transformResponse: (responseData) => {
      const normalizedComments = responseData.comment.map(comment => ({
      ...comment,
      id: comment._id // Ensure consistent ID field
     }));
    
     return commentAdapter.setAll(
      commentAdapter.getInitialState(),
      normalizedComments
    );
  },
  providesTags: (result) =>
    result?.ids 
      ? [
          { type: 'Comment', id: 'LIST' },
          ...result.ids.map(id => ({ type: 'Comment', id }))
        ]
      : [{ type: 'Comment', id: 'LIST' }]
}),
          addNewComment: builder.mutation({
            query: initailCommentData => ({
                url: '/comment/create-comment',
                method: 'POST',
                body: {
                    ...initailCommentData
                }
            }),
            invalidatesTags: [
                {type:'Comment', id: 'List'}
            ]
          }),
         updateComment: builder.mutation({
            query: initailCommentData => ({
                url: '/comment',
                method:'PATCH',
                body: {
                    ...initailCommentData
                }
            }),
            invalidatesTags: (result, error, arg) => {
             return [{type: 'Comment', id: arg.id}]
            }
          }),
          deleteComment: builder.mutation({
            query: ({commentId}) => ({
                url: `/comment/delete-comment/${commentId}`,
                method: 'DELETE',
                body: {
                    commentId
                }
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Comment', id:arg.id}]
          }),
           likeComment: builder.mutation({
         query: ({ commentId }) => ({ // Remove user from body
    url: `/comment/like-comment/${commentId}`,
    method: 'PUT'
  }),
  invalidatesTags: (result, error, { commentId }) => [
    { type: 'Comment', id: commentId },
    { type: 'Comment', id: 'LIST' }
  ]
}),
        }),
        overrideExisting: true

})

export const {  
 useGetCommentQuery,
 useAddNewCommentMutation,
 useUpdateCommentMutation,
 useDeleteCommentMutation,
 useLikeCommentMutation
} = commentApiSlice

// returns the query result object
export const selectCommentResult = commentApiSlice.endpoints.getComment.select()

// creates memoized selector
const selectCommentData = createSelector(
selectCommentResult,
commentResult => commentResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllComments,
selectById: selectCommentById,
selectIds: selectCommentIds
// Pass in a selector that returns the feeds slice of state
} = commentAdapter.getSelectors(state => selectCommentData(state) ?? initialState)

