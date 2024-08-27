'use server'

import { prisma } from "@/lib/db";

// import { Configuration, OpenAIApi } from 'openai';


// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// export async function POST(req: Request) {
//   const { userInput } = await req.json();

//   let responseText = '';

//   if (userInput.toLowerCase().includes('recommend') || userInput.toLowerCase().includes('visit')) {
//     // Query from Prisma (Supabase)
//     const sites = await prisma.site.findMany();
//     responseText = `Here are some recommended sites: ${sites.map(site => site.title).join(', ')}`;
//   } else {
//     // Use OpenAI for general questions
//     const aiResponse = await openai.createCompletion({
//       model: 'text-davinci-003',
//       prompt: userInput,
//       max_tokens: 150,
//     });
//     responseText = aiResponse.data.choices[0].text.trim();
//   }

//   return responseText;
// });
export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      
    });
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
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
  type: string;
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
          connect: { userId: "clz4y8hn70000q5wg6a8pyubl" } 
        },
        category: {
          connect: { id: data.category } 
        },
        section: {
          connect: { id: data.type }
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

export async function getSiteById(id: string) {
  try {
    const site = await prisma.site.findUnique({
      where: { id },
      include: {
        category: true,
        section: true,
        hotels: true,
      },
    });
    if (!site) {
      throw new Error('Site not found');
    }
    return JSON.parse(JSON.stringify(site));
  } catch (error) {
    console.error('Error fetching site:', error);
    throw new Error('Failed to fetch site');
  }
}

export async function getAllSections() {
  try {
    const sections = await prisma.section.findMany();
    return JSON.parse(JSON.stringify(sections));
  } catch (error) {
    console.error('Error fetching sections:', error);
    throw new Error('Failed to fetch sections');
  }
}

export async function getAllCategories() {
  try {
    const sections = await prisma.category.findMany();
    return JSON.parse(JSON.stringify(sections));
  } catch (error) {
    console.error('Error fetching sections:', error);
    throw new Error('Failed to fetch sections');
  }
}


export async function getAllComments() {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: true,
        site: true,
      },
    })
    return JSON.parse(JSON.stringify(comments))
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw new Error('Failed to fetch comments')
  }
}

export async function getAllBooks() {
  try {
    const books = await prisma.book.findMany({
      include: {
        user: true,
        hotel: true,
      },
    })
    return JSON.parse(JSON.stringify(books))
  } catch (error) {
    console.error('Error fetching books:', error)
    throw new Error('Failed to fetch books')
  }
}

export async function getUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        comments: {
          include: {
            site: true,
          },
        },
        bookings: {
          include: {
            hotel: true,
          },
        },
      },
    });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function bookHotel(data: {
  userId: string;
  hotelId: string;
  startDate: Date;
  endDate: Date;
}) {
  try {
    const booking = await prisma.book.create({
      data: {
        user: {
          connect: { userId: data.userId }
        },
        hotel: {
          connect: { id: data.hotelId }
        },
        startDate: data.startDate,
        endDate: data.endDate
      },
      include: {
        user: true,
        hotel: true,
      },
    });
    return JSON.parse(JSON.stringify(booking));
  } catch (error) {
    throw new Error('Failed to book hotel');
  }
}
