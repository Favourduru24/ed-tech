"use client"
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import Category from '@/component/shared/Category'
import Feed from "./Feed"
import Link from 'next/link'
import { useGetFeedsQuery } from '@/features/feed/feedApiSclice'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/libs/utils'
import Header from '@/component/shared/Header'

   const Feeds = ({searchText, cat, date}) => {

   const [query, setQuery] = useState()
   const [page, setPage] = useState(1);
   const loaderRef = useRef();

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const { data, isLoading, isFetching } = useGetFeedsQuery({
  // Query parameters
  searchTerm: searchText,
  category: cat,
  date,
  page, 
  limit: 5,
  
  // RTK Query options
  pollingInterval: 60000,
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true
})

       useEffect(() => {
          const observer = new IntersectionObserver(([entry]) => {

        if (entry.isIntersecting && 
           !isFetching && 
            page < data?.totalPages
       ) {
         setPage(p => p + 1);
       }
     }, { threshold: 0.1 });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [isFetching, data?.totalPages]);

         useEffect(() => {
           const delayDebounce = setTimeout(() => {
               let newUrl = ''
   
                 if(query) {
                   newUrl = formUrlQuery({
                     params: searchParams.toString(),
                     key: 'query',
                     value: query
                   })
                 } else {
                    newUrl = removeKeysFromQuery({
                       params: searchParams.toString(),
                       keysToRemove: ['query']
                    })
   
                 }
   
                router.push(newUrl, {scroll: false})
           }, 300)       
         return () =>  clearTimeout(delayDebounce)
       }, [query, searchParams, router])

     const { ids, entities } =  data || {}

     const buttons = ["All", "Category", "Date +"]
     
     if(isLoading) {
        return (
         <p>Loading...</p>
         )
         }

  return (     
       <> 
              <Header title="Feed" />
     <section className='flex w-full items-center max-2xl:flex-col max-2xl:gap-2 py-5 sm:pt-4'>
       <form className='flex flex-grow bg-[#1F2225] justify-between h-20 items-center max-2xl:rounded-lg p-2 w-full xl:rounded-l-xl'>
       <div className='flex gap-2 flex-grow sm:min-w-[200px] rounded-full p-2 items-center'>
      <Image src='/icons/ask.png' width={28} height={28} alt='search' className='object-cover cursor-pointer'/>
      <input 
        type="text"  
        placeholder='Search or create a post...' 
        onChange={(e) => setQuery(e.target.value)} 
        className='text-white flex-grow p-1 rounded-full outline-none placeholder:text-gray-300 placeholder:text-xl bg-transparent'
      /> 
    </div>
     </form>
     <div className='flex justify-between items-center h-20 p-4 max-2xl:rounded-lg bg-[#1F2225] w-full rounded-r-xl'>
    <div className='h-15 bg-dark p-2 rounded-full'>
      <Category buttons={buttons}/>
       </div>
      <Link href="/feeds/create">
      <button className="text-white bg-[#B391F0] max-md:w-11 w-36 flex items-center justify-center p-2 rounded-full cursor-pointer font-semibold h-11">
       <Image src="/icons/new.png" width={24} height={24} alt='create'/>
        <p className='max-md:hidden'>Create Feed</p>
      </button>
      </Link>
   </div>
  </section>

{/* Centered feed items container */}
  <div className="flex flex-col items-center w-full">
     <div className="w-full max-w-[70rem]"> {/* Adjust max-width as needed */}
      {ids?.length > 0 ? ids?.map(id => {
      const feed = entities[id];
      return (
        <Feed feed={feed} id={feed._id} key={feed._id} />
      )
    }) : <p>No Feed Found!</p>}
  </div>
 </div>

 <div ref={loaderRef} style={{ height: '1px' }} />

{isFetching && (
  <div className="flex justify-center w-full py-4">
    <p>Loading...</p>
  </div>
)}
       </>
  )
}

export default Feeds