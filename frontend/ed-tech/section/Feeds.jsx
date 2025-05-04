"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Category from '@/components/shared/Category'
import Feed from "./Feed"
import Link from 'next/link'
import { useGetFeedsQuery } from '@/features/feed/feedApiSclice'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/libs/utils'

const Feeds = ({searchText, cat}) => {

  const [query, setQuery] = useState()

  const searchParams = useSearchParams()
  const router = useRouter()

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


  const {data} = useGetFeedsQuery({
    searchTerm: searchText,
     category: cat
  })

  const { ids, entities } =  data || {}


  const buttons = ["All", "Category", "Date +"]

  return (     
       <> 
               <section className='flex flex-col justify-end w-full'>
                     <form className='flex flex-grow bg-[#1F2225] justify-between h-20 items-center rounded-xl my-10 p-2'>
                        <div className='flex gap-2 flex-grow max-w-[500px] rounded-full p-2 items-center' >
                       <Image src='/icons/search.png' width={28} height={28} alt='search' className='object-cover cursor-pointer'/>
                     <input type="text"  placeholder='Search or create a post...' onChange={(e) => setQuery(e.target.value)} className='text-white flex-grow  p-1 rounded-full outline-none placeholder:text-gray-300 placeholder:text-xl'/> 
                     </div>
                      <div className='h-15 bg-dark-200 p-2 rounded-full'>
                  <Category buttons={buttons}/>
                  </div>
                   <Link href="/feeds/create">
                   <button className="text-white bg-[#B391F0] w-36 flex items-center justify-center p-2 rounded-full cursor-pointer font-semibold h-11 flex">
                    <Image src="/icons/add.png" width={24} height={24} alt='create'/>
                    Create Feed
                    </button>
                   </Link>
                   </form>
            </section>

            <div>
      {ids?.map(id => {
        const feed = entities[id];
         return (
          <Feed feed={feed} id={id}/>
         )
      })}
    </div>
       </>
  )
}

export default Feeds