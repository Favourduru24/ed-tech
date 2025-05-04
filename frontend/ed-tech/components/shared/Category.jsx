 "use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useGetCategoryQuery } from "@/features/category/categoryApiSlice"
import { formUrlQuery, removeKeysFromQuery } from "@/libs/utils"

const Category = ({buttons}) => {

    // const {data: Category} = useGetCategoryQuery()

    //  console.log()

    const [items, setItems] = useState(buttons[0])
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()

    const Category = [
      { value: 'Select Category', label: 'Select Category' },
      { value: 'Mathematics', label: 'Mathematics' },
      { value: 'Chemistry', label: 'Chemistry' },
     { value: 'Communication', label: 'Communication' }
]

    const Date = [
      { value: 'Date Added', label: 'Date Added' },
      { value: '24 hour', label: '24 hour' },
      { value: 'Yesterday', label: 'Yesterday' },
     { value: '1 Week', label: '1 Week' }
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
      <div className={`${items === id ? 'text-white bg-[#9E4B9E] w-34 h-full flex items-center justify-center  rounded-full cursor-pointer transition-all duration-500' : 'text-white w-32 h-full flex items-center justify-center rounded-full cursor-pointer transition-all duration-500'} `} onClick={() => setItems(id)} key={id}>
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
           {Category.map((cat) => (
             <option key={cat.value} value={cat.value} style={{ backgroundColor: '#1F2225', color: '#FAFAFA', fontFamily: 'sans', width: '100rem'}} className="w-[50vh]">
                {cat.label}
             </option>
           ))}
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
          {Date.map((cat) => (
            <option key={cat.value} value={cat.value} style={{ backgroundColor: '#1F2225', color: '#FAFAFA', fontFamily: 'sans', width: '100rem'}} className="w-[50vh]">
               {cat.label}
            </option>
          ))}
        </select>
        </div>
     ) : id }</div>
    </div>
    ))}
    </div>
  )
}

export default Category