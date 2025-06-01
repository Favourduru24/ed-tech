"use client"
import { useDeleteFeedMutation, useLikeFeedMutation } from '@/features/feed/feedApiSclice'
import Image from 'next/image'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import {usePathname} from 'next/navigation'
import {useState} from 'react'
import useSocket from '@/features/socket/socket'


     const Feed = ({feed, id}) => {

       const Feature = [
           {
              icons: '/icons/edit.svg',
               name: 'edit' 
            },
              {
              icons: '/icons/delete.svg',
               name: 'delete',
    
             }
          ]


           const [likeFeed, {isLoading}] = useLikeFeedMutation(id)
           const [deleteFeed, {isLoading: delLoading, isSuccess}] = useDeleteFeedMutation()
           const pathname = usePathname()
           const [openModal, setOpenModal] = useState(false)
           const [open, setOpen] = useState(false)
           const [likeCount, setLikeCount] = useState(feed.likes.length);
        const {id: userId, username} = useAuth()

     const handleDelete = async(e) => {
      e.preventDefault()
                 
       await deleteFeed(id) 
   }
     

const { socket, notifications } = useSocket({ userId, username });

const handleLike = async (e) => {
  e.preventDefault();
  try {
    const response = await likeFeed({ id, userId }).unwrap();
    setLikeCount(response.likeCount);
     
    if(userId !== feed.userId._id ) {
      socket?.emit("sendNotification", {
        senderName: username,
        senderId: userId,
        receiverId: feed.userId._id,
        receiverName: feed.userId.username,  // Use the post owner's userId
        postId: id,
        type: 'like'
      });
    }
  } catch (err) {
    console.error('Failed to like:', err);
  }
};
    
 console.log(notifications)

 const handleOpen = () => {
      setOpen((prev) => !prev)
   }
    
    const handleModal = () => {
    setOpenModal((prev) => !prev)
   } 

  return (
      <>
      
        {openModal && <div className='bg-black fixed inset-0 z-50 flex justify-center items-center' key={id}>
             <div className="w-[45rem] h-[12rem] bg-[#1F2225] rounded-xl flex flex-col p-10 justify-center items-center">
                 <form  className='flex flex-col gap-4 flex-grow max-w-[560px] h-full justify-center items-center'>
                      <div className='flex flex-col justify-center w-full items-center'>
                          <p className='font-bold text-4xl font-light leading-12'>Are you sure you want to delete.</p>
                          <p className='text-[#B391F0] text-xl'>This action can't be undone!</p>
                      </div>
                    <div className='flex gap-3 items-center'>
                         <button className='w-24 h-10 bg-red-400 font-semibold rounded-lg cursor-pointer' type='submit' onClick={handleDelete}>Delete</button>
                         <button className='w-24 h-10 bg-[#B391F0] font-semibold rounded-lg cursor-pointer' onClick={handleModal}>Cancel</button>
                    </div>
                 </form>
              </div> 
           </div>}
             <section className='flex flex-col py-3 w-full gap-2' >
                 <div className='rounded-2xl relative bg-dark-200 border-[1.0px] border-[#4B4D4F] flex flex-col p-4' >
                 <div className='flex justify-between items-center mb-2'>
                     <div className='flex gap-2 items-center'>
                       <div className='  bg-black/10 w-16 h-16 rounded-full'>
                  <Image src="/images/user5.png" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                          </div>
                     <p className='text-lg text-white font-semibold'>{feed.userId.username}</p>
                     </div>
                      <div>
                         <div className='flex gap-2 items-center'>
                        <p className='font-semibold font-sans text-white'>4:00 PM</p>
                         </div>
                      </div>
                  </div>
    
                   <div className='p-2 flex flex-col gap-3 ' key={id}>
                     <h2 className='sm:text-4xl font-bold  font-sans capitalize text-gray-300 text-2xl'>{feed?.title}</h2> 
                    <p className='leading-8 text-justify font-sans text-gray-300 text-lg max-sm:text-sm  font-semibold max-w-4xl'>{feed?.description}</p>
                  </div> 
    
                  <div className='flex items-center mt-2 p-2 w-full justify-between'>
                    <div className='flex gap-2 items-center'>
                         <button onClick={handleLike}>
                            {isLoading ? '..' : <Image src="/icons/like.png" height={24} width={24} alt='img' className="cursor-pointer"/>  }
                         </button>
                         <p className="font-zentry-regular font-semibold text-light-100">{likeCount} </p>

                        {/* <Image src="/icons/skill.png" height={24} width={24} alt='img'/> */}
                       <button onClick={handleLike}>
                            <Image src="/icons/comment.png" height={24} width={24} alt='img' className="cursor-pointer"/> 
                         </button>
                         <p className="font-zentry-regular font-semibold text-light-100">{feed?.comment?.length} </p>
                        <Image src="/icons/share.png" height={24} width={24} alt='img'/>
                         
                        {pathname === '/profile' ? (
                          <div className='flex items-center justify-center rounded-full cursor-pointer   hover:rounded-full p-2 shrink-0 relative' >
                          <Image src='/icons/more.png' width={20} height={20} alt='more' className='rotate-90' onClick={handleOpen} />

                          {open && <div className='absolute top-11 p-2 flex w-32 h-10 rounded-full flex justify-between items-center  bg-[#4B4D4F] rounded-full p-2'>
                          {Feature.map((items, index) => (
                          <div className='relative group' key={index}>
                          <span className="absolute top-8 mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-md z-30">{items.name}</span>
                          <Image src={items.icons} height={24} width={24} alt={items.name} className='size-5' onClick={items.name === "delete" ? handleModal : null}/>
                          </div>
                          ))}

           </div> }
           </div> 

                     ) : ''} 
                    </div>
                       <Link href={`/feeds/${feed?._id}`}>
                       <p className='underline font-semibold underline-offset-1 cursor-pointer text-white'>Check out</p>  
                       </Link>
                    </div>  
                    
            </div>
            </section>
      </>

  )
}

export default Feed