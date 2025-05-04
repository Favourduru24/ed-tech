import Category from "@/components/shared/Category";
import Search from "@/components/shared/Search"
import { notification } from "@/constants";
import Image from "next/image";

const Notification = () => {

   const buttons = ["All", "Reminders", "Systems"];

    const hasNotification = notification.length

  return (
    <section className='flex flex-col sm:py-5 py-5'>
       <div className='flex justify-between items-center w-full'>
            <Search />
               <div className="flex items-center gap-4">
            <div className="flex gap-2 bg-[#1F2225] h-12 px- rounded-full items-center justify-center ">
            <Category buttons={buttons}/>
            </div>
            <div className='flex items-center justify-center rounded-full cursor-pointer bg-[#1F2225] hover:rounded-full p-2 shrink-0'>
                  <Image src='/icons/more.png' width={20} height={20} alt='more/image'/>
             </div>
                 </div>
       </div>

            <div className="mt-10 w-full rounded-xl flex flex-col gap-4">

                      {hasNotification ? notification.map((notify, index) => (
               <div className="w-full h-full bg-[#1F2225] rounded-2xl flex gap-2 items-center p-4 max-sm:p-2" key={index}>
                         <div className="flex flex-col gap-1 w-full">
                       <div className="flex ">
                         <p className="text-white font-semibold relative text-xl">{notify.title}<span className="bg-[#B391F0] h-2 w-2 rounded-full flex top-2 absolute -right-3"/></p>
                       </div>
                       <div className=" ">
                          <p className="text-gray-300 text-[1rem] max-sm:text-sm">{notify.subtitle}</p>
                       </div>
                   </div>
                <div className="flex text-white gap-4 items-center">
                  <p className="font-semibold">{notify.time}</p>
                  <div className='flex items-center justify-center rounded-full cursor-pointer bg-black hover:rounded-full p-2 shrink-0'>
                  <Image src='/icons/more.png' width={20} height={20} alt='notification'/>
                 </div>
                </div>
               </div>

                      )) : (
                      <div className="w-full  rounded-2xl flex gap-2 items-center p-4 h-[60vh] flex items-center justify-center">
                          <div className="bg-[#1F2225] w-full h-52 rounded-2xl flex flex-col items-center justify-center">
                             <h2 className="text-3xl text-white font-semibold font-serif">Notification Not Found!</h2>
                               <p className="text-gray-300 max-w-md leading-6 text-center mb-5 font-serif ">No notification or reminder for you today seems you have a clean slate!</p>
                                    <Image src='/icons/notification.png' width={50} height={50} alt="notification/icon"/>
                          </div>
             </div> )
             }
                
            </div>

    </section>
  )
}

export default Notification