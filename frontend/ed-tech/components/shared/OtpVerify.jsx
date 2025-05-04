"use client"
import Image from "next/image"
import {useRef, useState } from "react"

const OtpVerify = () => {

  const inputRef = useRef([])

  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRef.current.length - 1) {
        inputRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
     if(e.key === "Backspace" && e.target.value === "" && index > 0) {
        inputRef.current[index - 1].focus()
     }
  }

  const handlePaste = (e) => {
      const paste = e.clipboardData.getData('text')
      const pasteArray = paste.split('')
      console.log({pasteArray})
       pasteArray.forEach((char, index) => {
         if(inputRef.current[index]) {
             inputRef.current[index].value = char
         }
       })

  }
 
  return (
    <form className='rounded-2xl lg:min-w-[56px] mx-20'>
    <div className='flex-col flex gap-2   py-14 sm:px-10 rounded-2xl mx-5 bg-gradient-to-b from-[#1A1C20] to-[#08090D] border-[1.9px] border-[#4B4D4F] '>
         <div className="flex flex-col w-full items-center ">
         <h2 className="text-2xl font-bold md:text-[36px] leading-10 uppercase font-sans text-light-100">Otp Verification</h2>
         <p className="text-light-100 !font-normal leading-10">Enter the 6-digit code sent to your email</p>
         </div>
          
          <div className="flex gap-2 items-center mb-6 sm:justify-between px-10 sm:gap-4" onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
                <input type="text" maxLength="1" key={index} required className="w-14 h-14 bg-dark-200 max-md:w-10 max-md:h-10 border-[1.0px] border-[#4B4D4F] text-white text-center text-2xl rounded-lg" placeholder="0" ref={e => inputRef.current[index] = e} onInput={(e) => handleInput(e, index)} onKeyDown={(e) => handleKeyDown(e, index)}/>
            ))}
          </div>
         
     <button type="submit" className="inline-block px-7 py-4 font-bold  leading-5 text-white transition-colors duration-150 bg-[#9E4B9E] border border-transparent rounded-lg shadow-sm focus:outline-none focus:shadow-2xl active:bg-[#9E4B9E] hover:bg-[#b46eb4] min-w-28 cursor-pointer items-center justify-center overflow-visible text-lg mx-5">
    <p className="font-semibold">Verify Otp</p>
    </button>
      <div className="flex items-end gap-2 w-full justify-end pb-0.5 px-5">
    <p className='text-center text-light-100 !font-normal text-sm'> 
        did not recieve the otp 
    </p>
       <div className="text-[#b46eb4] text-xl underline cursor-pointer" type="submit">Resend</div>
    </div>
    </div>
   </form>
  )
}

export default OtpVerify