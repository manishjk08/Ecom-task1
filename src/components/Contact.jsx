import React from 'react'

const Contact = () => {
  return (
    <div>
      <h1 className='text-center text-2xl mt-5'>Contact US</h1>

      <div className='p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-4'>
        <h1 className='text-2xl font-bold text-center'>
          Direct Contact
        </h1>
        <div className='flex flex-col space-y-2 '>
        <a href='tel:9866121290' className='text-blue-500 underline'>Call us: 9866121290</a> <br />
        <a href='mailto:jamarkattelmanish2@gmail.com' className='text-blue-500 underline'>Email us: jamarkattelmanish2@gmail.com</a>
        </div>
      </div>
    </div>
  )
}

export default Contact
