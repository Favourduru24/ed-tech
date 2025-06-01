 "use client"
import { useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import Header from './Header'
import Select from './Select'
import { useAddNewTutorMutation } from '@/features/tutor/tutorApiSlice'
import useAuth from '@/hooks/useAuth'
import { useAddNewQuizMutation } from '@/features/quiz/quizApiSclice'
import { data5, data2} from '@/constants'

const CreateQuiz = ({type}) => {

    const router = useRouter()

    const [addNewTutor, 
      {
         isLoading, 
         isSuccess
      }] = useAddNewTutorMutation()

      const [addNewQuiz, {isLoading: isQuizLoading, isSuccess: isQuizSuccess}] = useAddNewQuizMutation()

      const {id: user} = useAuth()

    const data1 = [
      {
       title: 'Public',
       id: 1
        },
      {
       title: 'Private',
       id: 2
        }
     ]

     const data3 = [
      {
       title: 'Male',
       id: 1
        },
       {
       title: 'Female',
       id: 2
        }
     ]

     const data4 = [
      {
       title: 'Casual',
       id: 1
        },
       {
       title: 'Formal',
       id: 2
        }
     ]

    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [visibility, setVisibility] = useState('')
    const [voice, setVoice] = useState('')
    const [voicePattern, setVoicePattern] = useState('')
    const [duration, setDuration] = useState('')
    const [topic, setTopic] = useState('')
    const [amount, setAmount] = useState('')
    const [level, setLevel] = useState('')

    useEffect(() => {
   if(isSuccess) {
       setName('')
       setDuration('')
       setVisibility('')
       setSubject('')
       setTopic('')
       setVoicePattern('')
       setAmount('')
       router.push('/training')
   }
    }, [router, isSuccess])

     useEffect(() => {
   if(isQuizSuccess) {
       setName('')
       setDuration('')
       setVisibility('')
       setSubject('')
       setTopic('')
       setVoicePattern('')
       setAmount('')
       setLevel('')
       router.push('/quiz')
   }
    }, [router, isSuccess])
    
    const handleCreateTutor = async (e) => {
      e.preventDefault()

       if(!name || !subject || !visibility || !voice|| !voicePattern|| !duration || !topic) {
          return 
       }
         
       await addNewTutor({name, subject, visibility, voice, voicePattern, duration, topic, user}) // user

    }

    const handleCreateQuiz = async (e) => {
      e.preventDefault()

       if(!name || !subject || !visibility || !voice|| !voicePattern|| !duration || !topic || !amount || !level) {
          return 
       }

        await addNewQuiz({name, subject, visibility, voice, voicePattern, duration, topic, amount, level, user}) //user
    }

    

  
     return (
         <>
          <Header title={type === 'quiz' ? 'Create Quiz' : 'Create Tutor'}/>
          <section className='h-full flex flex-col items-center w-full'>
           <form className="flex flex-col sm:py-10 py-5 gap-5 mt-10 sm:mt-0 w-full" onSubmit={type === 'training' ? handleCreateTutor : handleCreateQuiz}>
            <div className="flex sm:flex-row justify-between items-center w-full gap-4 flex-col h-full ">
               <div className="w-full flex gap-2">
                    <Select value={subject} onChange={(value) => setSubject(value)} data={data2} title="Select Subject"/>
               </div>
               <div className="w-full flex gap-2">
                    <Select value={visibility} data={data1} onChange={(value) => setVisibility(value)} title="Select Visibility"/>
               </div>
            </div>
               <div className="w-full sm:mb-0 mb-2">
                   <input type="text" placeholder="Name Your Tutor" className="w-full h-15 bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-gray-500 outline-none font-semibold text-xl font-sans" value={name} onChange={(e) => setName(e.target.value)}/>
               </div>
               <div className="h-48 w-full sm:mb-0 mb-2">
                    <textarea name="textarea" className="w-full h-full bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-gray-500 outline-none font-semibold text-xl font-sans" placeholder='What In particular should i help with.' value={topic} onChange={(e) => setTopic(e.target.value)}/>

               </div>
              <div className="flex justify-between items-center w-full gap-4 h-full sm:flex-row flex-col">
                

                <div className="flex sm:flex-row justify-between items-center w-full gap-4 flex-col h-full ">
               <div className="sm:w-[50%] w-full sm:mb-0 mb-2">
                   <input type="number" placeholder="Estimated duration in minutes" className="w-full h-15 bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-gray-500" value={duration} onChange={(e) => setDuration(e.target.value)} min={1} max={60}/>
               </div>
               <div className="sm:w-[50%] w-full flex gap-2">
                    <Select value={voice} onChange={(value) => setVoice(value)}  data={data3} title="Select Voice"/>
               </div>
            </div>
            
            </div>
                 
               <div className={`${type === 'quiz' ? 'flex sm:flex-row justify-between items-center w-full gap-4 flex-col h-full ' : 'w-full flex gap-2'}`}>
                      { type === 'quiz' && <div className="sm:w-[50%] w-full sm:mb-0 mb-2">
                   <input type="number" placeholder='Estimated number of question in minutes' className="w-full h-15 bg-[#1F2225] border-[1.0px] border-[#4B4D4F] rounded-xl p-2 placeholder:text-gray-500 placeholder:text-sm p-2 placeholder:font-sans placeholder:font-semibold text-gray-500" value={amount} onChange={(e) => setAmount(e.target.value)} min={1} max={60}/>
                 </div> }
                   <div className={`${type === 'quiz' ? 'sm:w-[50%] w-full flex gap-2' : 'w-full'}`}>
                      <Select value={voicePattern} onChange={(value) => setVoicePattern(value)} data={data4} title="Select Style"/>
                    </div> 
                    
               </div>
                <div className='w-full flex gap-2'>
                      <Select value={level} onChange={(value) => setLevel(value)} data={data5} title="Select Level"/>
               </div> 
               <button className="w-[100%] bg-[#9E4B9E] font-semibold h-15 text-white rounded-xl cursor-pointer sm:mt-0 mt-2" type='submit' disabled={isLoading}>
                  {isLoading || isQuizLoading ? '...' : type === 'quiz' ? 'Create Quiz' : 'Create Tutor' } 
               </button>
            </form>
            </section>
          </>
  )
}

export default CreateQuiz