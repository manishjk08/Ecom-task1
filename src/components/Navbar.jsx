import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import search from '../assets/search.svg'
import cart from '../assets/cart.svg'
import menu from '../assets/menu.svg'
import { Outlet ,NavLink, useNavigate } from 'react-router-dom'
import {useAuth} from '../Context/AuthContext'
const Navbar = () => {
    const[open,setOpen]=useState(false)
    const {user,logout}=useAuth()
    const navigate =useNavigate()
    const handleLoginButton=()=>{
        navigate('/Login')
    }
  return (
    <>
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to="/">
                <img className="h-9" src={logo} alt="logo" />
            </NavLink>

            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="products">Products</NavLink>
                <NavLink to="contact">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={search} alt="search_icon" />
                </div>

                <div className="relative cursor-pointer">
                 <img src={cart} alt="cart" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-green-500 w-[18px] h-[18px] rounded-full">0</button>
                </div>

                {user ? (
                    <>
                    <span className='text-gray-800'>Welcome {user.username}</span>
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-green-700 hover:bg-green-600 transition text-white rounded-full text-sm">
                        Logout
                    </button>
                    </>
                ) : (
                    <button className="cursor-pointer px-8 py-2 bg-green-700 hover:bg-green-600 transition text-white rounded-full"  
                        onClick={handleLoginButton}>
                        Login
                    </button>
                )}
                
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
               <img src={menu} alt="menu icon" />
            </button>

            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="products">Products</NavLink>
                <NavLink to="contact">Contact</NavLink>

                {user ? (
                    <>
                    <span className='text-gray-800'>Welcome {user.username}</span>
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-green-700 hover:bg-green-600 transition text-white rounded-full text-sm">
                        Logout
                    </button>
                    </>
                ) : (
                    <button className="cursor-pointer px-6 py-2 mt-2 bg-green-700 hover:bg-green-600 transition text-white rounded-full text-sm"
                        onClick={handleLoginButton}>
                        Login
                    </button>
                )}
            </div>
        </nav>
        <Outlet/>
        </>
  )
}

export default Navbar
