"use server"

import { prisma } from "@/lib/db"



export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany()
    return JSON.parse(JSON.stringify(users))
  } catch (error) {
    console.error('Error fetching users:', error)
    throw new Error('Failed to fetch users')
  } 
}
