"use client"

import { useGetCategoryQuery } from "@/features/category/categoryApiSlice";



const SelectDropdown = ({category, setCategory}) => {
   
  //  const {data: Category} = useGetCategoryQuery()
    //  console.log({Category})

   const Category = [
          // value: '', label: 'Select a Category' },
         { value: 'Chemistry', label: 'Chemistry' },
         { value: 'Mathematics', label: 'Mathematics' },
         { value: 'Communication', label: 'Communication' }
   ]
    const onChangeHandler = (e) => {
        setCategory(e.target.value)
    }

  return (
    <div className="w-[90%]">
      <select
        value={category}
        onChange={onChangeHandler}
        className="h-15 bg-[#1F2225] w-full border-[1.0px] border-[#4B4D4F] rounded-xl text-gray-500
        focus:outline-none focus:ring-2 focus:ring-dark-100 cursor-pointer font-semibold text-sm font-sans"
      >
        {Category.map((cat) => (
          <option key={cat.value} value={cat.value} style={{ backgroundColor: '#1F2225', color: '#A3A3A3',}}>
            {cat.label}
          </option>
        ))}
      </select>
      </div>
  );
};

export default SelectDropdown;