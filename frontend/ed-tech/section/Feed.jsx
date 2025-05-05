import Image from 'next/image'
import Link from 'next/link'

const Feed = ({feed, id}) => {


   
  return (
    <section className='flex flex-col sm:py-5 py-10 w-full gap-4' >
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
                     <h2 className='text-4xl font-bold  font-sans capitalize text-gray-300'>{feed.title}</h2> 
                    <p className='leading-8 text-justify font-sans text-gray-300 text-lg max-sm:text-sm  font-semibold max-w-4xl'>{feed.description}</p>
                  </div> 
    
                  <div className='flex items-center mt-2 p-2 w-full justify-between'>
                    <div className='flex gap-2 items-center'>
                     <Image src="/icons/like.png" height={24} width={24} alt='img'/>
                        {/* <Image src="/icons/skill.png" height={24} width={24} alt='img'/> */}
                        <Image src="/icons/comment.png" height={24} width={24} alt='img'/>
                        <Image src="/icons/share.png" height={24} width={24} alt='img'/>
                        <Link href={`/feeds/${feed?._id}/update`}>
                        <div className='flex items-center justify-center rounded-full cursor-pointer hover:bg-black hover:rounded-full p-2 shrink-0'>
                        <Image src='/icons/more.png' width={20} height={20} alt='more' className='rotate-90' />
                        </div>
                        </Link>
                    </div>
                       <Link href={`/feeds/${feed._id}`}>
                       <p className='underline font-semibold underline-offset-1 cursor-pointer text-white'>Check out</p>  
                       </Link>
                    </div>  
                    
            </div>
            </section>
  )
}

export default Feed