import React from 'react'
import image from '../assets/main_banner_bg.png'
import {useNavigate} from 'react-router-dom'
import banner from '../assets/banner.jpg'
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
        <div className='absolute top-1/4 left-1/3 transform -translate-y-1/2 flex flex-col gap-2'>
          <h1 className='text-2xl'>Shop till you drop-then shop some more</h1>
          <div>
          <button className="cursor-pointer px-7 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-full" onClick={handleNavigate}>Shop</button>
          </div>
          
        </div>
      </div>
      <div>
        <h1 className='text-3xl text-center my-5'>Our New Products</h1>
        <div >
          <img src={banner} alt='banner' />
        </div>
      </div>
    </div>
  )
}

export default Home
