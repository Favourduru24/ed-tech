import Button from "@/components/shared/Button"
import Category from "@/components/shared/Category"
import { Skills } from "@/constants"
import Image from "next/image"

const Dashboard = () => {
   const name = 'Pristine'

   const buttons = ["This Week", "This Month", "This Year"];
    
  return (
    <section className="flex flex-col sm:py-5 py-5"> 
        <p className="text-[#FAFAFA] text-2xl font-medium leading-10">Welcome, {name}</p>
        <p className="text-gray-300 text-sm font-sans ">Here's is a brief summary of your progress and upcomming task on your schedule.</p>

         <div className="w-full bg-[#1F2225] my-10 rounded-2xl flex items-cente p-8 justify-star max-lg:flex-col gap-20 ">
            <div className="flex flex-col gap-4">
                <h2 className="text-white text-4xl font-semibol">Enhance Your Critical Thinking!</h2>
                 <p className="text-gray-300 max-w-md leading-8">Improve your ability to analyze solutions, evaluate information and make logical decisions, Strengthen this essential skill for better problem-solving decision making in everyday life</p>
                  <Button color='#B391F0' otherStyle='max-sm:w-full' title="Start Improving" links="/training"/>
            </div>
                 <div className="flex gap-5">
                 <Image src='/images/robot.png' alt="robotnic" width={280} height={280} className="max-xl:hidden"/>
                  <div className="flex gap-2 h-full flex-col justify-between items-center ">
                       <div className="text-white">
                        oooooo
                       </div>
                       <div className="flex gap-1">
                      <Image src='/icons/aleft.png' width={40} height={40} alt="arrow/logo" className="p-1 bg-black backdrop-blur-2xl rounded-full cursor-pointer"/>
                      <Image src='/icons/aright.png' width={40} height={40} alt="arrow/logo" className="p-1 bg-black backdrop-blur-2xl rounded-full cursor-pointer"/>
                      </div>
                  </div>
                 </div>
           </div>
          
             <div className="flex flex-col">
               <div className="w-full flex justify-between items-center">
               <p className="text-[#FAFAFA] text-2xl font-medium leading-16">My Skills & Values</p>
                 <p className="underline text-[#FAFAFA] text-lg outline-b-4 cursor-pointer">See All</p>
               </div>

            <div className="gap-5 grid xl:gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
               {Skills.map((items) => (
                   <div className="  bg-[#1F2225] h-32 rounded-xl flex p-2 justify-between cursor-pointer" key={items.id}>
                   <div className="flex flex-col justify-between">
                   <Image src={items.icons} width={40} height={40} alt="volume" className="p-1 bg-black backdrop-blur-2xl rounded-md cursor-pointer"/>
                     <p className="text-[#FAFAFA] font-semibold">{items.title}</p>
                     </div>   
                    <div className="w-24 h-8 flex items-center justify-center font-semibold rounded-full" style={{backgroundColor: items.color}}>
                     <p className="text-[#FAFAFA]">{items.subtitle}</p>
                    </div>
               </div>
               ))}
             </div>
             </div>

             <div className="flex flex-col">
             <div className="w-full flex justify-between items-center">
               <p className="text-[#FAFAFA] text-2xl font-medium leading-16">Pending Assignment ?</p>
                 <p className="underline text-[#FAFAFA] text-lg outline-b-4 cursor-pointer">See All</p>
               </div>
                    
               <div className="grid grid-cols-2 gap-5 max-xl:grid-cols-1">
                     {/* Todo here ... */}
                        <div className="flex flex-col gap-5">
                 <div className="bg-[#1F2225] rounded-r-2xl p-5 border-l-4 border-l-[#9E4B9E]">
                    <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                   <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#E07B38]">
                     <p className="text-[#FAFAFA]">Middle</p>
                    </div>
                   <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#696060] backdrop-blur-xl ">
                     <p className="text-[#FAFAFA]">Todo</p>
                    </div>

                   <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#9E4B9E]">
                     <p className="text-[#FAFAFA]">Middle</p>
                    </div>

                   </div>
                   <Image src='/icons/save.png' width={24} height={24} alt="save" className="justify-end"/>
                   </div>
                      <div className="flex flex-col">
                      <h2 className="text-[#FAFAFA] leading-8 mt-5 text-xl">Presentation Techniques</h2>
                         <p className="text-gray-300 max-w-md text-sm leading-6">Improve your public speaking skills by learning how to structure and deliver impactful presentation.</p>
                      </div>
                       <div className="w-full flex justify-between mt-5 items-end">
                       <Button title="Start" color='#B391F0' links="/" />
                       <p className="text-[#FAFAFA] text-sm">Due to 01:09 2024 9:30pm</p>
                       </div>
                 </div>

                 <div className="bg-[#1F2225] rounded-r-2xl p-5 border-l-4 border-l-[#2923D9]">
                    <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                   <div className="w-24 h-8 flex items-center justify-center font-semibold rounded-full bg-[#2923D9] backdrop-blur-xl shadow-2xl">
                     <p className="text-[#FAFAFA]">Todo</p>
                    </div>
                    
                   <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#E07B38]">
                     <p className="text-[#FAFAFA]">Middle</p>
                    </div>
                   

                   <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#9E4B9E]">
                     <p className="text-[#FAFAFA]">Middle</p>
                    </div>

                   </div>
                   <Image src='/icons/save.png' width={24} height={24} alt="save" className="justify-end"/>
                   </div>
                      <div className="flex flex-col">
                      <h2 className="text-[#FAFAFA] leading-8 mt-5 text-xl">Presentation Techniques</h2>
                         <p className="text-gray-300 max-w-md text-sm leading-6">Improve your public speaking skills by learning how to structure and deliver impactful presentation.</p>
                      </div>
                       <div className="w-full flex justify-between mt-5 items-end">
                       <Button title="Start" color='#B391F0' links="/" />
                       <p className="text-[#FAFAFA] text-sm">Due to 01:09 2024 9:30pm</p>
                       </div>
                 </div>

                 <div className="bg-[#1F2225] rounded-r-2xl p-5 border-l-4 border-l-[#E07B38]">
                    <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                   <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#2923D9] backdrop-blur-xl shadow-2xl">
                     <p className="text-[#FAFAFA]">Todo</p>
                    </div>
                    
                   <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#E07B38]">
                     <p className="text-[#FAFAFA]">Middle</p>
                    </div>
                   

                   <div className="w-20 h-8 flex items-center justify-center font-semibold rounded-full bg-[#9E4B9E]">
                     <p className="text-[#FAFAFA]">Middle</p>
                    </div>

                   </div>
                   <Image src='/icons/save.png' width={24} height={24} alt="save" className="justify-end"/>
                   </div>
                      <div className="flex flex-col">
                      <h2 className="text-[#FAFAFA] leading-8 mt-5 text-xl">Presentation Techniques</h2>
                         <p className="text-gray-300 max-w-md text-sm leading-6">Improve your public speaking skills by learning how to structure and deliver impactful presentation.</p>
                      </div>
                       <div className="w-full flex justify-between mt-5 items-end">
                       <Button title="Start" color='#B391F0' links="/" otherStyle=''/>
                       <p className="text-[#FAFAFA] text-sm">Due to 01:09 2024 9:30pm</p>
                       </div>
                 </div>
                 {/* End of TODO */}
 
                 </div>

                 <div className="bg-[#1F2225] rounded-2xl">
C
                 </div>
                </div>
             </div>

             <div className="flex flex-col mt-5">
               <div className="w-full flex justify-between items-center">
               <p className="text-[#FAFAFA] text-2xl font-medium leading-16">My Progress</p>
                  <div className="flex items-center gap-2">
               <Category buttons={buttons}/>
                   </div>
               </div>

             
             </div>
             
    </section>
  )
}

export default Dashboard