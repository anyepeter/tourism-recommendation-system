// @ts-nocheck
'use client'
import React from 'react'
import { useSelector } from 'react-redux'

export default function page() {

  const user = useSelector((state) => state.site.user)
 

  return (
    <section className=' w-[100%] mt-[7.5rem] sm:mt-[5rem] sm:w-[80%]  md-[1000px]:w-[82%]  lg:max-w-[1000px] p-4  sm:p-8  float-right'>
      <div className='flex w-full flex-col gap-10'>
        <h3 className='text-2xl mt-6 lg:mt-2'>Hotels Book </h3>
        <div className='mt-6 relative h-max  p-4 overflow-x-auto'>
          <div className='w-[890px]'>
            <table className='w-full text-sm text-left border-collapse'>
              <thead className="text-gray-600 bg-white font-medium border-b">
                <tr>
                  <th className='border p-2'>Hotel</th>
                  <th className='border p-2'>Start Date</th>
                  <th className='border p-2'>End Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-sky-50 divide-y mt-">
                {user.bookings?.length > 0 ? (
                user.bookings?.map((comment, index) => (
                  <tr key={index} >
                    <td className="border-none p-6">{comment.hotel.title}</td>
                    <td className='border-none p-6'>{new Date(comment.startDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    <td className='border-none p-6'>{new Date(comment.endDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  </tr>
                ))
              ) :
              
              (
                <tr>
                <td colSpan={4} className="border-none p-6 text-center">No Reservations</td>
            </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}