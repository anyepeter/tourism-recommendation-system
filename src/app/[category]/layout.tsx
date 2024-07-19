import Footer from '@/components/ui/footer'
import Navbar from '@/components/ui/navbar'
import React from 'react'

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="category-layout">
        <Navbar />
      <main className="category-main">
        {children}
      </main>
      <Footer />
    </div>
  )
}
