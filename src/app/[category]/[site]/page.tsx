// @ts-nocheck 
"use client"
import React, { useEffect, useState } from 'react';
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
import { useParams, useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs';
import { useDispatch, useSelector } from 'react-redux';
import { bookHotel, getSiteById, getUser } from '@/actions/actions';
import { addUser } from '@/app/globalRedux/site/siteSlice';


interface Hotel {
  name: string;
  stars: number;
  address: string;
}


const Page: React.FC =  () => {
  const params: {category: string, site:string} = useParams()
  const siteId: string = params.site
  const [siteData, setSiteData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const userData = await getSiteById((siteId));
        setSiteData(userData);
        if (Object.keys(userData).length === 0) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error fetching site data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [siteId]);
  

  const [showPopup, setShowPopup] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState< {id: string}>({id: ''});
  const [isBooking, setIsBooking] = useState(false);
  const [isReserved, setIsReserved] = useState(false);

  const openPopup = (hotel: {id: string}) => {
    setSelectedHotel(hotel);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedHotel({id: ''});
    setIsReserved(false);
  };

  const plugin = React.useRef(
    Autoplay({ delay: 2000 })
  )

  const user = useSelector(({state}: { state: {site: {user: {userId: string}}}}) => state?.site.user)

  const handleBookNow = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBooking(true);
    const formData = new FormData(event.currentTarget);
    const startDate = new Date(formData.get('checkIn') as string).toISOString();
    const endDate = new Date(formData.get('checkOut') as string).toISOString();
    const bookingData: {userId: string, hotelId: string, startDate: string, endDate: string} = {
      userId: user.userId,
      hotelId: selectedHotel?.id,
      startDate: startDate,
      endDate: endDate
    };
    try {
      await bookHotel(bookingData);
      setIsReserved(true);
    } catch (error) {
      console.error('Error booking hotel:', error);
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <main className='flex justify-center mt-24 items-center'>
      <div className='p-8 lg:mt-16 max-w-[1000px] flex flex-col gap-8'>
        <div className='flex w-full justify-center items-center flex-col'>
          <div>
            <div className=''>
              <h2 className='w-[300px] p-2 self-end bg-[#5C8C26B2] lg:text-4xl text-white'>{siteData?.title}</h2>
            </div>
                  <Carousel 
                  plugins={[plugin.current]}
                  className="w-full h-auto"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                   <CarouselContent>
                    {
                      siteData.images?.map((image, index) => {
                        return(
                          <CarouselItem key={index}>
                            <div className="w-full h-[200px]  lg:h-[500px] flex justify-center items-center">
                            <Image key={index} src={image} className='md:w-[700px] lg:h-[500px] lg:w-[950px] aspect-video' width={400} height={400} alt='lake' />
                            </div>
                          </CarouselItem>
                          
                        )
                      })
                    }
                   </CarouselContent>
                   <CarouselPrevious />
                   <CarouselNext />
                
                  </Carousel>
            {/* <Image src={siteData.images[0]} className='md:w-[700px] lg:w-[850px]' width={400} height={400} alt='lake' /> */}
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-start gap-4 md:gap-6'>
          <Image src='/images/icons8-lake-481.png' width={50} height={50} alt='lake' />
          <ul className='list-disc flex flex-col gap-4 '>
            {
              siteData.description?.map((note, index) => {
                return(
                  <li key={index}>{note}</li>
                )
              })
            }
           </ul>
        </div>

        <div className='flex flex-col md:flex-row items-start gap-4 md:gap-6'>
          <Image src='/images/icons8-adventure-481.png' width={50} height={50} alt='lake' />
          <div>
            <h2>Activities carry out</h2>
            <ul className='list-decimal flex flex-col gap-4 '>
              {
                siteData.activities?.map((action, index) => (
                  <li key={index}>{action}</li>
                ))
              }
            </ul>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-4 md:gap-6'>
          <div className='flex flex-col md:flex-row items-start gap-4 md:gap-6'>
            <Image src='/images/icons8-hotel-641.png' width={50} height={50} alt='lake' />
            <div>
              <h2>Nearby Hotels</h2>
              <ul className='flex flex-col gap-4 w-full max-w-[400px]'>
                {siteData.hotels?.map((hotel, index) => (
                  <li key={index} className='flex flex-col gap-0'>
                    <p className='font-bold'>{hotel.title}</p>
                    <p>{hotel.rate} star hotel</p>
                    <p>{hotel.price} CFA</p>
                    <p>{hotel.location}</p>
                    <button onClick={() => openPopup(hotel)} className='border-none self-start text-blue-800'>Read more</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='flex flex-col md:flex-row items-start gap-4 md:gap-6'>
            <Image src='/images/icons8-location-481.png' width={50} height={50} alt='lake' />
            <div>
              <h2>Site Location</h2>
              <div>
                <p className='p-4 pl-0'>{siteData.addresses}</p>
                <div>
                  <GooglesDetails service={{
                    position: {
                      lat: siteData.latitude,
                      lng: siteData.longitude,
                    }
                  }} />
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
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center pt-[30rem] pb-[10rem] overflow-scroll z-40'>
          <div className='bg-white p-8 rounded-lg max-w-md lg:max-w-xl'>
            <h2 className='text-2xl font-bold mb-4'>{selectedHotel.title}</h2>
            <p>{selectedHotel.rate} star hotel</p>
            <p>{selectedHotel.price} CFA</p>
            <p className='mb-4'>{selectedHotel.location}</p>
            <div className='w-full flex justify-center items-center'>
            <Carousel 
      plugins={[plugin.current]}
      className="w-full p-4  max-w-[250px] lg:max-w-[430px] "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {selectedHotel.images.map((image, index) => (
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
            <form method="POST" className='flex flex-col gap-4' onSubmit={handleBookNow}>
              <input type='datetime-local' name='checkIn' placeholder='Check-in date' className='border p-2 rounded' />
              <input type='datetime-local' name='checkOut' placeholder='Check-out date' className='border p-2 rounded' />
              <button 
                type='submit' 
                className={`p-2 rounded ${isReserved ? 'bg-blue-500' : 'bg-[#5C8C26]'} text-white`}
                disabled={isBooking || isReserved}
              >
                {isBooking ? 'Loading...' : isReserved ? 'Reserved' : 'Book Now'}
              </button>
            </form>
            <button onClick={closePopup} className='mt-4 text-blue-800'>Close</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
