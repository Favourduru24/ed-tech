import { apiSlice } from '@/app/api/apiSlice'
import {createEntityAdapter, createSelector} from '@reduxjs/toolkit'

 const usersAdapter = createEntityAdapter({})
 const initialState = usersAdapter.getInitialState()

  export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
       getUsers: builder.query({
           query: () => '/users',
            validateStatus: (response, result) => {
                   return response.status === 200 && !result.isError
            },
           //  keepUnusedDataFor:5,
           transformResponse: responseData => {
               const usersArray = responseData.users || []
            const loadedUsers = usersArray.map(user => {
              user.id = user._id
              return user
            })
            return usersAdapter.setAll(initialState, loadedUsers)
          },
            providesTags: (result, error, arg) => {
               if(result?.ids){
            return [{type:'User', id:'List'},
            ...result.ids.map(id => ({type: 'User', id}))
           ]
               }else {
                   return [{type: 'User', id: 'List'}]
               }
            }
       }),
       
         addNewUser: builder.mutation({
           query: initailUsersData => ({
               url: '/users',
               method: 'POST',
               body: {
                   ...initailUsersData
               }
           }),
           invalidatesTags: [
               {type:'User', id: 'List'}
           ]
         }),
    }),
  })

 export  const {
    useGetUsersQuery,
    useAddNewUserMutation
  } = usersApiSlice


  export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

  const selectUsersData = createSelector(
   selectUsersResult,
   usersResult => usersResult.data
  )

   export const {
       selectAll: selectAllUsers,
       selectIds: selectUsersIds,
       selectById: selectUsersById
     } = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
   