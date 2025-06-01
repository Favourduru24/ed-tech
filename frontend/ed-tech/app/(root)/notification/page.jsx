import Notification from '@/section/Notification'
import React from 'react'

const Page = async (props) => {

  const searchParams = await props.searchParams

  const search = (searchParams?.notification) || ''

  return (
    <Notification search={search}/>
  )
}

export default Page