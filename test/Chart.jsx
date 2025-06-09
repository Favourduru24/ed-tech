import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const ProgressChart = ({ userId }) => {
  const [data, setData] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('All');

  // Fetch topics for dropdown
  useEffect(() => {
    axios.get(`/api/progress/topics?userId=${userId}`)
      .then(res => setTopics(res.data));
  }, [userId]);

  // Fetch chart data
  useEffect(() => {
    const url = `/api/progress/monthly?userId=${userId}` + 
      (selectedTopic !== 'All' ? `&topic=${selectedTopic}` : '');
    
    axios.get(url)
      .then(res => setData(res.data));
  }, [userId, selectedTopic]);

  // Chart config
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [{
      label: `Lessons (${selectedTopic})`,
      data: data.map(d => d.count),
      borderColor: '#3e82f7',
      fill: false
    }]
  };

  return (
    <div>
      <select 
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
      >
        <option value="All">All Topics</option>
        {topics.map(topic => (
          <option key={topic} value={topic}>{topic}</option>
        ))}
      </select>

      <Line data={chartData} />
    </div>
  );
  
};

router.get('/monthly', async (req, res) => {
    const { userId, topic } = req.query;
    
    const matchStage = { userId: mongoose.Types.ObjectId(userId) };
    if (topic) matchStage.topic = topic;
  
    const data = await Tutor.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt"},
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { 
        $sort: { "_id.year": 1, "_id.month": 1 } 
      },
      {
        $project: {
          _id: 0,
          month: { $dateToString: { format: "%Y-%m", date: { $dateFromParts: { year: "$_id.year", month: "$_id.month" } } } },
          count: 1
        }
      }
    ]);
  
    res.json(data);
  });


  "use client"
import { useState, useEffect, useRef } from "react"

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (value, label) => {
    setSelectedValue(label)
    onChange(value)
    setIsOpen(false)
  }

  return (
    <div 
      ref={dropdownRef}
      className={`relative ${className}`}
    >
      <button
        type="button"
        className={`w-full flex items-center justify-between p-2 rounded-xl cursor-pointer 
          bg-[#1F2225] text-white font-semibold text-lg font-sans border border-[#4B4D4F]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selectedValue || placeholder}
        </span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-[#1F2225] border border-[#4B4D4F] rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-[#9E4B9E] text-white ${
                selectedValue === option.label ? "bg-[#9E4B9E]" : ""
              }`}
              onClick={() => handleSelect(option.value, option.label)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect



"use client"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useGetCategoryQuery } from "@/features/category/categoryApiSlice"
import { formUrlQuery, removeKeysFromQuery } from "@/libs/utils"
import CustomSelect from "./CustomSelect" // Adjust the import path

const Category = ({ buttons }) => {
  const { data, isLoading } = useGetCategoryQuery()
  const { ids, entities } = data || {}
  const [items, setItems] = useState(buttons[0])
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  if (isLoading) {
    return (
      <div className="h-full w-full rounded-xl outline-none cursor-pointer font-semibold text-lg font-sans border-0 gap-2 p-1">
        Loading...
      </div>
    )
  }

  const DateOptions = [
    { value: '1hr', label: '1 hour' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: '1week', label: '1 Week' }
  ]

  const categoryOptions = ids 
    ? ids.map(id => ({
        value: entities[id].name,
        label: entities[id].name
      }))
    : []

  const onSelectCategory = (selectedCategory) => {
    let newUrl = ''
    if (selectedCategory && selectedCategory !== 'Select Category') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: selectedCategory
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category'],
      })
    }
    router.push(newUrl, { scroll: false })
  }

  const onSelectDate = (selectedDate) => {
    let newUrl = ''
    if (selectedDate && selectedDate !== 'Date Added') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'date',
        value: selectedDate
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['date'],
      })
    }
    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="flex gap-2 h-full px-1 rounded-full items-center justify-center">
      {buttons.map((id) => (
        <div 
          key={id}
          className={`${
            items === id 
              ? 'text-white bg-[#9E4B9E] w-34 max-md:w-24 h-full flex items-center justify-center rounded-full cursor-pointer transition-all duration-500' 
              : 'text-white w-32 max-md:w-24 h-full flex items-center justify-center rounded-full cursor-pointer transition-all duration-500'
          }`} 
          onClick={() => setItems(id)}
        >
          <div className="font-semibold text-light-100">
            {id === 'Category' ? (
              <div className="w-full">
                <CustomSelect
                  options={[
                    { value: '', label: 'Select Category' },
                    ...categoryOptions
                  ]}
                  value={category}
                  onChange={(value) => {
                    setCategory(value)
                    onSelectCategory(value)
                  }}
                  placeholder="Select Category"
                  className="h-full bg-transparent"
                />
              </div>
            ) : id === 'Date +' ? (
              <div className="w-full">
                <CustomSelect
                  options={[
                    { value: '', label: 'Date Added' },
                    ...DateOptions
                  ]}
                  value={date}
                  onChange={(value) => {
                    setDate(value)
                    onSelectDate(value)
                  }}
                  placeholder="Date Added"
                  className="h-full bg-transparent"
                />
              </div>
            ) : id}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Category



"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function Calendar02() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      numberOfMonths={2}
      selected={date}
      onSelect={setDate}
      className="rounded-lg border shadow-sm"
    />
  )
}


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

{/* <Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet> */}

<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent className="w-[400px] sm:w-[540px]">
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>