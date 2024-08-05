"use client"
import React from 'react'
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

  const params = useParams()
  const category = params.category


  const sites = useSelector((state) => state.site.sites)

  console.log(sites)
  const filteredSites = sites.filter(site => site.category.name === category);

  console.log(filteredSites)
  

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

            {
                filteredSites.map((site) => (
                    <Card className='flex flex-col justify-between items-center gap-1  border-none'>
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
                        <Link className='text-blue-800' href={
                            {  pathname: `/${category}/${site.title}`,
                               query: {
                                    site: JSON.stringify(site),
                                },
                            }}>Read More</Link>
                    </CardFooter>
                </Card>
                ))
            }

            </main>
    </section>
  )
}
