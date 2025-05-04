import React from 'react'

const Training = () => {
  return (
    <section className='sm:py-10 py-10 flex flex-col gap-8'>
      <div className='flex justify-between items-center w-full gap-4'>
           <div className='bg-[#1F2225] h-[30rem] w-[50%] rounded-xl border-[1.9px] border-[#B391F0]'>

           </div>
           <div className='bg-[#1F2225] h-[30rem] w-[50%] rounded-xl border-[1.9px] border-[#4B4D4F]'>
          
           </div>
      </div>
        
        <div className='flex flex-col justify-center items-center gap-8'>
           <div className='w-full h-12 rounded-xl bg-[#1F2225] flex items-center justify-center'>
              <p className='text-light-100 font-semibold text-center '>.....</p>
           </div>

            <div className='flex gap-2 items-center justify-center'>
                {/* <button className='w-28 h-10 bg-red-400 rounded-full cursor-pointer'>
                       <p className='font-semibold'>End Call</p>
                </button> */}
                <button className='w-52 h-10 bg-[#9E4B9E] rounded-full cursor-pointer'>
                <p className='font-semibold text-light-100'>Prep For Anything!</p>
                </button>
            </div>
        </div>
    </section>
  )
}

export default Training