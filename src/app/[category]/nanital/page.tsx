'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import GooglesDetails from '@/components/ui/map'; // Adjust the path as necessary
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { CgWebsite } from 'react-icons/cg';
import { MdEmail } from 'react-icons/md';
import { Phone } from 'lucide-react';


interface Hotel {
  name: string;
  stars: number;
  address: string;
}

const hotelImages = [
   '/images/lakes/imag2.png',
 '/images/lakes/image1.png',
   '/images/lakes/image3.png',
  '/images/lakes/image5.png',
]

const Page: React.FC = () => {
  const service = {
    position: {
      lat: -37.8136,
      lng: 144.9631,
    },
  };

  const [showPopup, setShowPopup] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const openPopup = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedHotel(null);
  };

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <main className='flex justify-center items-center'>
      <div className='p-8 lg:mt-16 max-w-[1000px] flex flex-col gap-8'>
        <div className='flex w-full justify-center items-center flex-col'>
          <div>
            <div className=''>
              <h2 className='w-[300px] p-2 self-end bg-[#5C8C26B2] lg:text-4xl text-white'>NANITAL LAKE</h2>
            </div>
            <Image src='/images/mountain.png' className='md:w-[700px] lg:w-[850px]' width={400} height={400} alt='lake' />
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-start gap-4 md:gap-6'>
          <Image src='/images/mountain.png' width={50} height={50} alt='lake' />
          <ul className='list-disc flex flex-col gap-4 '>
            <li>Nainital Lake, notably known as Naini Lake, is the main attraction of Nainital town as well as of Uttarakhand.</li>
            <li>It is located at an altitude of 3,500 meters in the Nainital district of Uttarakhand.</li>
            <li>Bounded by panoramic seven hills, Nainital Lake is a much-loved spot among romantic travelers around the planet. This lake was found long back in 1839 by P.Baron and is at an altitude of 2,000 meters above sea level which makes it one of the most visited lakes in India.</li>
            <li>It is a popular spot for picnics, boating, and other leisure activities.</li>
          </ul>
        </div>

        <div className='flex flex-col md:flex-row items-start gap-4 md:gap-6'>
          <Image src='/images/mountain.png' width={50} height={50} alt='lake' />
          <div>
            <h2>Activities carry out</h2>
            <ul className='list-decimal flex flex-col gap-4 '>
              <li>Naini Lake</li>
              <li>Naini Temple</li>
              <li>Naini Ghat</li>
              <li>Naini River</li>
              <li>Naini Fort</li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-4 md:gap-6'>
          <div className='flex flex-col md:flex-row items-start gap-4 md:gap-6'>
            <Image src='/images/mountain.png' width={50} height={50} alt='lake' />
            <div>
              <h2>Nearby Hotels</h2>
              <ul className='flex flex-col gap-4 w-full max-w-[400px]'>
                {[
                  { name: 'Hotel Name 1', stars: 4, address: 'Picture Palace side 100 metres down from, The Mall Rd, Mussoorie, Uttarakhand 248179' },
                  { name: 'Hotel Name 2', stars: 4, address: 'Picture Palace side 100 metres down from, The Mall Rd, Mussoorie, Uttarakhand 248179' },
                  { name: 'Hotel Name 3', stars: 4, address: 'Picture Palace side 100 metres down from, The Mall Rd, Mussoorie, Uttarakhand 248179' },
                ].map((hotel, index) => (
                  <li key={index} className='flex flex-col gap-0'>
                    <p className='font-bold'>{hotel.name}</p>
                    <p>{hotel.stars} star hotel</p>
                    <p>{hotel.address}</p>
                    <button onClick={() => openPopup(hotel)} className='border-none self-start text-blue-800'>Read more</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='flex flex-col md:flex-row items-start gap-4 md:gap-6'>
            <Image src='/images/mountain.png' width={50} height={50} alt='lake' />
            <div>
              <h2>Site Location</h2>
              <div>
                <p className='p-4 pl-0'>Location name</p>
                <div>
                  <GooglesDetails service={service} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2>Comments</h2>
          <div className='flex flex-col mt-8 gap-8'>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src='/images/mountain.png' />
              </Avatar>
              <div>
                <p>Username</p>
                <p>comment</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src='/images/mountain.png' />
              </Avatar>
              <div>
                <p>Username</p>
                <p>comment</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2>Write a comment</h2>
          <div className='flex flex-col gap-4'>
            <textarea placeholder='Write your comment' className='h-[200px] bg-gray-100 p-2' />
            <button className='border-none bg-[#5C8C26] w-20 text-white p-2'>Submit</button>
          </div>
        </div>
      </div>

      {showPopup && selectedHotel && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center pt-[30rem] pb-[10rem] overflow-scroll'>
          <div className='bg-white p-8 rounded-lg max-w-md lg:max-w-xl'>
            <h2 className='text-2xl font-bold mb-4'>{selectedHotel.name}</h2>
            <p>{selectedHotel.stars} star hotel</p>
            <p className='mb-4'>{selectedHotel.address}</p>
            <div className='w-full flex justify-center items-center'>
            <Carousel 
      plugins={[plugin.current]}
      className="w-full p-4  max-w-[250px] lg:max-w-[430px] "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {hotelImages.map((image, index) => (
          <CarouselItem className='border-spacing-1' key={index}>
            <div className="w-full h-[200px]  lg:h-[240px] flex justify-center items-center">
            <Image className='object-contain lg:w-[400px]' src={image} width={300} height={200} alt={`Hotel ${index + 1}`} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />

    </Carousel>

 
    </div>

    <div className='mt-8 mb-8'>
      <h2>Contact hotel</h2>
      <p className='flex items-center'>Phone <Phone className='text-2xl pl-2' />: <span className='pl-2'>+237 671 325 604</span></p>
      <p className='flex items-center'>Email <MdEmail className='text-2xl pl-1'/>: <span className='pl-2'> infosuport@hotel.com </span></p>
      <p className='flex items-center'>Website <CgWebsite className='text-2xl pl-1' />:  <span className='text-blue-800 pl-2 cursor-pointer'>www.hotel.com</span></p>
    </div>

            <h3 className='text-xl font-semibold mb-2'>Book this hotel</h3>
            <form className='flex flex-col gap-4'>
              <input type='text' placeholder='Name' className='border p-2 rounded' />
              <input type='email' placeholder='Email' className='border p-2 rounded' />
              <input type='date' placeholder='Check-in date' className='border p-2 rounded' />
              <input type='date' placeholder='Check-out date' className='border p-2 rounded' />
              <button type='submit' className='bg-[#5C8C26] text-white p-2 rounded'>Book Now</button>
            </form>
            <button onClick={closePopup} className='mt-4 text-blue-800'>Close</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
