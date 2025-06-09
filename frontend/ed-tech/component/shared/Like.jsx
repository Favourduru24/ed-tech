"use client"
import Image from 'next/image'
import {useLikeCommentMutation, useDeleteCommentMutation} from '@/features/comment/commentApiSlice'
import {useState} from 'react'

const Like = ({user, comment, commentId}) => {

     const [likeComment, {isLoading}] = useLikeCommentMutation()
     const [deleteComment, {isLoading: deleteLoading}] = useDeleteCommentMutation()
     const [likeCount, setLikeCount] = useState(comment?.likes?.length || 0)
    
   const handleLike = async (e) => {
  e.preventDefault();
  try {
    const response = await likeComment({ commentId, user}).unwrap();
    setLikeCount(response.likeCount);
  } catch (error) {
    console.error('Like failed:', error);
  }
};

    const handleDeleteComment = async (e) => {
       e.preventDefault()

        await deleteComment(commentId, user)
    }

  return (
    <div className='flex gap-1 items-center'>
         <button className="group relative" onClick={handleLike}>
        <Image src="/icons/like.png" height={24} width={24} alt='img' className="cursor-pointer size-5"/>
        <span className="hidden top-7 absolute z-30 group-hover:flex text-sm text-white bg-gray-700 rounded-sm shadow-md z-30 font-sans p-1">like</span>
        </button>
         <p className="font-zentry-regular font-semibold text-light-100 text-sm ">{likeCount} Likes</p>
            <div className="group relative" onClick={handleDeleteComment}>
           <Image src='/icons/more.png' width={20} height={20} alt='more' className='rotate-90 size-4 cursor-pointer group' />
             <span className="hidden top-7 absolute z-30 group-hover:flex text-sm text-white bg-gray-700 rounded-sm shadow-md z-30 font-sans p-1">delete</span>
             </div>
            </div>
  )
}

export default Like