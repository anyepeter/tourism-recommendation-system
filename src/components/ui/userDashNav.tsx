'use client'
import {UserButton, useUser } from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";


const Nav = () => {

//   const { user } = useUser();

// console.log(user);



  return (
    <nav className='w-full flex justify-center z-[100] bg-slate-200 h-20 items-center  top-0 left-0 fixed'>
    <div className="w-full max-w-[1200px]  bg-slate-200 h-20 bg-dark flex justify-between items-center gap-2 sm:pl-4 pl-4 sm:pr-4 pr-4">
        <div><Link href="/" ><Image src="/images/logo.png" width={80} height={80} alt="Float UI logo" /></Link></div>
        <div>
            <ul className='flex justify-between gap-4 items-center font-Muli'>
                <li className='self-start mt-2'><p>Welcome <span></span></p></li>
                <li>
                  <UserButton />
                </li>

            </ul>
        </div>
    </div>
    </nav>
  )
}

export default Nav



