import Link from 'next/link'
const Button = ({color, otherStyle, title, links}) => {
  return (
    <button className={`${otherStyle} 'text-black rounded-full p-2 w-40 cursor-pointer'`} style={{backgroundColor: color, width: otherStyle}}>
       <Link href={links} className='font-semibold'>
        {title}
       </Link>
    </button>
  )
}

export default Button