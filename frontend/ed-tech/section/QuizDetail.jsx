"use client"
import Header from '@/components/shared/Header'
import Image from 'next/image'

const QuizDetail = ({id}) => {

    
      
  return (
    <section className='flex flex-col'>
     <Header title="Quiz Tutor"/>
       <div className='flex flex-col gap-4 bg-dark-200 py-5 sm:pt-4 rounded-xl'>
        <div className='flex justify-between items-center w-full gap-2 backdrop-blur-lg'>

           <div className='bg-[#1F2225] h-[40rem] w-[50%] rounded-xl flex items-center justify-center'>
              <div className='bg-[#9E4B9E] rounded-full p-1'>
               <div className='rounded-full bg-dark-200 h-30 w-30 flex items-center justify-center relative'>
                  <Image src="/images/ai-avatar.png" width={50} height={50} alt='ai-avatar' className='rounded-full object-contain'/>
                  <div className='flex items-center justify-center rounded-full cursor-pointer bg-[#9E4B9E] hover:rounded-full p-2 shrink-0 absolute -bottom-3 right-0'>
                            <Image src='/icons/white-mic.png' width={20} height={20} alt='white-mic/image' className="size-6"/>
                        </div>
               </div>
               </div>
                 
                 <div className='absolute top-4 flex gap-2 text-white left-4 w-fit h-8 bg-black/40 backdrop-blur-2xl items-center p-2 justify-center rounded-full'>
                    <Image src="/icons/mic.png" width={50} height={50} alt="mic" className='size-6'/>
                     <p className="font-sans font-semibold text-sm text-light-100">Andrian Ai</p>
                 </div>
           </div>


             <div className='bg-[#1F2225] h-[40rem] w-[50%] rounded-xl flex items-center justify-center relative'>
              <div className='bg-[#B391F0] rounded-full p-1'>
               <div className='rounded-full bg-dark-200 h-30 w-30 flex items-center justify-center relative'>
                  <Image src="/images/user5.png" width={80} height={80} alt='ai-avatar' className='rounded-full object-contain'/>
                         <div className='flex items-center justify-center rounded-full cursor-pointer bg-[#B391F0] hover:rounded-full p-2 shrink-0 absolute -bottom-3 right-0'>
                            <Image src='/icons/white-mic.png' width={20} height={20} alt='white-mic/image' className="size-6"/>
                        </div>
               </div>
               </div>

               <div className='absolute top-4 flex gap-2 text-white left-4 w-fit h-8 bg-black/40 backdrop-blur-2xl items-center p-2 justify-center rounded-full'>
                    <Image src="/icons/mic.png" width={50} height={50} alt="mic" className='size-6'/>
                     <p className="font-sans font-semibold text-sm text-light-100">Duru Pristine</p>
                 </div>

               <div className='absolute top-4 flex gap-2 text-white right-4 w-fit h-8 bg-black/40 backdrop-blur-2xl items-center p-2 justify-center rounded-full'>
                    <Image src="/icons/clock.png" width={50} height={50} alt="clock" className='size-6'/>
                     <p className="font-sans font-semibold text-sm text-light-100">4:00</p>
                 </div>
           </div>

      </div>
             <div className='w-full h-24 rounded-xl bg-[#1F2225] flex items-center justify-center'>
                   <div className='flex gap-4 items-center'>
                       <div className='flex items-center justify-center rounded-full cursor-pointer bg-black/40 hover:rounded-full p-2 shrink-0'>
                        <Image src='/icons/mic.png' width={20} height={20} alt='mic/image' className="size-6"/>
                        </div>
                        <div className='flex items-center justify-center rounded-full cursor-pointer bg-destructive-100 hover:rounded-full p-2 shrink-0'>
                            <Image src='/icons/mic-off.png' width={20} height={20} alt='mic-off/image' className="size-6"/>
                        </div>
                  </div>
           </div>
         </div>
     
         
    </section>
  )
}

export default QuizDetail

