'use client' 

const Select = ({value, onChange, data, title}) => {

     const handleChange = (e) => {
     onChange(e.target.value); // Passes the selected value up
  };

  return (
    <div className="w-full">
      <select
        value={value} 
      onChange={handleChange}
        className="h-15 bg-[#1F2225] w-full border-[1.0px] border-[#4B4D4F] rounded-xl text-gray-500
        focus:outline-none focus:ring-2 focus:ring-dark-100 cursor-pointer font-semibold text-sm font-sans"
      >
        <option value="" disabled>{title}</option>
        {data.map((item) =>  (
            <option 
              key={item.id} 
              value={item.title} 
              style={{ backgroundColor: '#1F2225', color: '#928e8e' }}
            >
              {item.title}
            </option>
          ))}
        
      </select>
    </div>
  )
}

export default Select