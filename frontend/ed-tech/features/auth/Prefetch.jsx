"use client"
import { useEffect } from 'react'
import { usersApiSlice } from '../user/usersApiSlice'
import {feedsApiSlice} from '../feed/feedApiSclice'
import { store } from '@/app/store'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'



const Prefetch = ({children}) => {
    const token = useSelector(selectCurrentToken)

    useEffect(() => {
      if (!token) return

        console.log('subscribing')
       const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
       const feeds = store.dispatch(feedsApiSlice.endpoints.getFeeds.initiate())

        return () => {
            console.log('unsubscribing')
            users.unsubscribe()
            feeds.unsubscribe()
        }
    }, [token])

    return <>{children}</>
     
}

export default Prefetch