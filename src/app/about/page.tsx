import React from 'react'

const Page: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to our About page. We are a company dedicated to providing high-quality services and products to our customers.
      </p>
      <p className="mb-4">
        Our mission is to innovate and create solutions that make a positive impact on people's lives.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
      <ul className="list-disc list-inside mb-4">
        <li>John Doe - CEO</li>
        <li>Jane Smith - CTO</li>
        <li>Mike Johnson - Head of Operations</li>
      </ul>
      <p>
        If you have any questions or would like to learn more about our company, please don't hesitate to <a href="/contact" className="text-blue-500 hover:underline">contact us</a>.
      </p>
    </div>
  )
}

export default Page
