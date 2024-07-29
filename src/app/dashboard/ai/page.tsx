import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

export default function page() {
  const comments = [
    { siteName: 'Example Site 1', startDate: '2023-05-01', endDate: '2023-05-01' },
    { siteName: 'Example Site 2 ', startDate: '2023-05-01', endDate: '2023-05-02' },
    { siteName: 'Example Site 3', startDate: '2023-05-01', endDate: '2023-05-03' },
  ]

  return (
    <section className=' w-[100%] mt-[7.5rem] sm:mt-[5rem] sm:w-[80%]  md-[1000px]:w-[82%]  lg:max-w-[1000px] p-4  sm:p-8  float-right'>
      <div className='flex w-full flex-col gap-10'>
        <h3 className='text-2xl mt-6 lg:mt-2'>AI recommendation site</h3>

        <div className='mt-6 p-4 overflow-x-auto'>
            <Button className='text-xl bg-blue-800'><Plus />AI</Button>

        </div>
        
      </div>
    </section>
  )
}