import Footer from '@/components/ui/footer'
import Navbar from '@/components/ui/navbar'
import Image from 'next/image'
import React from 'react'

const Page: React.FC = () => {
  return (
    <section className='flex flex-col justify-between min-h-screen'>
        <Navbar />

        <main className='flex flex-col items-center justify-center w-full'>
            <div className='w-full h-[550px] mt-[10rem] bg-[#000000] flex items-center justify-center bg-no-repeat bg-cover p-8' style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/background.png')" }}>
                
                <div className='flex flex-col items-center justify-center gap-2 p-4 border-2 w-full max-w-[500px]'>
                <h1 className='text-white text-4xl'>ABOUT US</h1>
                <p className='text-gray-100 text-center '>
                A mystical land of mountains and mythologies, exquisite landscapes and exhilarating adventure, and wellness and yoga, Uttarakhand has something to offer every traveller. Popularly known as Devbhoomi, or the land of gods, the state is framed by the Himalayas and divided into two main regions, Garhwal and Kumaon. While Uttarakhand has several well-known destinations like Nainital, Mussoorie, Corbett National Park and Auli, and pilgrimage sites like Kedarnath, Badrinath, Rishikesh and Haridwar, explore the 13 lesser-known destinations from the state's 13 districts.
                </p>
                </div>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-center gap-2 lg:gap-20 p-4 mt-12 mb-16 w-full'>

                <div className='flex flex-col items-center justify-center  p-4 w-full '>
                    <Image className='w-full' src='/images/image19.png ' width={400} height={100} alt='logo' />
                    <div className='bg-[#A1C5E5] w-full flex flex-col justify-center items-center gap-0 md:p-4 lg:p-20  p-12'>
                        <h1 className='text-2xl font-bold'>Mission</h1>
                        <p className='text-center'>Helping people and companies travel smart and achieve more.</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center  p-4 w-full '>
                    <Image className='w-full'  src='/images/image20.png' width={400} height={100} alt='logo' />
                    <div className='bg-[#A1C5E5] w-full flex flex-col justify-center items-center gap-0 md:p-4 lg:p-20 p-12'>
                        <h1 className='text-2xl font-bold'>Vision</h1>
                        <p className='text-center' >Be the world’s most trusted and innovative travel management company.</p>
                    </div>
                </div>
            
            </div>
        </main>

        <Footer />
    </section>
  )
}

export default Page
