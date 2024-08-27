// @ts-nocheck
"use client";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
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

export default function Page() {
  const [showTextArea, setShowTextArea] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [dataArr, setDataArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/askAi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
  
      const data = await response.json();
  
      console.log(data);
      if (response.ok) {
        setAiResponse(data.response);
        setDataArr(data.filteredSitess);
      } else {
        setAiResponse(`Error: ${data.error}`);
      }
      
    } catch (error) {
      setAiResponse(`Error: ${error.message}`);
    } finally {
      setUserInput('');
      setIsLoading(false);
    }
  };
  

  return (
    <section className=' w-[100%] mt-[7.5rem] sm:mt-[5rem] sm:w-[80%]  md-[1000px]:w-[82%]  lg:max-w-[1000px] p-4  sm:p-8  float-right'>
      <div className='flex w-full flex-col gap-10'>
        <h3 className='text-2xl mt-6 lg:mt-2'>AI Recommendation Site</h3>

        <div className='mt-6 p-4 overflow-x-auto'>
          {!showTextArea ? (
            <Button className='text-xl bg-blue-800' onClick={() => setShowTextArea(true)}>
              <Plus /> AI
            </Button>
          ) : (
            <div className='flex flex-col gap-2'>
              <textarea
                className='w-full h-[150px] p-2 border text-md rounded'
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder='Ensure to include category like sawa, sudano-sahelian, grassfield, fang beti. Or just ask a question'
              />
              <div>
                <Button className='text-xl bg-blue-800' onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Submit'}
                </Button>
              </div>
              {aiResponse && <p className='mt-4 text-lg'>{aiResponse}</p>}
            </div>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-4 lg:p-6'>
          {
             dataArr?.map((site) => (
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
                      <Link className='text-blue-800' href={`/filter/${site.id}`}>Read More</Link>
                  </CardFooter>
              </Card>
          ))
          }
        </div>
      </div>
    </section>
  );
}
