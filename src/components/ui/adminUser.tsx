'use client'
import {UserButton, useUser } from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";


const NavAdmin = () => {

  const { user } = useUser();





  return (
    <nav className='w-full flex justify-center z-[100] bg-[#0D1431] h-20 items-center'>
    <div className="w-full max-w-[1600px]  bg-[#0D1431] text-white h-20 bg-dark flex justify-between items-center gap-2 sm:pl-4 pl-4 sm:pr-4 pr-4">
        <div><Link href="/" ><Image src="/images/logo.png" width={80} height={80} alt="Float UI logo" /></Link></div>
        <div>
            <ul className='flex justify-between gap-4 items-center font-Muli'>
                <li className='self-start mt-2'><p>Welcome <span>{user?.firstName}</span></p></li>
                <li>
                  <UserButton />
                </li>

            </ul>
        </div>
    </div>
    </nav>
  )
}

export default NavAdmin



