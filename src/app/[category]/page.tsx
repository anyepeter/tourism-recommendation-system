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

export default function page() {
  return (  
    <section className='w-full overflow-hidden sm:mt-10 lg:mt-10'>
       <div className='relative'>
        <h1 className=' text-white text-5xl lg:mt-8 lg:text-[68px] font-bold text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 tracking-wider'>Lakes</h1>
        <div className='w-full flex justify-center relative'>
            
            {lakes.map((lake) => (

                <div key={lake.id} className='flex-shrink-0  min-w-[500px] flex-1 overflow-hidden'>
                    <img src={lake.image} alt={`Lake ${lake.id}`} className='w-full h-[200px] sm:h-[300px]  lg:h-[400px] object-cover object-center' />
                </div>
            ))}
        </div>
        </div>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 lg:p-12">
            <Card className='flex flex-col justify-center items-center gap-1  border-none'>
                <CardHeader>
                    <CardTitle>Nanital Lake</CardTitle>
                </CardHeader>
                  <div className='relative'>
                    <Heart className='text-white absolute left-4 bottom-4' />
                    <Image className='object-cover object-center lg:w-[450px]' src='/images/lake.png' width={400} height={100} alt='lake' />
                    </div>
                <CardDescription className='p-3 text-center w-full max-w-[400px]'>
                    Nainital Lake, famously known as Naini Lake is the major attraction of Nanital town as well of Uttarakhand. Surrounded by panoramic seven hills, Nainital lake is a favourite spot among romantic travellers around the world. It is one of the most visited lakes in India
                </CardDescription>
                <CardFooter>
                    <Link className='text-blue-800' href='/lake/nanital'>Read More</Link>
                </CardFooter>
            </Card>

          

            <Card className='flex flex-col justify-center items-center gap-1  border-none'>
                <CardHeader>
                    <CardTitle>Nanital Lake</CardTitle>
                </CardHeader>
                  <div className='relative'>
                    <Heart className='text-white absolute left-4 bottom-4' />
                    <Image className='object-cover object-center lg:w-[450px]' src='/images/lake.png' width={400} height={100} alt='lake' />
                    </div>
                <CardDescription className='p-3 text-center w-full max-w-[400px]'>
                    Nainital Lake, famously known as Naini Lake is the major attraction of Nanital town as well of Uttarakhand. Surrounded by panoramic seven hills, Nainital lake is a favourite spot among romantic travellers around the world. It is one of the most visited lakes in India
                </CardDescription>
                <CardFooter>
                    <Link className='text-blue-800' href='#'>Read More</Link>
                </CardFooter>
            </Card>
            <Card className='flex flex-col justify-center items-center gap-1  border-none'>
                <CardHeader>
                    <CardTitle>Nanital Lake</CardTitle>
                </CardHeader>
                  <div className='relative'>
                    <Heart className='text-white absolute left-4 bottom-4' />
                    <Image className='object-cover object-center lg:w-[450px]' src='/images/lake.png' width={400} height={100} alt='lake' />
                    </div>
                <CardDescription className='p-3 text-center w-full max-w-[400px]'>
                    Nainital Lake, famously known as Naini Lake is the major attraction of Nanital town as well of Uttarakhand. Surrounded by panoramic seven hills, Nainital lake is a favourite spot among romantic travellers around the world. It is one of the most visited lakes in India
                </CardDescription>
                <CardFooter>
                    <Link className='text-blue-800' href='#'>Read More</Link>
                </CardFooter>
            </Card>

            <Card className='flex flex-col justify-center items-center gap-1  border-none'>
                <CardHeader>
                    <CardTitle>Nanital Lake</CardTitle>
                </CardHeader>
                  <div className='relative'>
                    <Heart className='text-white absolute left-4 bottom-4' />
                    <Image className='object-cover object-center lg:w-[450px]' src='/images/lake.png' width={400} height={100} alt='lake' />
                    </div>
                <CardDescription className='p-3 text-center w-full max-w-[400px]'>
                    Nainital Lake, famously known as Naini Lake is the major attraction of Nanital town as well of Uttarakhand. Surrounded by panoramic seven hills, Nainital lake is a favourite spot among romantic travellers around the world. It is one of the most visited lakes in India
                </CardDescription>
                <CardFooter>
                    <Link className='text-blue-800' href='#'>Read More</Link>
                </CardFooter>
            </Card>
            </main>
    </section>
  )
}
