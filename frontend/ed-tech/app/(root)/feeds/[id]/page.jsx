import FeedDetail from '@/components/shared/FeedDetail'
import React from 'react'

const Page = async (props) => {

   const { id } = await props.params
  return (
     <FeedDetail id={id}/>
  )
}

export default Page