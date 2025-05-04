"use client"
import Search from '@/components/shared/Search'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import { useState } from 'react'

const Profile = () => {

    const navLinks = [
        {
          label: "Personal Information",
          icon: "/icons/trainings.png",
        },
        {
          label: "All Setting",
          icon: "/icons/trainings.png",
        },
        {
          label: "My Tranings",
          route: "/message",
          icon: "/icons/chat.png",
        }
      ];

    

        const [items, setItems] = useState(navLinks[0]) 

         return (
            <section className='w-full sm:pt-5 pt-5'>
                 <div className=' w-full  h-full rounded-t-2xl '>
               <div className='flex w-full h-full gap-5'>
                 <div className='w-[30%]   bg-[#1F2225] flex flex-col rounded-t-xl h-[90vh] relative sticky top-20'>
                  <nav className='h-full flex-col justify-between md:flex md:gap-4  p-2  rounded-t-xl'>
                                <ul className='hidden w-full flex-col items-start gap-2 md:flex'>
                                       <p className='text-center px-4 text-light-100 py-1'>Account</p>
                                    {navLinks.map((link, index) => 
                                        (
                                          <li  className={`hidden w-full flex-col items-start gap-2 md:flex group ${items.label === link.label ? 'bg-[#B391F0] rounded-lg font-bold text-[#1F2225]' : 'text-[#FAFAFA] items-center cursor-pointer'} `} key={index} onClick={() => setItems(link)}>
                                             <div className='p-16-semibold flex w-full gap-4 p-4 items-center justify-between'>
                                                 {link.label}
                                                 <Image src="/icons/aright.png" height={24} width={24} alt='logo'/>
                                             </div> 
                                          </li>
                                        )
                                    )}
                                </ul>
                  
                                 <ul className='flex justify-center items-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all flex-col'> 
                                   
                                  
                                       {/* const isActive = link.route === pathname  */}
                                          <li className=' w-full flex-col items-start gap-2 md:flex group rounded-lg font-bold text-[#FAFAFA] items-center cursor-pointer'>
                                             <div className='p-16-semibold flex w-full gap-4 p-4 items-center'>
                                                 <Image src="/icons/save.png" height={24} width={24} alt='logo'/>
                                                 Logout
                                             </div> 
                                          </li>
                                 </ul>
                             </nav>
            </div>
            <div className='w-[60%] h-full rounded-t-2xl flex flex-col overflow-hidden bg-[#1F2225] p-3'>
               <div className='gap-2 flex flex-col'>
                  {items.label === 'My Tranings' ? 
                   <>
                   <p className='text-3xl font-thin text-light-100'>Trainings You have taken</p>
                   <p className='text-lg text-light-100'>welcome to Ed-tech!</p> 
                   </>:  ''}
               
                {items.label === 'My Tranings' ?
                 <form className='flex flex-grow'>
                            <div className='flex gap-2 flex-grow  max-w-[300px] rounded-full p-2 bg-black' >
                           <Image src='/icons/search.png' width={28} height={28} alt='search' className='object-cover cursor-pointer'/>
                         <input type="text"  placeholder='What U looking for' className='text-light-100 flex-grow  p-1 rounded-full outline-none'/> 
                         </div>
                    </form> : ''}
               </div>
                 <div className={`${items.label === 'Personal Information' ? 'gap-5 py-10 min-h-[78vh]' : 'gap-5 grid xl:gap-5 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] py-10 min-h-[91vh]'}`}>
                         
                  {items.label === 'My Tranings' ? (
                     <>
                      <div className='bg-black h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F]'>

                      </div>
                       <div className='bg-black h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F]'>
       
                      </div>
                       <div className='bg-black h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F]'>
       
                      </div>
                       <div className='bg-black h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F]'>
       
                      </div>
                       <div className='bg-black h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F]'>
       
                      </div>
                       <div className='bg-black h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F]'>
       
                      </div>
                       
                      </>
                  ) : items.label === 'All Setting' ? (
                     <>
                    <div className='bg-black h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F]'>

                      </div>
                       {/* <div className='bg-black h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F]'>
       
                      </div>
                       <div className='bg-black h-[18rem] rounded-xl border-[1.9px] border-[#4B4D4F]'>
       
                      </div> */}
                      </>
                  ) : (
                    <>
                     <div className='flex flex-col gap-4 w-full'>
                             <div className='  bg-black/10 w-32 h-32 rounded-full'>
                            <Image src="/images/user5.png" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                            </div>
                         <div className='flex gap-4 items-center justify-center w-full'>
                            <div className='bg-black h-28 w-48 rounded-xl flex items-center justify-center'>
                                 <div className='flex flex-col items-center'>
                                <p className='text-light-100 font-sans font-semibold'>Havard University</p>
                                <p className='text-light-100 font-sans'>University</p>
                                 </div>
                            </div>  
                            <div className='bg-black h-28 w-48 rounded-xl flex items-center justify-center'>
                                 <div className='flex flex-col items-center'>
                                <p className='text-light-100 font-sans font-semibold'>Havard University</p>
                                <p className='text-light-100 font-sans'>University</p>
                                 </div>
                            </div>  
                            <div className='bg-black h-28 w-48 rounded-xl flex items-center justify-center'>
                                 <div className='flex flex-col items-center'>
                                <p className='text-light-100 font-sans font-semibold'>4</p>
                                <p className='text-light-100 font-sans'>No of Training</p>
                                 </div>
                            </div>  
                         </div>
                          
                         <div className='flex flex-col gap-4'>
                           <p className='text-light-100 font-sans font-semibold'>Full Name</p>
                            <div className='w-full h-12 bg-black flex items-center p-2 rounded-lg'>
                             <p className='text-light-100 font-sans'>Jane Cooper</p>
                          </div>
                           <p className='text-light-100 font-sans font-semibold'>ID</p>
                            <div className='w-full h-12 bg-black flex items-center p-2 rounded-lg'>
                             <p className='text-light-100 font-sans'>Jane Cooper</p>
                            </div>
                           <p className='text-light-100 font-sans font-semibold'>Email</p>
                            <div className='w-full h-12 bg-black flex items-center p-2 rounded-lg'>
                             <p className='text-light-100 font-sans'>jane@gmail.com</p>
                            </div>
                           <p className='text-light-100 font-sans font-semibold'>Phone</p>
                            <div className='w-full h-12 bg-black flex items-center p-2 rounded-lg'>
                             <p className='text-light-100 font-sans'>+10 889 222 5656</p>
                            </div>
                         </div>

                           <button className='w-32 h-12 p-2 bg-[#4B4D4F] rounded-full backdrop-blur-2xl text-light-100 font-semibold mt-5 cursor-pointer'>
                             Save Changes
                           </button>
                     </div>
                      </>
                  )}
                
                 </div>
            </div>
            </div>
          </div>
        </section>
  )
}

export default Profile