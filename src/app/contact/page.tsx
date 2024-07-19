import Footer from '@/components/ui/footer'
import Navbar from '@/components/ui/navbar'
import { Phone } from 'lucide-react'
import React from 'react'
import { CgWebsite } from 'react-icons/cg'
import { MdEmail } from 'react-icons/md'

export default function page() {
  return (
    <section className='flex flex-col justify-between min-h-screen'>

        <Navbar />
        


         <main className='flex flex-col items-center justify-center w-full min-h-[90vh]' style={{ backgroundImage: 'url(images/contactImage.png)' }}>
          <div className='w-full max-w-[1000px] flex flex-col items-center justify-center gap-8 lg:gap-1 p-8 '>
               <div className='w-full flex flex-col items-center justify-center '>
                <h1>GET IN TOUCH</h1>
                <p className='flex items-center mt-4'>Phone <Phone className='text-2xl pl-2' />: <span className='pl-2'>+237 671 325 604</span></p>
      <p className='flex items-center'>Email <MdEmail className='text-2xl pl-1'/>: <span className='pl-2'> infosuport@hotel.com </span></p>
      <p className='flex items-center'>Website <CgWebsite className='text-2xl pl-1' />:  <span className='text-blue-800 pl-2 cursor-pointer'>www.hotel.com</span></p>
    </div>

   <form className='w-full max-w-[1000px] flex flex-col items-center md:items-stretch justify-center md:flex-row lg:gap-8 gap-4 lg:p-12'>
    <div className='w-full flex flex-col items-center justify-center md:justify-between gap-4 '>
        <input type='text' placeholder='Name:' className='border p-2 rounded w-full h-[60px]' />
        <input type='number' placeholder='Contact No:' className='border p-2 rounded h-[60px] w-full' />
        <input type='email' placeholder='Email.ID:' className='border p-2 rounded h-[60px] w-full' />
    </div>
    <textarea placeholder='Message' className='border p-2 rounded w-full h-[250px]' />
   </form>
    <button className='bg-[#000000] text-white p-4'>Send Message</button>
          </div>
        </main>

        <Footer />

    </section>
  )
}
