
'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { GrDashboard } from 'react-icons/gr';
import { BiComment } from 'react-icons/bi';
import { Book } from 'lucide-react';
import { AiFillAlert } from 'react-icons/ai';
import { RxDropdownMenu } from 'react-icons/rx';

const SideBar = () => {

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const pathname = usePathname();

  
  return (
    <div 
    className="  fixed  top-20 bg-[#a1abd9] w-full z-[10] sm:h-screen sm:w-[20%] lg:max-w-[220px] pb-4"
    >
      <div className='sm:hidden flex justify-between items-center pl-2 pr-2'>
      <p onClick={() => setToggleDropdown((prev) => !prev)} >Open Dashboard Navigation</p>
      <RxDropdownMenu onClick={() => setToggleDropdown((prev) => !prev)} /> 
      </div>

      {toggleDropdown && (

      <div className='flex gap-2 mt-8 flex-col w-full  sm:hidden'>
        <h1 className='ml-4 text-white text-[20px]'>Overview</h1>
        <ul className='border-t-[1px] w-full border-gray-400 flex flex-col gap-1 pt-4 pb-4'>
          <li className='w-full flex'>
            <Link href="/dashboard" onClick={() => setToggleDropdown((prev) => !prev)} className={`w-full p-4 flex gap-4  ${ pathname === '/dashboard' ? 'bg-[#21338e]' : '' } `}> <GrDashboard /> <span>Dashboard</span> </Link>
          </li>

          <li className='w-full flex'>
            <Link href='/dashboard/comment' onClick={() => setToggleDropdown((prev) => !prev)} className={`w-full p-4 flex gap-4  ${ pathname === '/dashboard/comment' ? 'bg-[#21338e]' : '' } `}><BiComment /> <span>Comments</span></Link>
          </li>

          <li className='w-full flex'>
            <Link href="/dashboard/hotel" onClick={() => setToggleDropdown((prev) => !prev)} className={`w-full p-4 flex gap-4  ${ pathname === '/dashboard/hotel' ? 'bg-[#21338e]' : '' } `}> <Book /> <span>Hotels Booked</span> </Link>
          </li>

          <li className='w-full flex'>
            <Link href="/dashboard/ai" onClick={() => setToggleDropdown((prev) => !prev)} className={`w-full p-4 flex gap-4  ${ pathname === '/dashboard/ai' ? 'bg-[#21338e]' : '' } `}> <AiFillAlert /> <span>Ai sites</span> </Link>
          </li>
        </ul>
      </div>

      )}

<div className='sm:flex gap-2 mt-6 flex-col w-full hidden'>
        <h1 className=' p-2 md:p-6 w-full text-white text-[19px]'>Overview</h1>
        <ul className='border-t-[1px] w-full text-white border-gray-400 flex flex-col gap-1 pt-4 pb-4'>
          <li className='w-full flex'>
            <Link href="/dashboard/" className={`w-full p-4 flex gap-4 items-center justify-center md:justify-start ${pathname === '/dashboard' ? 'bg-[#21338e]' : ''} `} > <GrDashboard className='text-[2rem] md:text-[1.6rem] '/> <span className='hidden md:block'>Dashboard</span> </Link>
          </li>

          <li className='w-full flex'>
            <Link href="/dashboard/comment" className={`w-full p-4 flex gap-4 items-center justify-center md:justify-start ${pathname === '/dashboard/comment' ? 'bg-[#21338e]' : ''} `}><BiComment className='text-[2rem] md:text-[1.6rem] '/> <span className='hidden md:block'>Comments</span></Link>
          </li>

          <li className='w-full flex'>
            <Link href="/dashboard/hotel" className={`w-full p-4 flex gap-4 items-center justify-center md:justify-start ${pathname === '/dashboard/hotel' ? 'bg-[#21338e]' : ''} `}> <Book className='text-[2rem] md:text-[1.6rem] '/> <span className='hidden md:block'>Hotels Booked</span> </Link>
          </li>

          <li className='w-full flex'>
            <Link href="/dashboard/ai" className={`w-full p-4 flex gap-4 items-center justify-center md:justify-start ${pathname === '/dashboard/ai' ? 'bg-[#21338e]' : ''} `}> <AiFillAlert className='text-[2rem] md:text-[1.6rem] '/> <span className='hidden md:block'>AI sites</span> </Link>
          </li>
        </ul>
      </div>
       </div>
  )
}

export default SideBar
