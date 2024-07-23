'use server'

import { prisma } from "@/lib/db";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

export async function getAllHotels() {
  try {
    const hotels = await prisma.hotel.findMany();
    return JSON.parse(JSON.stringify(hotels));
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw new Error('Failed to fetch hotels');
  }
}

export async function createSiteWithHotels(data: {
  title: string;
  lng: number;
  lat: number;
  category: string;
  section: string;
  address: string;
  activities: string[];
  description: string[];
  images: string[];
  hotel: {
    name: string;
    hotel_address: string;
    price: number;
    rate: number;
    hotel_images: string[];
  }[];
}) {
  try {
    const createdSite = await prisma.site.create({
      data: {
        title: data.title,
        longitude: data.lng,
        latitude: data.lat,
        addresses: data.address,
        activities: data.activities || [],
        description: data.description || [],
        images: data.images || [],
        user: {
          connect: { userId: "erdtyjhiuoyh" } 
        },
        category: {
          connect: { id: "dfdsf" } 
        },
        section: {
          connect: { id: "dsgrefsd" }
        },
        hotels: {
          create: data.hotel.map((hot) => ({
            title: hot.name,
            location: hot.hotel_address,
            price: hot.price,
            rate: hot.rate,
            images: hot.hotel_images,
          })),
        },
      },
      include: {
        hotels: true,
      },
    });

    console.log('Site and hotels created:', createdSite);
    return createdSite;
  } catch (error) {
    console.error('Error creating site and hotels:', error);
    throw new Error('Failed to create site and hotels');
  }
}

export async function getAllSites() {
  try {
    const sites = await prisma.site.findMany({
      include: {
        category: true,
        section: true,
        hotels: true,
      },
    });
    return JSON.parse(JSON.stringify(sites));
  } catch (error) {
    console.error('Error fetching sites:', error);
    throw new Error('Failed to fetch sites');
  }
}