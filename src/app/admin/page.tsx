'use client'
import { Card, CardContent } from '@/components/ui/card'
import { HotelIcon, HousePlusIcon, User2 } from 'lucide-react'
import React from 'react'
import { BiCommentCheck } from 'react-icons/bi'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", lake: 186, mountain: 80, beach: 86, forest: 180 },
    { month: "February", lake: 305, mountain: 200,beach: 10, forest: 80 },
    { month: "March", lake: 237, mountain: 120,beach: 96, forest: 10 },
    { month: "April", lake: 73, mountain: 190, beach: 100, forest: 50 },
    { month: "May", lake: 209, mountain: 130, beach: 150, forest: 180 },
    { month: "June", lake: 214, mountain: 140, beach: 286, forest: 180 },
]

const chartConfig = {
    lake: {
        label: "Lake",
        color: "#2563eb",
    },
    mountain: {
        label: "Mountain",
        color: "#60a5fa",
    },
    beach: {
        label: "beach",
        color: "#7166B8",
    },
    forest: {
        label: "Forest",
        color: "#25C24F",
    },
} satisfies ChartConfig



export default function page() {


    const comments = [
        { userName: 'John Doe', comment: 'Great article!', date: '2023-06-01', site: 'Blog A' },
        { userName: 'Jane Smith', comment: 'Very informative', date: '2023-06-02', site: 'Blog B' },
        { userName: 'Mike Johnson', comment: 'Could use more details', date: '2023-06-03', site: 'Blog C' },
        { userName: 'Sarah Williams', comment: 'Excellent read', date: '2023-06-04', site: 'Blog D' },
    ]
    return (
        <section className="w-full">

            <h1 className='text-4xl'>Admin Dashboard</h1>

            <div className='grid mt-10 w-full gap-[1.5rem] sm:grid-cols-2 lg-[1350px]:grid-cols-4' >
                <Card className='bg'>
                    <CardContent className=' flex gap-2 p-6'>
                        <div className='p-3 bg-rose-600 flex justify-center rounded-md items-center' >
                            <User2 className='text-white w-[42px]' />
                        </div>
                        <div className='p-1 pb-2'>
                            <p className='text-3xl'>0</p>
                            <h3 className='text-sm text-zinc-500'>No Users</h3>

                        </div>
                    </CardContent>
                </Card>

                <Card className='bg'>
                    <CardContent className=' flex gap-2 p-6'>
                        <div className='p-3 bg-[#7166B8] flex justify-center rounded-md items-center' >
                            <HousePlusIcon className='text-white w-[42px]' />
                        </div>
                        <div className='p-1 pb-2'>
                            <p className='text-3xl'>0</p>
                            <h3 className='text-sm text-zinc-500'>No Sites</h3>

                        </div>
                    </CardContent>
                </Card>

                <Card className='bg'>
                    <CardContent className=' flex gap-2 p-6'>
                        <div className='p-3 bg-[#2DB7E7] flex justify-center rounded-md items-center' >
                            <BiCommentCheck className='text-white text-2xl  w-[42px]' />
                        </div>
                        <div className='p-1 pb-2'>
                            <p className='text-3xl'>0</p>
                            <h3 className='text-sm text-zinc-500'>No Comments</h3>

                        </div>
                    </CardContent>
                </Card>

                <Card className='bg'>
                    <CardContent className=' flex gap-2 p-6'>
                        <div className='p-3 bg-[#25C24F] flex justify-center rounded-md items-center' >
                            <HotelIcon className='text-white w-[42px]' />
                        </div>
                        <div className='p-1 pb-2'>
                            <p className='text-3xl'>0</p>
                            <h3 className='text-sm text-zinc-500'>No Hotels</h3>

                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className='flex flex-col lg:flex-row gap-9 mt-10'>
                <div className='w-full bg-white'>

                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="lake" fill="var(--color-lake)" radius={1} />
                            <Bar dataKey="mountain" fill="var(--color-mountain)" radius={1} />
                            <Bar dataKey="beach" fill="var(--color-beach)" radius={1} />
                            <Bar dataKey="forest" fill="var(--color-forest)" radius={1} />
                        </BarChart>
                    </ChartContainer>

                </div>
                 
                 <div  className='w-full flex  flex-col gap-5'>
                 <h1 className='text-2xl mt-10'>Hotels Booked</h1>
                <Card className='overflow-x-scroll '>
                
                    <table className='w-full text-sm min-w-[500px]  text-left border-collapse'>
                        <thead className="text-gray-600 bg-white font-medium border-b">
                            <tr>
                                <th className=' p-2'>User Name</th>
                                <th className=' p-2'>Hotel</th>
                                <th className=' p-2'>StartDate</th>
                                <th className=' p-2'>EndDate</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-sky-50 divide-y">
                            {comments.map((comment, index) => (
                                <tr key={index} >
                                    <td className="border-none p-6">{comment.userName}</td>
                                    <td className='border-none p-6'>{comment.comment}</td>
                                    <td className='border-none p-6'>{comment.date}</td>
                                    <td className='border-none p-6'>{comment.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </Card>
                </div>
            </div>

            <div className=''>
                <h1 className='text-2xl mt-10'>Comments</h1>
                <div className='mt-6 relative h-max p-4 overflow-x-auto'>
                <Card className=' w-full '>

                    <table className='w-full text-sm  text-left border-collapse'>
                        <thead className="text-gray-600 bg-white font-medium border-b">
                            <tr>
                                <th className=' p-2'>User Name</th>
                                <th className=' p-2'>Site Name</th>
                                <th className=' p-2'>Feedback</th>
                                <th className=' p-2'>Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-sky-50 divide-y">
                            {comments.map((comment, index) => (
                                <tr key={index} >
                                    <td className="border-none p-6">{comment.userName}</td>
                                    <td className='border-none p-6'>{comment.comment}</td>
                                    <td className='border-none p-6'>{comment.comment}</td>
                                    <td className='border-none p-6'>{comment.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </Card>
                </div>
            </div>

        </section>
    )
}
