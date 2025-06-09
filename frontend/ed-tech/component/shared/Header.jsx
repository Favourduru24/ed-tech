 "use client"
import useAuth from '@/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'
import useSocket from "@/features/socket/socket";

const Header = ({title}) => {

      //  const {username, id: userId} = useAuth()

        // const { socket, notifications: header } = useSocket({ username, userId });
      //  console.log({header})

   return (
    <div className='sm:h-16 h-8 w-full flex items-center justify-between py-10 sm:py-10'>
         <div>
         <p className='text-light-100 text-2xl capitalize font-semibold'>{title}</p>
         {/* <p>{username}</p> */}
         </div>

          <div className='flex gap-4 items-center'>
          <div className='flex gap-2 items-center bg-[#1F2225] p-2 rounded-full backdrop-blur-xl cursor-pointer hover:bg-black/70'>
              <Image src='/icons/training.png' width={20} height={20} alt='star' />
               <p className='text-[#FAFAFA] text-sm'>420</p>
          </div>
              <Link href='/training'>
              <div className='flex gap-2 items-center bg-[#9E4B9E] px-4 py-2 rounded-full cursor-pointer'>
              <Image src='/icons/new.png' width={20} height={20} alt='star' />
               <p className='text-[#FAFAFA] text-sm font-semibold'>Create</p>
          </div>
              </Link>
          
          <div className='flex gap-2 items-center rounded-full backdrop-blur-xl cursor-pointer relative hover:bg-[#1F2225] hover:rounded-full p-2'>
              <Image src='/icons/notify.png' width={24} height={24} alt='notification' />
                <div className='bg-[#B391F0] h-5 w-5 items-center justify-center rounded-full absolute -top-1 -right-2 flex'>
                {/* <p className='text-[#FAFAFA] text-sm '>{header ? header?.length : ''}</p> */}
                </div>
          </div>
          </div>
    </div>
  )
}

export default Header