 "use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useGetCategoryQuery } from "@/features/category/categoryApiSlice"
import { formUrlQuery, removeKeysFromQuery } from "@/libs/utils"

const Category = ({buttons}) => {

    const {data, isLoading } = useGetCategoryQuery()

    const {ids, entities} = data || { }

 
    const [items, setItems] = useState(buttons[0])
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()

    if(isLoading){
       return (
         <select  className="h-full w-full rounded-xl
         outline-none cursor-pointer font-semibold text-lg font-sans border-0 gap-2 p-1"
         >
             <option>Loading...</option>
         </select>
       )
    }

    const Date = [
      { value: '1hr', label: '1 hour' },
      { value: 'yesterday', label: 'Yesterday' },
     { value: '1week', label: '1 Week' }
]

 

const onSelectCategory = (category) => {
  let newUrl = ''
 if(category !== 'Select Category') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key:'category',
        value: category
     })
 } else{
  newUrl = removeKeysFromQuery({
    params: searchParams.toString(),
    keysToRemove:['category'],
 })
 }

   router.push(newUrl, {scroll: false})
}

const onSelectDate = (date) => {
  let newUrl = ''
 if(date !== 'Date Added') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key:'date',
        value: date
     })
 } else{
  newUrl = removeKeysFromQuery({
    params: searchParams.toString(),
    keysToRemove:['date'],
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
           value={category}
           onChange={(e) => setCategory(e.target.value)}
           onClick={(e) => onSelectCategory(e.target.value)}
           className="h-full w-full rounded-xl
           outline-none cursor-pointer font-semibold text-lg font-sans border-0 gap-2 p-1"
         >
            <option value="Select Category" className="bg-[#1F2225] max-md:hidden" disabled>Select Category</option>
           {ids ?  ids.map((id) => {
             const cat = entities[id]
              return (
                <option key={cat.id} value={cat.name} style={{ backgroundColor: '#1F2225', color: '#FAFAFA', fontFamily: 'sans', width: '100rem'}} className="w-[50vh]">
                {cat.name}
             </option>
              )
           }) : ''}
         </select>
         </div>
      ) : id === 'Date +' ? 
        (
        <div className="w-full"> 

        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onClick={(e) =>  onSelectDate(e.target.value)}
          className="h-full w-full rounded-xl
          outline-none cursor-pointer font-semibold text-lg font-sans border-0 gap-2 p-1"
          
        >
            <option value="Date Added" className="bg-[#1F2225] max-md:hidden" disabled>Date Added</option>
           {Date.map((cat) => (
            <option key={cat.value} value={cat.value} style={{ backgroundColor: '#1F2225', color: '#FAFAFA', fontFamily: 'sans', width: '100rem'}} className="w-[50vh]">
               {cat.label}
            </option>
          ))}
        </select>
        {/* <CustomSelect value={date} /> */}

        </div>
     ) : id }</div>
    </div>
    ))}
    </div>
  )
}

export default Category