import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix'
import { headers } from 'next/headers'



const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

// Clerk Webhook: create or delete a user in the database by Clerk ID
export async function POST(req: Request) {
    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400
        });
    }


    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);



    let evt;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
        
        const { id: clerkUserId, first_name, last_name, email_addresses } = evt.data;
        const email = email_addresses[0].email_address;


        // Using prisma to send evt.id to the user table
        switch (evt.type) {
            case 'user.created':
                const user = await prisma.user.create({
                    data: { 
                        clerkUserId,
                        lastName: last_name || null,
                        firstName: first_name || null,
                        email: email
                     }
                })
                return NextResponse.json({ user })
            case 'user.updated':
                const updatedUser = await prisma.user.update({
                    where: { clerkUserId },
                   
                    data: { 
                        clerkUserId,
                        firstName: first_name || null,
                        lastName: last_name || null,
                        email: email
                     }
                })
                return NextResponse.json({ user: updatedUser })
            case 'user.deleted':
                const deletedUser = await prisma.user.delete({
                    where: { clerkUserId },
                })
                return NextResponse.json({ user: deletedUser })
            default:
                return NextResponse.json({ message: 'Unhandled event type' }, { status: 400 })
        }
        
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred', {
            status: 400
        });
    }




    // try {
    //     // Parse the Clerk Webhook event

    //     // Create or delete a user in the database based on the Clerk Webhook event
    //     let user = null;
    //     switch (evt.type) {
    //         case 'user.created': {
    //             user = await prisma.user.upsert({
    //                 where: {
    //                     clerkUserId,
    //                 },
    //                 update: {
    //                     clerkUserId,
    //                 },
    //                 create: {
    //                     clerkUserId,
    //                 },
    //             });
    //             break;
    //         }
    //         case 'user.deleted': {
    //             user = await prisma.user.delete({
    //                 where: {
    //                     clerkUserId,
    //                 },
    //             });
    //             break;
    //         }
    //         default:
    //             break;
    //     }

    //     return NextResponse.json({ user });
    // } catch (error) {
    //     return NextResponse.json({ error }, { status: 500 });
    // }
}