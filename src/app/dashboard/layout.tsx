import Footer from '@/components/ui/footer'
import Navbar from '@/components/ui/navbar'
import SideBar from '@/components/ui/sidebarUser'
import Nav from '@/components/ui/userDashNav'
import React from 'react'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className=" bg-slate-200 flex justify-center min-h-screen w-full">
       
      <div  className="max-w-[1200px] w-full ">
      <Nav />
        {children}
        <SideBar />
      </div>
      
    </section>
  )
}
