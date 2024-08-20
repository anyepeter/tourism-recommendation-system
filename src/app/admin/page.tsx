// @ts-nocheck
'use client'
import { Card, CardContent } from '@/components/ui/card'
import { HotelIcon, HousePlusIcon, User2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { BiCommentCheck } from 'react-icons/bi'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { getAllBooks, getAllComments, getAllHotels, getAllSites, getAllUsers } from '@/actions/actions'

const chartData = [
    { month: "January", SudanoSahelian: 186, FangBeti: 80, Sawa: 86, Grassfield: 180 },
    { month: "February", SudanoSahelian: 305, FangBeti: 200,Sawa: 10, Grassfield: 80 },
    { month: "March", SudanoSahelian: 237, FangBeti: 120,Sawa: 96, Grassfield: 10 },
    { month: "April", SudanoSahelian: 73, FangBeti: 190, Sawa: 100, Grassfield: 50 },
    { month: "May", SudanoSahelian: 209, FangBeti: 130, Sawa: 150, Grassfield: 180 },
    { month: "June", SudanoSahelian: 214, FangBeti: 140, Sawa: 286, Grassfield: 180 },
]

const chartConfig = {
    SudanoSahelian: {
        label: "SudanoSahelian",
        color: "#2563eb",
    },
    FangBeti: {
        label: "FangBeti",
        color: "#60a5fa",
    },
    Sawa: {
        label: "Sawa",
        color: "#7166B8",
    },
    Grassfield: {
        label: "Grassfield",
        color: "#25C24F",
    },
} satisfies ChartConfig

export default function Page() {
  
    const  user = useUser();

    if (user?.id !== 'user_2kLCMG7aZI6RRqCy4pK8FgnffaZ') {
        redirect('/')
    }

    const [users, setUsers] = React.useState([])
    const [sites, setSites] = React.useState([])
    const [comments, setComments] = React.useState([])
    const [hotels, setHotels] = React.useState([])
    const [books, setBook] = React.useState([])

    useEffect(() => {
        const fetchData = async () => {
            setUsers(await getAllUsers())
            setComments(await getAllComments())
            setBook(await getAllBooks())
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setSites(await getAllSites())
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setHotels(await getAllHotels())
        }
        fetchData()
    }, [])

    const commentsData = [
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
                            <p className='text-3xl'>{users.length}</p>
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
                            <p className='text-3xl'>{sites.length}</p>
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
                            <p className='text-3xl'>{comments.length}</p>
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
                            <p className='text-3xl'>{hotels.length}</p>
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
                            <Bar dataKey="SudanoSahelian" fill="var(--color-SudanoSahelian)" radius={1} />
                            <Bar dataKey="FangBeti" fill="var(--color-FangBeti)" radius={1} />
                            <Bar dataKey="Sawa" fill="var(--color-Sawa)" radius={1} />
                            <Bar dataKey="Grassfield" fill="var(--color-Grassfield)" radius={1} />
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
                            {books.length > 0 ? (
                                books.map((book, index) => (
                                    <tr key={index} >
                                        <td className="border-none p-6">{book.user.firstName}</td>
                                        <td className='border-none p-6'>{book.hotel.title}</td>
                                        <td className='border-none p-6'>{new Date(book.startDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                        <td className='border-none p-6'>{new Date(book.endDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="border-none p-6 text-center">No reservations</td>
                                </tr>
                            )}
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
                            {comments.length > 0 ? (
                                comments.map((comment, index) => (
                                    <tr key={index}>
                                        <td className="border-none p-6">{comment.user.firstName}</td>
                                        <td className='border-none p-6'>{comment.site.title}</td>
                                        <td className='border-none p-6'>{comment.content}</td>
                                        <td className='border-none p-6'>{new Date(comment.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="border-none p-6 text-center">No comments</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card>
                </div>
            </div>
        </section>
    )
}
