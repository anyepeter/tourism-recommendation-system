import React from 'react'
import { Metadata } from 'next'
import NavAdmin from '@/components/ui/adminUser'
import AdminSideBar from '@/components/ui/adminSideBar'
// import { getServerSession } from 'next-auth/next'
// import { redirect } from 'next/navigation'
// import { authOptions } from '@/lib/auth'
// import AdminSidebar from '@/components/AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for managing the application',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
//   const session = await getServerSession(authOptions)

//   if (!session || session.user.role !== 'admin') {
//     redirect('/login')
//   }

  return (
    <div className="flex  flex-col gap-0  min-h-screen bg-gray-300">
        <NavAdmin />
        <div className='flex flex-col sm:flex-row'>
            <div className='w-full sm:max-w-[20%] bg-[#0D1431] lg:max-w-[300px]'>
     <AdminSideBar />
            </div>
        <div className=" w-full px-6 py-8">
          {children}
        </div>
        </div>
    </div>
  )
}
