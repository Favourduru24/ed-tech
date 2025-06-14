import React from 'react'
import '../globals.css'

const AuthLayout = ({children}) => {
  return (
      <div className='bg-[#1F2225]'>
    <div className='flex items-center justify-center mx-auto max-w-7xl min-h-screen max-sm:px-4 max-sm:py-8 dark'>
       {children}
    </div>
    </div>
  )
}

export default AuthLayout

// bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33]