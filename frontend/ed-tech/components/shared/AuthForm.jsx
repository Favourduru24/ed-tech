"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAddNewUserMutation } from "@/features/user/usersApiSlice"
import { useRouter } from "next/navigation"
import { useLoginMutation } from "@/features/auth/authApiSlice"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/features/auth/authSlice"
import usePersist from "@/hooks/usePersist"


const AuthForm = ({type}) => {


   const [loginUser, {
    isLoading: loginLoading,
     isError: loginIsError,
     isSuccess: loginIsSuccess,
     error: loginError,
     
    }] = useLoginMutation()

         const 
         [addNewUser,
           {isLoading,
           isError,
           error,
           isSuccess }] = useAddNewUserMutation()


          const [errMsg, setErrMsg] = useState('')
          const [persist, setPersist] = usePersist()


     const [form, setForm] = useState({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
     })
         
    const router = useRouter()
   const dispatch = useDispatch()


       const isSignIn = type === 'sign-in'

         
            useEffect(() => {
               if(isSuccess || loginIsSuccess) {
                 setForm({
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword:""
                 })

                 router.push(`${isSignIn ? '/' : 'sign-in'}`)
               }
            }, [isSuccess, router, loginIsSuccess])

             useEffect(() => {
               if(errMsg) {
                 setErrMsg('')
               } 
             },[form])
        

        const handleSignIn = async (e) => {
          e.preventDefault()
              await addNewUser({username: form.username, email: form.email, password: form.password, confirmPassword: form.confirmPassword})
       }
            
       const handlePersist = (e) => {
        setPersist(e.target.checked)  // Updates the persist state with the checkbox value
      }
      

        const handleLogin = async (e) => {
           e.preventDefault()

            try {
              const  {accessToken } = await loginUser({email: form.email, password:form.password}).unwrap()
        dispatch(setCredentials({ accessToken }))

            } catch (err) {
              if (!err.status) {
                setErrMsg('No Server Response!`');
            } else if (err.status === 400) {
                setErrMsg('All field required!');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized!');
            } else if(loginIsError){
                setErrMsg(loginError.data?.message);
            }else{
                 setErrMsg(err.data?.message)
            }
            }
        }


        

  return (
    <form className='bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] p-0.5 rounded-2xl w-fit lg:min-w-[566px]' onSubmit={isSignIn ? handleLogin: handleSignIn}>
    <div className='flex-col flex gap-2 bg-gradient-to-b from-[#1A1C20] to-[#08090D] py-14 sm:px-10 rounded-2xl px-5 '>
       <div className='w-full space-y-4 mt-4 w-full flex flex-col mb-5'>
           {!isSignIn && <label className='flex flex-col gap-2'>
            <p className='text-light-100 !font-normal'>Username</p>
          <input type='text' className='!bg-dark-200 !rounded-lg !min-h-12 !px-5 placeholder:!text-light-100 placeholder:text-sm placeholder:text-sm text-white' placeholder='Username' value={form.username} onChange={(e) => setForm({...form, username: e.target.value})}  autoComplete="name"/>
          </label> }
           <label className='flex flex-col gap-2'>
            <p className='text-light-100 !font-normal'>Email</p>
          <input type='email' className='!bg-dark-200 !rounded-lg !min-h-12 !px-5 placeholder:!text-light-100 placeholder:text-sm text-white' placeholder='email@gmail.com' value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} autoComplete="email"/>
          </label>
           <label className='flex flex-col gap-2'>
            <p className='text-light-100 !font-normal'>Password</p>
          <input type='password' className='!bg-dark-200 !rounded-lg !min-h-12 !px-5 placeholder:!text-light-100 placeholder:text-sm text-white' placeholder='Password' value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
          </label>
           {!isSignIn && <label className='flex flex-col gap-2'>
            <p className='text-light-100 !font-normal'>Comfirm Password</p>
          <input type='password' className='!bg-dark-200 !rounded-lg !min-h-12 !px-5 placeholder:!text-light-100 placeholder:text-sm text-white' placeholder='*********' value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})}/>
          </label>}
           {loginIsError || isError && (
       <div className='bg-destructive-100/15 p-2 rounded-md flex items-center gap-2 text-md break-all '>
          <div className='flex items-center justify-center gap-1'>
           <Image src="/icons/error.png" width={24} height={24} alt="error/image" className="shrink-0"/>
           <p className='text-destructive-200 font-semibold font-serif '>{isError ? error?.data?.message : ''}</p>
          <p className='text-destructive-200 font-semibold font-serif'>{loginIsError ? errMsg : ''}</p>

            </div>
       </div>
           )}
           {loginIsError && errMsg && (
       <div className='bg-destructive-100/15 p-2 rounded-md flex items-center gap-2 text-md break-all '>
          <div className='flex items-center justify-center gap-1'>
           <Image src="/icons/error.png" width={24} height={24} alt="error/image" className="shrink-0"/>
          <p className='text-destructive-200 font-semibold font-serif  max-w-md'>{  errMsg  }</p>

            </div>
       </div>
           )}
            
        
       </div>
         {isLoading || loginLoading ?
         (
          <button type="submit" className="inline-block px-7 py-4 font-bold  leading-5 text-white transition-colors duration-150 bg-[#9E4B9E] border border-transparent rounded-lg shadow-sm focus:outline-none focus:shadow-2xl active:bg-[#9E4B9E] hover:bg-[#b46eb4] min-w-28 cursor-pointer items-center justify-center overflow-visible text-lg">
           Loading...
       </button>
        ) : (
          <button type="submit" className="inline-block px-7 py-4 font-bold  leading-5 text-white transition-colors duration-150 bg-[#9E4B9E] border border-transparent rounded-lg shadow-sm focus:outline-none focus:shadow-2xl active:bg-[#9E4B9E] hover:bg-[#b46eb4] min-w-28 cursor-pointer items-center justify-center overflow-visible text-lg">
          {isSignIn ? 'Sign in' : 'Create an Account'}
       </button>
        )}

             {isSignIn &&
                <div className="flex flex-col gap-1">
              <div className='flex gap-2 mt-3 items-center' >
                         
                        <input type='checkbox'
                         name="checkbox"
                         id="checkbox"
                         onChange={handlePersist}
                         checked={persist}
                         className='cursor-pointer w-5 h-5'
                         />
                        <p className='text-light-100 text-[1rem]'>i Agree to the terms and condition</p>
                        </div>
                        <p className='text-light-100 text-[1rem] underline underline-offset-4 font-normal cursor-pointer'>Forget password!</p>

                        </div>
                        }
        
        <div className='flex gap-2 justify-center items-center mt-5'>

       <button className='!bg-dark-200 h-10 w-10 rounded-full items-center justify-center flex font-bold transition-colors cursor-pointer text-primary-100'>G</button>

       <button className='!bg-dark-200 h-10 w-10 rounded-full items-center justify-center flex cursor-pointer gap-2 text-primary-100'  >
       {/* <Github className='text-blue-500 size-5' /> */}
         <p className=' font-bold transition-color  text-primary-100'>D</p>
       </button>
       <button className='!bg-dark-200 h-10 w-10 rounded-full items-center justify-center flex cursor-pointer gap-2 text-primary-100 font-semibold'  >
       {/* <Github className='text-blue-500 size-5' /> */}
         <p className=' font-bold transition-color  text-primary-100'>F</p>
       </button>
     </div>
        
     <p className='text-center text-light-100 !font-normal'>{isSignIn ? 'No account yet?' : 'Have an account already?'}{' '}
          <Link href={!isSignIn ? "/sign-in" : 'sign-up'} className='underline text-[#9E4B9E]'>
             {!isSignIn ? "Sign in" : "Sign up"} 
          </Link>
        </p>
    </div>
     
</form>
  )
}

export default AuthForm