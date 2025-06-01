import Feeds from "@/section/Feeds"

const Page = async (props) => {

   const searchParams = await props.searchParams

   const searchText = (searchParams?.query) || ''
   const category = (searchParams?.category) || ''
   const date = (searchParams?.date) || ''
  //  const 

  return (     
    <Feeds searchText={searchText} cat={category} date={date}/>    
  )
}

export default Page