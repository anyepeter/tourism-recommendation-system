// @ts-nocheck
'use client'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState, useEffect } from 'react'
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { uploadImagesAndGetUrls } from '@/components/uploadImages';
import { Button } from '@/components/ui/button';
import { createSiteWithHotels, getAllCategories, getAllSections, getAllSites } from '@/actions/actions';
import { Loader2 } from "lucide-react"
import { toast } from 'react-hot-toast';

interface IFormInput {
    title: string
    category: string
    type: string
    description: string[]
    lat: number
    lng: number
    address: string
    activities: string[]
    images: FileList
    hotel: Array<{
        name: string
        hotel_address: string
        price: number
        rate: number
        hotel_images: FileList
    }>
}

export default function Page() {
    const [descriptionCount, setDescriptionCount] = useState(1);
    const [activityCount, setActivities] = useState(1);
    const [sections, setSection] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCategoriesAndSection = async () => {
            setCategories(await getAllCategories());
            setSection(await getAllSections());
        };
        fetchCategoriesAndSection();
    }, []);

    const { control, register, handleSubmit, reset } = useForm<IFormInput>({
        defaultValues: {
            title: "",
            category: "",
            type: "",
            description: [""],
            lat: 0,
            lng: 0,
            address: "",
            activities: [""],
            images: undefined,
            hotel: [{
                name: "",
                hotel_address: "",
                price: 0,
                rate: 0,
                hotel_images: undefined,
            }]
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "hotel"
    });


    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsSubmitting(true);
        try {
            const siteImages = await uploadImagesAndGetUrls(Array.from(data.images), 'toursim-images');
            const hotels = await Promise.all(
                data.hotel.map(async (hotel) => ({
                  ...hotel,
                  price: parseFloat(hotel.price.toString()),
                  rate: parseFloat(hotel.rate.toString()),
                  hotel_images: await uploadImagesAndGetUrls(Array.from(hotel.hotel_images), 'toursim-images')
                }))
            );
            const formDat = {
                ...data,
                lat: parseFloat(data.lat.toString()),
                lng: parseFloat(data.lng.toString()),
                images: siteImages,
                hotel: hotels
            };

            console.log(formDat)
          
           await createSiteWithHotels(formDat);
           toast.success("The site was created successfully.")
           reset();
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while creating the site.")
        } finally {
            setIsSubmitting(false);
        }
    }

    const addDescription = () => {
        setDescriptionCount(prevCount => prevCount + 1);
    }

    const removeDescription = () => {
        if (descriptionCount > 1) {
            setDescriptionCount(prevCount => prevCount - 1);
        }
    }

    const addActivity = () => {
        setActivities(prevCount => prevCount + 1);
    }

    const removeActivity = () => {
        if (activityCount > 1) {
            setActivities(prevCount => prevCount - 1);
        }
    }

    return (
        <section>
            <div>
                <h3 className='mt-4 text-3xl mb-8'>Submit a site</h3>

                <div className='md:p-12'>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Basic information</h2>

                        <div  className='flex flex-col mt-8 lg:flex-row  gap-3 lg:gap-5' >
                            <div  className='flex flex-col w-full lg:mb-0 gap-3'>
                                <Label htmlFor='title'>Site Title</Label>
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field }) => <Input className='md:h-14' required {...field} />}
                                />
                            </div>

                            <div  className='flex flex-col gap-3'>
                                <Label htmlFor='category'>Category</Label>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} required value={field.value}>
                                            <SelectTrigger className="w-full md:h-14 lg:w-[200px]">
                                                <SelectValue placeholder="Select a category" />

                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        categories.map((category: { id: number, name: string }, index: number) => (
                                                            <SelectItem key={index} value={category.id.toString()}>{category.name}</SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            <div className='flex flex-col  gap-3'>
                                <Label htmlFor='type'>Type</Label>
                                <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} required value={field.value}>
                                            <SelectTrigger className="w-full md:h-14 lg:w-[200px]">
                                                <SelectValue placeholder="Select a type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>

                                                    {
                                                        sections.map((section: { id: number, name: string }, index: number) => (
                                                            <SelectItem key={index} value={section.id.toString()}>{section.name}</SelectItem>
                                                        ))
                                                    }

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                        </div>

                        <div className='flex flex-col mt-8  gap-3 lg:gap-5' >
                            <Label htmlFor='description'>Description</Label>
                            {[...Array(descriptionCount)].map((_, index) => (
                                <Controller
                                    key={index}
                                    name={`description.${index}`}
                                    control={control}
                                    render={({ field }) => <Textarea {...field} required className="mb-2" />}
                                />
                            ))}
                            <div className='flex gap-4'>
                            <Button type="button" onClick={addDescription}>Add Description</Button>
                            {descriptionCount > 1 && (
                                <Button type="button" className='bg-red-600' onClick={removeDescription}>Remove Description</Button>
                            )}
                            </div>
                        </div>

                        <div className='mt-12 flex flex-col gap-3 lg:gap-5'>
                            <h2>Site Location</h2>

                            <div className='flex flex-col gap-6 mt-6'>
                                <div className='flex flex-col gap-3'>
                                    <Label htmlFor='address'>Address</Label>
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field }) => <Input className='md:h-14' required {...field} />}
                                    />
                                </div>

                                <div className='flex gap-6'>

                                <div className='flex w-full flex-col gap-3'>
                                    <Label htmlFor='lng'>Longitude</Label>
                                    <Controller
                                        name="lng"
                                        control={control}
                                        render={({ field }) => <Input className='md:h-14' type='number' required {...field} />}
                                    />
                                </div>

                                <div className='flex w-full flex-col gap-3'>
                                    <Label htmlFor='lat'>Latitude</Label>
                                    <Controller
                                        name="lat"
                                        control={control}
                                        render={({ field }) => <Input className='md:h-14' type='number' required {...field} />}
                                    />
                                </div>
                                </div>
                            </div>
                        </div>

                        <div  className='mt-12  flex flex-col gap-3 lg:gap-5'>
                            <h2>Activities Carried Out</h2>
                            <div className='flex flex-col mt-8  gap-3 lg:gap-5' >
                                <Label htmlFor='activity'>Activity</Label>
                                {[...Array(activityCount)].map((_, index) => (
                                    <Controller
                                        key={index}
                                        name={`activities.${index}`}
                                        control={control}
                                        render={({ field }) => <Input {...field} className="mb-2 md:h-14" />}
                                    />
                                ))}
                                <div className='flex gap-4'>
                                <Button type="button" onClick={addActivity}>Add Activity</Button>
                                {activityCount > 1 && (
                                    <Button type="button" className='bg-red-700' onClick={removeActivity}>Remove Activity</Button>
                                )}
                            </div>
                            </div>
                        </div>

                        <div className='mt-12 flex flex-col gap-3 lg:gap-5'>
                            <h2>Site Images</h2>
                            <div className='flex flex-col gap-3'>
                                <Label htmlFor='images'>Photos</Label>
                                <Controller
                                    name="images"
                                    control={control}
                                    render={({ field }) => (
                                        <Input className='md:h-14'
                                            type='file' 
                                                required
                                            multiple 
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files || []);
                                                field.onChange(files);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className='mt-12 flex flex-col gap-3 lg:gap-5'>
                            <h2>Hotel</h2>

                            {fields.map((field, index) => (
                                <div className='flex mt-2 flex-col gap-4' key={field.id}>

                                    <div className='flex gap-5'> 
                                    <div className='flex flex-col w-full gap-3'>
                                        <Label htmlFor={`hotel.${index}.name`}>Name</Label>
                                        <Controller
                                            name={`hotel.${index}.name`}
                                            control={control}
                                            render={({ field }) => <Input className='md:h-14' {...field} />}
                                        />
                                    </div>

                                    <div className='flex w-full flex-col gap-3'>
                                        <Label htmlFor={`hotel.${index}.hotel_address`}>Location</Label>
                                        <Controller
                                            name={`hotel.${index}.hotel_address`}
                                            control={control}
                                            render={({ field }) => <Input required className='md:h-14' {...field} />}
                                        />
                                    </div>
                                    </div>

                                    <div className='flex gap-5'>
                                    <div className='flex flex-col w-full gap-3'>
                                        <Label htmlFor={`hotel.${index}.price`}>Price</Label>
                                        <Controller
                                            name={`hotel.${index}.price`}
                                            control={control}
                                            render={({ field }) => <Input required className='md:h-14' type='number' {...field} />}
                                        />
                                    </div>

                                    <div className='flex w-full flex-col gap-3'>
                                        <Label htmlFor={`hotel.${index}.rate`}>Star rate</Label>
                                        <Controller
                                            name={`hotel.${index}.rate`}
                                            control={control}
                                            render={({ field }) => <Input required className='md:h-14' type='number' {...field} />}
                                        />
                                    </div>
                                    </div>
                                    <div>
                                        <Label htmlFor={`hotel.${index}.hotel_images`}>Hotel Images</Label>
                                        <Controller
                                            name={`hotel.${index}.hotel_images`}
                                            control={control}
                                            render={({ field }) => (
                                                <Input className='md:h-14'
                                                    type='file'
                                                    multiple
                                                    required
                                                    onChange={(e) => {
                                                        const files = Array.from(e.target.files || []);
                                                        field.onChange(files);
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div>

                                    <Button className='bg-red-700' type="button" onClick={() => remove(index)}>Remove Hotel</Button>
                                    </div>
                                </div>
                            ))}

                            <div>

                            <Button
                                type="button"
                                onClick={() => append({
                                    name: "",
                                    hotel_address: "",
                                    price: 0,
                                    rate: 0,
                                    hotel_images: undefined,
                                })}
                            >
                                Add Hotel
                            </Button>
                            </div>
                        </div>

                        <div className='mt-12 flex justify-center  '>
                        <Button className='bg-blue-800 w-full max-w-2xl' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                        </div>

                        
                    </form>

                </div>

                <form>

                    

                </form>
            </div>
        </section>
    )
}
