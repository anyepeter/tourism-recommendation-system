"use client"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

export default function page() {
  const [showTextArea, setShowTextArea] = useState(false)
  const [userInput, setUserInput] = useState('')

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log(userInput)
    setUserInput('')
  }

  return (
    <section className=' w-[100%] mt-[7.5rem] sm:mt-[5rem] sm:w-[80%]  md-[1000px]:w-[82%]  lg:max-w-[1000px] p-4  sm:p-8  float-right'>
      <div className='flex w-full flex-col gap-10'>
        <h3 className='text-2xl mt-6 lg:mt-2'>AI recommendation site</h3>

        <div className='mt-6 p-4 overflow-x-auto'>
          {!showTextArea ? (
            <Button className='text-xl bg-blue-800' onClick={() => setShowTextArea(true)}><Plus />AI</Button>
          ) : (
            <div className='flex flex-col gap-2'>
              <textarea
                className='w-full h-[150px] p-2 border text-md rounded'
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder='Enter your request here'
              />
              <div>
              <Button className='text-xl bg-blue-800' onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </section>
  )
}