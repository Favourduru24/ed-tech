import Feeds from "@/section/Feeds"

const Page = async (props) => {

   const searchParams = await props.searchParams

   const searchText = (searchParams?.query) || ''
   const category = (searchParams?.category) || ''

  return (     
    <Feeds searchText={searchText} cat={category}/>    
  )
}

export default Page