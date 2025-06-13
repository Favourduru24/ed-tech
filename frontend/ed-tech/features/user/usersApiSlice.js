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
         verifyEmail: builder.mutation({
           query: initailUsersData => ({
               url: 'auth/verify-account',
               method: 'POST',
               body: {
                   ...initailUsersData
               }
           }),
           invalidatesTags: [
               {type:'User', id: 'List'}
           ]
         }),
         updateUserProfile: builder.mutation({
            query: ({ profilePics, userId }) => ({  // Destructure id from arguments
             url: '/users/profile-pic',
             method: 'PUT',
             body: { profilePics }
            }),
              async onQueryStarted(args, {queryFulfilled, dispatch}) {
                           try {
            
                             const {data: updateProfile} = await queryFulfilled
            
                             console.log({updateProfile})
                             console.log({args})
            
                              dispatch (
                                apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
                                  console.log({draft})

                                   let project = draft?.find((item) => item?.id === args?.id)
                                   project.profilePics = updateProfile?.profilePics

                                })
            
                              )
            
                           } catch(error) {
                            console.log('Something failed in the updateProfile mutation', error)
                           }
                        }
              // invalidatesTags: (result, error, arg) => {
              // return [{type: 'User', id: arg.id}]
              // }
               }),
     }),
       overrideExisting: true
        })

     export  const {
        useGetUsersQuery,
        useAddNewUserMutation,
        useVerifyEmailMutation,
        useUpdateUserProfileMutation
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
   