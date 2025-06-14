'use client'
import Header from '@/component/shared/Header'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGetQuizQuery } from '@/features/quiz/quizApiSclice'
import TutorCategory from '@/component/shared/TutorCategory'
import { formUrlQuery, removeKeysFromQuery } from '@/libs/utils'
import { useSearchParams, useRouter } from 'next/navigation'
import Pagination from '@/component/shared/Pagination'

const Quiz = ({level, subject, query, page, urlParamName}) => {

 const [search, setSearch] = useState('') 
 const searchParams = useSearchParams()
 const router = useRouter()

 const buttons = ["Category", "Level"]

 const {data, isLoading} = useGetQuizQuery({
   level,
   subject,
   search: query,
   page,
   limit: 9
 })
   console.log({data})
   const {ids, entities} = data?.quizes || {}
    

        useEffect(() => {
                const delayDebounce = setTimeout(() => {
                    let newUrl = ''
        
                      if(search) {
                        newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: 'search',
                          value: search
                        })
                      } else {
                         newUrl = removeKeysFromQuery({
                            params: searchParams.toString(),
                            keysToRemove: ['search']
                         })
        
                      }
        
                     router.push(newUrl, {scroll: false})
                }, 300)       
              return () =>  clearTimeout(delayDebounce)
            }, [search, searchParams, router])


    if(isLoading){
         return(
            <p className="text-white">Loading...</p>
         )
     }

    

  return (
    <>
         <Header title="Explore Quizes"/>
     
       <section className='flex w-full items-center max-2xl:flex-col max-2xl:gap-2 py-5 sm:pt-4'>
      <form className='flex flex-grow bg-[#1F2225] justify-between h-20 items-center max-2xl:rounded-lg p-2 w-full xl:rounded-l-xl'>
        <div className='flex gap-2 flex-grow sm:min-w-[200px] rounded-full p-2 items-center'>
          <Image src='/icons/ask.png' width={28} height={28} alt='search' className='object-cover cursor-pointer'/>
          <input 
            type="text"  
            placeholder='Search or create a quiz...' 
            onChange={(e) => setSearch(e.target.value)} 
            className='text-white flex-grow p-1 rounded-full outline-none placeholder:text-gray-300 placeholder:text-xl bg-transparent'
          /> 
        </div>
      </form>
      <div className='flex justify-between items-center h-20 p-4 max-2xl:rounded-lg bg-[#1F2225] w-full rounded-r-xl'>
        <div className='h-15 bg-dark p-2 rounded-full'>
          <TutorCategory buttons={buttons}/>
        </div>
        <Link href="/quiz/create">
          <button className="text-white bg-[#B391F0] w-11  flex items-center justify-center p-2 rounded-full cursor-pointer font-semibold h-11">
            <Image src="/icons/new.png" width={24} height={24} alt='create'/>
          </button>
        </Link>
      </div>
    </section>

       <section className='py-5 sm:pt-3'>
                       
                   {ids?.length > 0 ?
                    <div className="flex flex-col items-center gap-5 grid">
                      <div className='gap-5 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] py-10'>
                        {ids.map((id) => {
                          const quiz = entities[id]
                                     return (
                                   
                                               <div className=' bg-[#1F2225] h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F] flex flex-col p-2 justify-center' key={quiz?._id}>
                                           <div className='flex gap-3 items-start'>
                                             <div className='  bg-black/10 w-16 h-16 rounded-full'>
                                                      <Image src="/images/user5.png" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                                </div>
                                                     <div className='flex flex-col leading-0 gap-2 mt-1'>
                                                       <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>{quiz?.userId?.username}</p>
                                                      <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>pro</p>
                                                     </div>
                                              </div>
                                                <div className='flex flex-col pt-4 pb-2'>
                                                 <p className='text-xl font-semibold leading-8 text-light-100'>{quiz.subject} Quiz<br/>  With {quiz.name}  </p>
                                                 <p className='text-lg font-semibold font-sans  text-light-100 '>Topic: <span className='text-md text-base leading-6 text-white font-sans lowercase font-normal max-w-72'>{quiz.topic}.</span></p>
                                                </div>
                                                <div className="flex items-center justify-between my-1">
                                                       <Link href={`/quiz/${quiz._id}`}>
                                                          <div className="w-30 h-10 flex items-center justify-center font-semibold rounded-full bg-[#9E4B9E] backdrop-blur-xl cursor-pointer">
                                                           <p className="text-[#FAFAFA]">Start</p>
                                                          </div>
                                                       </Link>
                                                         <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#696060]  ">
                                                           <p className="text-[#FAFAFA]">{quiz.duration}min</p>
                                                          </div>
                                                 </div>
                                                 
                            </div>
                                   )
                          })} 
                            </div>
                              {data?.totalPages > 1 && <Pagination page={page} urlParamName={urlParamName} totalPages={data.totalPages}/>}
                              {/* totalPages={} */}
                           </div>
                          : ''}
                                       
            </section>
    </>

  )
}

export default Quiz