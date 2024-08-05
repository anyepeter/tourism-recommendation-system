'use client'
import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllSites } from '@/actions/actions'
import { useDispatch, useSelector } from'react-redux'
import { increment } from '../globalRedux/site/siteSlice'


export default function page() {
  
const dispatch = useDispatch()
const sites = useSelector((state) => state.site.sites)

const user = useSelector((state) => state.site.user)
console.log(user)

useEffect(() => {
  const fetchSites = async () => {
    try {
      const sitesData = await getAllSites()
      dispatch(increment(sitesData))
    } catch (error) {
      console.error('Error fetching sites:', error)
    }
  }

  fetchSites()
}, [])


  return (
    <section className=' w-[100%] mt-[7.5rem] sm:mt-[5rem] sm:w-[80%]  md-[1000px]:w-[82%]  lg:max-w-[1000px]  p-4   sm:p-8  float-right'>
      <div className='flex w-full flex-col gap-10'>
        <h3 className='text-2xl mt-6 lg:mt-2'>user Dashboard</h3>

        <div className='flex p-2 mt-4 flex-row justify-between items-center'>
          <ul className='flex justify-between flex-col gap-8 md:flex-row w-full'>
            <li className='  bg-white md:max-w-[300px] w-full p-4 rounded-lg border-2' >
              <h3 className='text-zinc-500 md:text-sm'>Hotel booked</h3>
              <p className='text-2xl md:text-3xl'>{user.bookings?.length}</p>
            </li>
            <li className=' bg-white md:max-w-[300px] w-full p-4 rounded-lg border-2'>
              <h3 className='text-zinc-500 md:text-sm'>No Comment</h3>
              <p className='text-2xl md:text-3xl'>{user.comments?.length}</p>
            </li>
            <li className=' bg-white md:max-w-[300px] w-full p-4 rounded-lg border-2'>
              <h3 className='text-zinc-500 md:text-sm' >No Likes</h3>
              <p className='text-2xl md:text-3xl'>5</p>
            </li>
          </ul>
        </div>

        <h2 className=' mt-6 lg:mt-2'>Recent sites Added</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-4 lg:p-6'>
            {
              sites?.length > 0 ? sites?.slice(0, 4).map((site) => (
                <Card key={site.id} className='flex flex-col justify-center items-center gap-1 border-none'>
                  <CardHeader>
                      <CardTitle>{site.title}</CardTitle>
                  </CardHeader>
                    <div className='relative'>
                      <Heart className='text-white absolute left-4 bottom-4' />
                      <Image className='object-cover object-center lg:w-[450px]' src={site?.images[0]} width={400} height={100} alt={site.title} />
                      </div>
                  <CardDescription className='p-3 text-center w-full max-w-[400px]'>
                      {site.description[0]}
                  </CardDescription>
                  <CardFooter>
                      <Link className='text-blue-800' href={`/site/${site._id}`}>Read More</Link>
                  </CardFooter>
                </Card>
              )) : (
              <p>No sites added yet</p>
              )
            }   
        </div>

      </div>
    </section>
  )
}
