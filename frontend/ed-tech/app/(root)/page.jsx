"use client"
import Button from "@/component/shared/Button"
import Category from "@/component/shared/Category"
import {useGetTutorHistoryQuery, useGetQuizHistoryQuery, useGetTutorStatsQuery, useGetQuizStatsQuery} from "@/features/history/historyApiSlice"
import Header from "@/component/shared/Header"
import {data2} from "@/constants"
import Image from "next/image"
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import StatCard from "@/component/shared/StatCard"
import CustomSelect from "@/component/shared/CustomSelect"
import { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import {Bar, Line} from 'react-chartjs-2'
import {Chart, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement} from 'chart.js'

Chart.register(
 LinearScale,
 CategoryScale,
 BarElement,
 LineElement,
 PointElement,
 Title,
  Tooltip, 
  Legend 
)

 const Dashboard = () => {
  
  //  const {id: user, username} = useAuth()
  const user = 'iisfhsivhsieh23'
  const username = 'Duru Pristine'

   const [date, setDate] = useState(
     new Date(2025, 5, 12)
   )

  const {data: tutorStats} = useGetTutorStatsQuery({userId: user})
  const {data: quizStats} = useGetQuizStatsQuery({userId: user})

  console.log({tutorStats})

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      }
    }
  }

  console.log({quizStats})

  const quizOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      }
    }
  }


  const BarChartData = {
    labels: tutorStats ? tutorStats?.map(stat => stat.subject) : {},
     datasets: [
       {
        label: "Your Tutor monthly progress",
        data: tutorStats ? tutorStats?.map(stat => stat.count) : {},
        borderColor: "#B391F0",
        backgroundColor: ["rbga(255, 99, 132, 0.2)"],
        borderWidth: 1
     },
    ],
  }

  const LineChartData = {
    labels: quizStats ? quizStats?.map(stat => stat.subject) : {},
     datasets: [
       {
        label: "Your Quiz monthly progress",
        data: quizStats ? quizStats.map(stat => stat.count) : {},
        borderColor: "#B391F0",
        backgroundColor: ["rbga(255, 99, 132, 0.2)"],
        borderWidth: 1
     },
    ],
  }

  const [filter, setFilter] = useState('')

    const statCard = {
       totalTutor: 12450,
       totalTutorLessonTaken: {
       currentMonth: 40, lastMonth: 17
      },
       totalQuiz: 3210,
       totalQuizTaken: {
       currentMonth: 15, lastMonth: 20
       },
       totalQuizTakenToday: 200,
       totalTutorLessonTakenToday: 200
    }

    const {totalTutor, totalTutorLessonTaken, totalTutorLessonTakenToday, totalQuiz, totalQuizTaken, totalQuizTakenToday} = statCard


    const {data: userTutorHistory} = useGetTutorHistoryQuery(user)
    const {data: userQuizHistory, isLoading} = useGetQuizHistoryQuery(user)

     if(isLoading) {
       return ( 
       <p>Loading...</p>
      )
      }


        const {ids: historyTutorIds, entities: historyTutorEntities} = userTutorHistory?.tutors || { }
        const {ids: historyQuizIds, entities: historyQuizsEntities} = userQuizHistory?.quizes || {}

        const {currentMonthQuizzes, lastMonthQuizzes, quizCount} = userQuizHistory?.quizsStats || {}
        const {currentMonthLessons, tutorCount, lastMonthLessons} = userTutorHistory?.tutorStats || {}



  return (
    <section className="flex flex-col"> 
        <Header title="Dashboard"/>
        <p className="text-[#FAFAFA] text-2xl font-medium leading-10 sm:pt-1">Welcome, {username}</p>
        <p className="text-light-100 text-md font-sans font-semibold ">Here's is a brief summary of your progress and quizes and lesson taken.</p>

         <div className="w-full bg-[#1F2225] my-10 rounded-2xl flex items-cente p-8 justify-between max-lg:flex-col gap-20 ">
            <div className="flex flex-col gap-4">
                <h2 className="text-white text-4xl font-semibol">Enhance Your Critical Thinking!</h2>
                 <p className="text-gray-300 max-w-md leading-8">Improve your ability to analyze solutions, evaluate information and make logical decisions, Strengthen this essential skill for better problem-solving decision making in everyday life</p>
                  <Button color='#B391F0' otherStyle='max-sm:w-full' title="Start Improving" links="/training"/>
            </div>
                 <div className="flex gap-5">
                 <Image src='/images/robot.png' alt="robotnic" width={280} height={280} className="max-xl:hidden"/>
                 </div>
           </div>
          
             <div className="flex flex-col">
               <div className="w-full flex justify-between items-center">
               <p className="text-[#FAFAFA] text-2xl font-medium leading-16">My Skills & Values</p>
                 <p className="underline text-[#FAFAFA] text-lg outline-b-4 cursor-pointer">See All</p>
               </div>

            <div className="gap-5 grid xl:gap-3 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                 <StatCard 
                   statTitle='Today Lesson taken'
                   total={tutorCount}
                   currentMonthCount={currentMonthLessons}
                   lastMonthCount={lastMonthLessons}
                 />
                 <StatCard 
                   statTitle='Total Quiz taken'
                   total={quizCount}
                   currentMonthCount={currentMonthQuizzes}
                   lastMonthCount={lastMonthQuizzes}
                 />
                 <StatCard 
                   statTitle='Total Quiz taken'
                   total={totalQuiz}
                   currentMonthCount={totalQuizTaken.currentMonth}
                   lastMonthCount={totalQuizTaken.lastMonth}
                 />
             </div>
             </div>

             <div className="flex flex-col mt-5">
             <div className="w-full flex justify-between items-center">
                    <p className="underline text-[#FAFAFA] text-lg outline-b-4 cursor-pointer leading-10">Recently Taken Lesson</p>
                 <p className="underline text-[#FAFAFA] text-lg outline-b-4 cursor-pointer leading-10">Recently Taken Quizes</p>
               </div>
                    
               <div className="grid grid-cols-2 gap-5 max-xl:grid-cols-1">
                        <div className="flex flex-col gap-5">

                      {/* Todo here ... */}
                        
                        {historyTutorIds?.length && historyTutorIds?.slice(0, 3)?.map((id) => {
                          const history = historyTutorEntities[id]
                           return (
                             <div className="bg-[#1F2225] rounded-r-2xl p-5 border-l-4 border-l-[#9E4B9E]" key={history?._id}>
                     <div className="flex justify-between items-center">

                           <div className='flex gap-4 items-start'>
                                             <div className='bg-black/10 w-16 h-16 rounded-full'>
                                                      <Image src="/images/user2.jpg" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                                </div>
                                                     <div className='flex flex-col leading-0 gap-2 mt-1'>
                                                       <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>{history?.userId.username}</p>
                                                      <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>pro</p>
                                                     </div>
                                              </div>

                          <Image src='/icons/book.png' width={24} height={24} alt="book" className="justify-end"/>
                         </div>
                         <div className="flex flex-col">
                          <h2 className="text-[#FAFAFA] mt-3 text-xl font-semibold leading-8 text-light-100">Learn {history.tutorId.subject}<br/>  With {history.tutorId.name}</h2>
                           <p className="text-gray-300 max-w-md text-sm leading-6"><span className="text-[#B391F0] text-lg semibold">Topic: </span>{history.tutorId.topic}</p>
                         </div>
                         <div className="w-full flex justify-between mt-5 items-end">
                         <Button title="Start" color='#B391F0' links={`/training/${history.tutorId._id}`} />
                          <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#696060]  ">
                                                           <p className="text-[#FAFAFA]">{history.tutorId.duration}min</p>
                                                          </div>
                         </div>
                     </div> 
                    
                          )
                        })}
                     
                   
                      {/* End Todo here */}

 
                 </div>

                      <div className="flex flex-col gap-5">

                      {/* Todo here ... */}
                        
                        {historyQuizIds?.length && historyQuizIds?.slice(0, 3)?.map((id) => {
                          const history = historyQuizsEntities[id]
                           return (
                             <div className="bg-[#1F2225] rounded-r-2xl p-5 border-l-4 border-l-[#9E4B9E]" key={history?._id}>
                     <div className="flex justify-between items-center">

                           <div className='flex gap-4 items-start'>
                                             <div className='bg-black/10 w-16 h-16 rounded-full'>
                                                      <Image src="/images/user2.jpg" width={50} height={50} alt='user/image' className='h-full w-full object-cover rounded-full'/>
                                                </div>
                                                     <div className='flex flex-col leading-0 gap-2 mt-1'>
                                                       <p className='text-lg font-semibold text-[#FAFAFA] font-sans '>{history.userId.username}</p>
                                                      <p className='text-[0.8rem] font-semibold text-[#B391F0] font-sans'>pro</p>
                                                     </div>
                                              </div>

                          <Image src='/icons/book.png' width={24} height={24} alt="book" className="justify-end"/>
                         </div>
                         <div className="flex flex-col">
                          <h2 className="text-[#FAFAFA] mt-3 text-xl font-semibold leading-8 text-light-100">{history.quizId.subject} Quiz <br/> With {history.quizId.name}</h2>
                           <p className="text-gray-300 max-w-md text-sm leading-6"><span className="text-[#B391F0] text-lg semibold">Topic: </span>{history.quizId.topic}</p>
                         </div>
                         <div className="w-full flex justify-between mt-5 items-end">
                         <Button title="Start" color='#B391F0' links={`/quiz/${history.quizId._id}`}/>
                          <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#696060]  ">
                                                           <p className="text-[#FAFAFA]">{history.quizId.duration}min</p>
                                                          </div>
                         </div>
                     </div> 
                    
                          )
                        })}
                     
                   
                      {/* End Todo here */}
                 {/* </div> */}
                 </div>
                </div>
             </div>

             <div className="flex flex-col mt-5">
               {/* <div className="w-full flex justify-between items-center">
               <p className="text-[#FAFAFA] text-2xl font-semibold leading-16 font-sans text-light-100">My Lesson Progress</p>
                  <div className="flex items-center gap-2 h-full">
               <CustomSelect value={filter} onChange={setFilter} placeholder="Select a subject" options={data2} className="w-[25rem] text-gray-300 font-sans"/>
                   </div>
               </div> */}

             
             </div>
               <div className="mt-10 rounded-md text-white flex flex-col gap-5" >
                 <div className="bg-[#1F2225] rounded-md h-[35rem]">
               {/* <Bar options={options} data={BarChartData} /> */}
               </div>
               {/* <div className="w-full flex justify-between items-center h-full">
               <p className="text-[#FAFAFA] text-2xl font-semibold leading-16 font-sans text-light-100">My Quiz Progress</p>
                  <div className="flex items-center gap-2 h-full">
               <CustomSelect value={filter} onChange={setFilter} placeholder="Select a subject" options={data2} className="w-[25rem] text-gray-300 font-sans"/>
                   </div>
               </div> */}
               <div className="bg-[#1F2225] rounded-md cursor-pointer h-[35rem]">
               {/* <Line options={options} data={LineChartData} /> */}
               </div>
               </div>
                  
              <div className="h-[1rem]"/>
               
               <Calendar
                    mode="single"
                    defaultMonth={date}
                    numberOfMonths={2}
                    selected={date}
                    onSelect={setDate}
                    className="rounded-lg border shadow-sm bg-[#1F2225] text-white w-[]"
                  />
    </section>
  )
}

export default Dashboard