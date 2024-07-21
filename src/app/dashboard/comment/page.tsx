import React from 'react'

export default function page() {
  const comments = [
    { siteName: 'Example Site 1', description: 'This is a great site!  bufger eigeryigf  etrefb erfterifb ', date: '2023-05-01' },
    { siteName: 'Example Site 2 ', description: 'Needs improvement', date: '2023-05-02' },
    { siteName: 'Example Site 3', description: 'Very informative', date: '2023-05-03' },
  ]

  return (
    <section className=' w-[100%] mt-[7.5rem] sm:mt-[5rem] sm:w-[80%]  md-[1000px]:w-[82%]  lg:max-w-[1000px]  p-4   sm:p-8  float-right'>
      <div className='flex w-full flex-col gap-10'>
        <h3 className='text-2xl mt-6 lg:mt-2'>Comments </h3>
        <div className='mt-6 relative h-max p-4 overflow-x-auto'>
          <div className='w-[880px]'>
            <table className='w-full text-sm text-left border-collapse'>
              <thead className="text-gray-600 bg-white font-medium border-b">
                <tr>
                  <th className='border p-2'>Site Name</th>
                  <th className='border p-2'>Feedback</th>
                  <th className='border p-2'>Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-sky-50 divide-y">
                {comments.map((comment, index) => (
                  <tr key={index} >
                    <td className="border-none p-6">{comment.siteName}</td>
                    <td className='border-none p-6'>{comment.description}</td>
                    <td className='border-none p-6'>{comment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}