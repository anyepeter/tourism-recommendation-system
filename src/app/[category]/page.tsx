// @ts-nocheck 
"use client"
import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'

const lakes = [
    {
        id: 1,
        image: '/images/lakes/image1.png',
    },
    {
        id: 2,
        image: '/images/lakes/imag2.png',
    },
    {
        id: 3,
        image: '/images/lakes/image3.png',
    },
    {
        id: 4,
        image: '/images/lakes/image5.png',
    }
]

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const {category} = params

  const sites = useSelector((state) => state.site.sites)

  useEffect(() => {
    if (sites.length > 0) {
      setIsLoading(false)
    }
  }, [sites])

  const filteredSites = sites.filter(site => site.category.name === category);
  
  return (  
    <section className='w-full mt-[5rem] overflow-hidden  sm:mt-10 lg:mt-10'>
       <div className='relative'>
        <h1 className=' text-white text-5xl lg:mt-8 lg:text-[68px] font-bold text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 tracking-wider'>{category}</h1>
        <div className='w-full flex justify-center relative'>
            
            {lakes.map((lake) => (

                <div key={lake.id} className='flex-shrink-0  min-w-[500px] flex-1 overflow-hidden'>
                    <img src={lake.image} alt={`Lake ${lake.id}`} className='w-full h-[200px] sm:h-[300px]  lg:h-[400px] object-cover object-center' />
                </div>
            ))}
        </div>
        </div>


        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 lg:p-12">
            {isLoading ? (
                <div className="col-span-full flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : filteredSites.length === 0 ? (
                <p className="col-span-full text-center">No items for this category</p>
            ) : (
                filteredSites.map((site) => (
                    <Card key={site.title} className='flex flex-col justify-between items-center gap-1  border-none'>
                        <CardHeader>
                            <CardTitle>{site.title}</CardTitle>
                        </CardHeader>
                        <div className='relative'>
                            <Heart className='text-white absolute left-4 bottom-4' />
                            <Image className='object-cover object-center lg:h-[300px] lg:w-[400px]' src={site.images[0]} width={400} height={100} alt='lake' />
                        </div>
                        <CardDescription className='p-3 text-center w-full max-w-[400px]'>
                            {site.description[0]}
                        </CardDescription>
                        <CardFooter>
                            <Link className='text-blue-800' href={`/${category}/${site.id}`}>Read More</Link>
                        </CardFooter>
                    </Card>
                ))
            )}
        </main>   
     </section>
  )
}
