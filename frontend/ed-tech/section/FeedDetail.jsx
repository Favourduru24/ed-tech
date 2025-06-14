"use client"
 import {  useGetFeedQuery, useGetFeedByCategoryQuery} from '@/features/feed/feedApiSclice'
 import {useAddNewCommentMutation, useGetCommentQuery} from '@/features/comment/commentApiSlice'
 import Header from '@/component/shared/Header'
 import Like from '@/component/shared/Like'
import MDEditor from '@uiw/react-md-editor'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import useAuth from '@/hooks/useAuth'
import markdownIt from "markdown-it"
import Feed from './Feed'

const FeedDetail = ({id}) => {

    const {data: feedId, isLoading} = useGetFeedQuery(id)
    const [addComment, {isLoading: isCommentLoading, isSuccess}] = useAddNewCommentMutation()
    const {data, isLoading: loadingComment} = useGetCommentQuery(id)
     const feed = feedId?.entities[id]
    const {data: feedCategory} = useGetFeedByCategoryQuery({id, categoryId: feed?.category?._id})

     const {ids: feedCategoryIds, entities: feedCategoryEntities} = feedCategory || {}

    const [content, setContent] = useState('')

      console.log({feedCategory})
       

     const md = markdownIt()

     const parsedContent = md.render(feed?.pitch || '')

      const {ids, entities} = data || {}

      const {id: user} = useAuth()


     useEffect(() => {
       if(isSuccess) {
         setContent('')
       }
     }, [isSuccess])


     if(isLoading){
         return(
            <p className="text-white font-semibold text-white">Loading...</p>
         )
     }

     const handleComment = async (e) => {
         e.preventDefault()
          if(!content) {
             return
           }
         await addComment({feedId: id, content, user})
     }

      

  return (
    <section className='flex flex-col my-2'>
       <Header title="Explore Feed"/>
       
           <div className='min-h-[100vh] bg-[#1F2225] flex flex-col  p-4 rounded-2xl mt-4'>
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
                       <div className="py-10 px-5 leading-10 text-xl text-gray-300 w-full justify-center flex">
                         {parsedContent ? (
                           <article
                            className='prose max-w-4xl break-all'
                              dangerouslySetInnerHTML={{__html: parsedContent}}
                           />
                         ): <p>No details provided</p>}
                       </div>
                 <div data-color-mode="dark" className='w-[100%] h-[25%] mt-10 relative'>
                        <MDEditor 
                      preview='edit'
                      id="pitch"
                      onChange={(value) => setContent(value)}
                      height={200}
                      width={300}
                      value={content}
                      style={{borderRadius: 20, overflow: 'hidden', backgroundColor: '#1F2225', fontSize: '10px', fontFamily: 'sans-serif'}}
                      previewOptions={{disalloedElement: ['style'], }}
                      textareaProps={{
                       placeholder:
                       "Add comment..."
                      }}
                      />

                    <button className='absolute bottom-4 w-28 h-12 right-10 bg-[#B391F0] p-2 font-bold font-sans rounded-lg cursor-pointer' onClick={handleComment} type='submit' disabled={isCommentLoading}>
                         {isCommentLoading ? '...' : 'Comment' }
                    </button>
                      </div>
                   
                      <div className='flex items-center mt-10 gap-2 mb-5'>
                          <p className='font-semibold font-sans text-2xl'>Comments</p>
                           <div className='bg-[#B391F0] h-7 w-8 flex items-center justify-center rounded-sm font-semibold'>
                                  <p>{ids?.length}</p>
                           </div>
                     </div>
                     <div className='flex flex-col gap-4'>
                              {ids && ids.map((id) => {
                                 const comment = entities[id]
                                  return (
                                     <div className='flex flex-col' key={comment.id}>
                                     <div className='flex gap-3 items-cente mt-5'>
                                                <div className='  bg-black/10 w-16 h-16 rounded-full'>
                                                 <Image src="/images/user5.png" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                               </div>
                                                <div className='flex flex-col '>
                                                <div className='flex leading-0 gap-3 items-center'>
                                                  <p className='text-lg font-semibold text-[#FAFAFA] font-sans relative'>Javascript Mastery<span className="bg-[#B391F0] h-2 w-2 rounded-full flex top-2 absolute -right-3"/></p>
                                                 <p className='text-md font-semibold text-[#B391F0] font-sans ml-2'>Posted on 13:00 min ago</p>
                                                </div>
                                                <p className='mt-2 leading-6 text-[1rem] text-gray-300 font-sans max-w-3xl mb-2'>{comment.content} </p>
                                                    <Like user={user} commentId={comment.id} comment={comment}/>
                                                </div>
                                                 </div>
                                               </div>

                                      )
                                     })}
                                                   
                             </div>
                         <div className='flex items-center mt-10 gap-2 mb-5'>
                          <p className='font-semibold font-sans text-2xl'>Related Feeds</p>
                           <div className='bg-[#B391F0] h-7 w-8 flex items-center justify-center rounded-sm font-semibold'>
                            <Image src='/icons/ask.png' width={20} height={20} alt='more' className='rotate-90 size-5 cursor-pointer group' />
                           </div>
                     </div>
                <div className="flex flex-col items-center w-full">
     <div className="w-full max-w-[70rem]"> {/* Adjust max-width as needed */}
       {feedCategoryIds?.length > 0 ? feedCategoryIds?.map(id => {
       const feed = feedCategoryEntities[id];
        return (
        <Feed feed={feed} id={feed._id} key={feed?._id} />
       )
    }) : <p>No Feed Found!</p>}
  </div>
</div>
            </div> 

                  
    </section>
  )
}

export default FeedDetail





                                  //         {notify && notify.map((comment, index) => {
                                  // return (
                                  //   <div className='flex flex-col' key={index}>
                                  //    <div className='flex gap-3 items-cente mt-5'>
                                  //               <div className='  bg-black/10 w-16 h-16 rounded-full'>
                                  //                <Image src="/images/user5.png" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                  //              </div>
                                  //               <div className='flex flex-col '>
                                  //               <div className='flex leading-0 gap-3 items-center'>
                                  //                 <p className='text-lg font-semibold text-[#FAFAFA] font-sans relative'>Javascript Mastery<span className="bg-[#B391F0] h-2 w-2 rounded-full flex top-2 absolute -right-3"/></p>
                                  //                <p className='text-md font-semibold text-[#B391F0] font-sans ml-2'>Posted on {comment.time} min ago</p>
                                  //               </div>
                                  //               <p className='mt-2 leading-6 text-[1rem] text-gray-300 font-sans max-w-3xl mb-2'>{comment.title} </p>
                                  //                   <Like user={user} commentId={index} comment={comment}/>
                                  //               </div>
                                  //                </div>
                                  //              </div>
                                  //    )
                                  //  })}