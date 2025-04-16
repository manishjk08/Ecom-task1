import React from 'react'
import image from '../assets/main_banner_bg.png'
import {useNavigate} from 'react-router-dom'
const Home = () => {
  const navigate =useNavigate()
  const handleNavigate =()=>{
      navigate('/products')
  }
  return (
    <div>
      <h1 className='text-center text-3xl mt-5'>Welcome to DE Mart</h1>
      <div className=' relative mt-5 h-[500px] overflow-hidden'>
        <img src={image} alt="bg-image" className="w-full h-full object-cover" />
        <div className='absolute top-1/4 left-1/3 transform -translate-y-1/2 flex  gap-2'>
          <h1 className='text-2xl'>Shop till you drop-then shop some more</h1>
          <button className="cursor-pointer px-7 py-2 bg-green-700 hover:bg-green-600 transition text-white rounded-full" onClick={handleNavigate}>Shop</button>
     
        </div>
      </div>
    </div>
  )
}

export default Home
