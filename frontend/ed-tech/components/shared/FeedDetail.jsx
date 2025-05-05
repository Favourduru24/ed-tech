"use client"
 import {  useGetFeedQuery } from '@/features/feed/feedApiSclice'
import MDEditor from '@uiw/react-md-editor'
import Image from 'next/image'
import { useState } from 'react'

const FeedDetail = ({id}) => {

    const {data: feedId, isLoading} = useGetFeedQuery(id)

     console.log({feedId})

    const feed = feedId?.entities[id]


    const [pitch, setPitch] = useState('')

     if(isLoading){
         return(
            <p className="text-white">Loading...</p>
         )
     }

  return (
    <section className='flex flex-col sm:py-8 py-5'>
           <div className='min-h-[100vh] bg-[#1F2225] flex flex-col  p-4 rounded-2xl '>
           {feed?.image?.cloudinaryUrl && (
         <div className="w-full h-96 rounded-2xl">
         <Image src={feed?.image.cloudinaryUrl} width={1000} height={400} alt='img' className='w-full h-full rounded-2xl object-center'/> 
        </div>
        )}
         
              

             <div className='flex gap-3 items-center mt-10'>
                                      <div className='  bg-black/10 w-16 h-16 rounded-full'>
                                                 <Image src="/images/user5.png" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                               </div>
                                                <div className='flex flex-col leading-0 gap-3'>
                                                  <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>{feed?.userId?.username}</p>
                                                 <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>Posted on Apr 23</p>
                                                </div>
                                             </div> 

                                             <div className='p-2 flex flex-col gap-3 '>
                       <h2 className='text-5xl font-bold  font-sans capitalize text-gray-300 leading-16'>{feed?.title}</h2>
                      <p className='leading-6 text-justify font-sans text-[#B391F0] text-[1rem] max-sm:text-sm italic'><span className='text-white'>#</span>{feed?.category?.name}</p>
                   </div> 
               
                  <p className='mt-2 leading-8 text-2xl  text-light-100 pl-2 font-sans font-normal'>{feed?.description}.</p>
                       <div className="py-10 px-5 leading-10 text-xl text-gray-300">
                         {feed?.pitch}
                       </div>
                 <div data-color-mode="dark" className='w-[100%] h-[30%] mt-10'>
                        <MDEditor 
                      preview='edit'
                      id="pitch"
                      onChange={(value) => setPitch(value)}
                      height={200}
                      width={300}
                      value={pitch}
                      style={{borderRadius: 20, overflow: 'hidden', backgroundColor: '#1F2225', fontSize: '10px', fontFamily: 'sans-serif'}}
                      previewOptions={{disalloedElement: ['style'], }}
                      textareaProps={{
                       placeholder:
                       "Add comment..."
                      }}
                      />
                      </div>
                   
                      <div className='flex items-center mt-10 gap-2 mb-5'>
                          <p className='font-semibold font-sans text-2xl'>Comments</p>
                           <div className='bg-[#B391F0] h-7 w-8 flex items-center justify-center rounded-sm font-semibold'>
                                  <p>25</p>
                           </div>
                     </div>
                     <div className='flex flex-col gap-4'>
                  <div className='flex flex-col'>
                  <div className='flex gap-3 items-cente mt-5'>
                                          <div className='  bg-black/10 w-16 h-16 rounded-full'>
                                                 <Image src="/images/user5.png" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                               </div>
                                                <div className='flex flex-col '>
                                                <div className='flex leading-0 gap-3 items-center'>
                                                  <p className='text-lg font-semibold text-[#FAFAFA] font-sans relative'>Javascript Mastery<span className="bg-[#B391F0] h-2 w-2 rounded-full flex top-2 absolute -right-3"/></p>
                                                 <p className='text-md font-semibold text-[#B391F0] font-sans ml-2'>Posted on Apr 23</p>
                                                </div>
                                                <p className='mt-2 leading-8 text-xl text-light-100 font-sans font-normal max-w-4xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, </p>
                                                   {/* Reply Start */}
                                                <div className='flex flex-col'>
                                              <div className='flex gap-3 mt-5'>
                                                 <div className='  bg-black/10 w-14 h-14 rounded-full'>
                                                 <Image src="/images/user5.png" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                               </div>
                                                <div className='flex flex-col '>
                                                <div className='flex flex-co leading-0 gap-3 items-center'>
                                                  <p className='text-lg font-semibold text-[#FAFAFA] font-sans relative'>Javascript Mastery <span className="bg-[#9E4B9E] h-2 w-2 rounded-full flex top-2 absolute -right-3"/></p>
                                                 <p className='text-md font-semibold text-[#9E4B9E] font-sans ml-2'>Posted on Apr 23</p>
                                                </div>
                                                <p className='mt-2 leading-8 text-lg text-light-100 font-sans font-normal max-w-3xl'>Thank for sharing this with us.</p>
                                                </div>

                                             </div> 
                                          </div>
                                                <div className='flex flex-col'>
                                              <div className='flex gap-3 items-cente mt-5'>
                                                 <div className='  bg-black/10 w-14 h-14 rounded-full'>
                                                 <Image src="/images/user4.png" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                               </div>
                                                <div className='flex flex-col '>
                                                <div className='flex flex-co leading-0 gap-3 items-center'>
                                                  <p className='text-lg font-semibold text-[#FAFAFA] font-sans relative'>Javascript Mastery <span className="bg-[#9E4B9E] h-2 w-2 rounded-full flex top-2 absolute -right-3"/></p>
                                                 <p className='text-md font-semibold text-[#9E4B9E] font-sans ml-2'>Posted on Apr 23</p>
                                                </div>
                                                <p className='mt-2 leading-8 text-lg text-light-100 font-sans font-normal max-w-3xl'>Your post have been inspiring to us</p>
                                                </div>

                                             </div> 
                                          </div>
                                           {/* Reply End */}
                                                </div>
                                       
                                             </div> 
                                              
                                          </div>

                  <div className='flex flex-col'>
                  <div className='flex gap-3 items-cente mt-5'>
                                          <div className='  bg-black/10 w-16 h-16 rounded-full'>
                                                 <Image src="/images/user4.png" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                               </div>
                                                <div className='flex flex-col '>
                                                <div className='flex flex-co leading-0 gap-3 items-center'>
                                                  <p className='text-lg font-semibold text-[#FAFAFA] font-sans relative'>Javascript Mastery <span className="bg-[#B391F0] h-2 w-2 rounded-full flex top-2 absolute -right-3"/></p>
                                                 <p className='text-md font-semibold text-[#B391F0] font-sans ml-2'>Posted on Apr 23</p>
                                                </div>
                                                <p className='mt-2 leading-8 text-xl text-light-100 font-sans font-normal max-w-4xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero.</p>
                                                </div>
                                                

                                             </div> 
                                          </div>
                                          </div>
                  
            </div>    
    </section>
  )
}

export default FeedDetail