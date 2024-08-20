"use client"
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center">
  <SignIn />
  </section>
  )
}