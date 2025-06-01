 "use client"

import { useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { formUrlQuery, removeKeysFromQuery } from "@/libs/utils"
import { data5, data2 } from "@/constants"


const TutorCategory = ({buttons}) => {

    
    const [items, setItems] = useState(buttons[0])
    const [subject, setSubject] = useState('')
    const [duration, setDuration] = useState('')
    const [level, setLevel] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()


    const Duration = [
      { value: '10', label: '10 minute' },
      { value: '20', label: '20 minute' },
      {  value: '30', label: '30 minute' },
      { value: '40', label: '40 minute' },
      { value: '50', label: '50 minute' },
      { value: '60', label: '60 minute' },
  ]

 

const onSelectSubject = (subject) => {
  let newUrl = ''
 if(subject !== '') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key:'subject',
        value: subject
     })
 } else{
  newUrl = removeKeysFromQuery({
    params: searchParams.toString(),
    keysToRemove:['subject'],
 })
 }

   router.push(newUrl, {scroll: false})
}

const onSelectDuration = (duration) => {
  let newUrl = ''
 if(duration !== '') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key:'duration',
        value: duration
     })
 } else{
  newUrl = removeKeysFromQuery({
    params: searchParams.toString(),
    keysToRemove:['duration'],
 })
 }

   router.push(newUrl, {scroll: false})
}

const onSelectLevel = (duration) => {
  let newUrl = ''
 if(level !== '') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key:'level',
        value: level
     })
 } else{
  newUrl = removeKeysFromQuery({
    params: searchParams.toString(),
    keysToRemove:['level'],
 })
 }

   router.push(newUrl, {scroll: false})
}
     

  return (
     <div className="flex gap-2 h-full px-1 rounded-full items-center justify-center">
    {buttons.map((id) => (
      <div className={`${items === id ? 'text-white bg-[#9E4B9E] w-34 max-md:w-24 h-full flex items-center justify-center  rounded-full cursor-pointer transition-all duration-500' : 'text-white w-32 max-md:w-24 h-full flex items-center justify-center rounded-full cursor-pointer transition-all duration-500'} `} onClick={() => setItems(id)} key={id}>
      <div className="font-semibold text-light-100">{id === 'Category' ? 
         (
         <div className="w-full"> 
         <select
           value={subject}
           onChange={(e) => setSubject(e.target.value)}
           onClick={(e) => onSelectSubject(e.target.value)}
           className="h-full w-full rounded-xl
           outline-none cursor-pointer font-semibold text-lg font-sans border-0 gap-2 p-1"
         >
            <option value="" className="bg-[#1F2225] max-md:hidden" disabled>Subject</option>
           {data2 ?  data2.map((item) => (
                <option key={item.id} value={item.title} style={{ backgroundColor: '#1F2225', color: '#FAFAFA', fontFamily: 'sans', width: '100rem'}} className="w-[50vh]">
                {item.title}
                 </option>
              )
           ) : ''}
         </select>
         </div>
      ) : id === 'Level' && pathname === '/quiz' ? 
      (
        <div className="w-full"> 
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          onClick={(e) =>  onSelectLevel(e.target.value)}
          className="h-full w-full rounded-xl
          outline-none cursor-pointer font-semibold text-lg font-sans border-0 gap-2 p-1"
          
        >
            <option value="" className="bg-[#1F2225] max-md:hidden" disabled>Level</option>
          {data5.map((cat) => (
            <option key={cat.id} value={cat.title} style={{ backgroundColor: '#1F2225', color: '#FAFAFA', fontFamily: 'sans', width: '100rem'}} className="w-[50vh]">
               {cat.title}
            </option>
          ))}
        </select>
        </div>
     ) :
       pathname === '/training' && id === 'Date +' ? 
        (
        <div className="w-full"> 
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          onClick={(e) =>  onSelectDuration(e.target.value)}
          className="h-full w-full rounded-xl
          outline-none cursor-pointer font-semibold text-lg font-sans border-0 gap-2 p-1"
          
        >
            <option value="" className="bg-[#1F2225] max-md:hidden" disabled>Duration</option>
          {Duration.map((cat) => (
            <option key={cat.value} value={cat.value} style={{ backgroundColor: '#1F2225', color: '#FAFAFA', fontFamily: 'sans', width: '100rem'}} className="w-[50vh]">
               {cat.label}
            </option>
          ))}
        </select>
        </div>
     ) : 
    id }</div>
    </div>
    ))}
    </div>
  )
}

export default TutorCategory