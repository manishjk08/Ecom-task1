import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import searchicon from '../assets/search.svg'
import cart from '../assets/cart.svg'
import menu from '../assets/menu.svg'
import { Outlet ,NavLink, useNavigate } from 'react-router-dom'
import {useAuth} from '../Context/AuthContext'
import useCart from './UseCart'
import { useSearch } from '../Context/SearchContext'

const Navbar = () => {
    const[open,setOpen]=useState(false)
    const {user,logout}=useAuth()
    const { cart: cartItems } = useCart()
    const { search, setSearch } = useSearch()
    const navigate =useNavigate()
    const handleLoginButton=()=>{
        navigate('/Login')
    }

    const handleCart=()=>{
        navigate('/Cart')
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (window.location.pathname !== '/products') {
            navigate('/products');
        }
    }

  return (
    <>
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to="/">
                <img className="h-9" src={logo} alt="logo" />
            </NavLink>

            
            <div className="flex sm:hidden items-center gap-4">
                <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input 
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" 
                        type="text" 
                        placeholder="Search products" 
                        value={search}
                        onChange={handleSearch}
                    />
                    <img src={searchicon} alt="search_icon" />
                </div>

                <div className="relative cursor-pointer" onClick={handleCart}>
                    <img src={cart} alt="cart" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{cartItems.length}</button>
                </div>
            </div>

            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="products">Products</NavLink>
                <NavLink to="contact">Contact</NavLink>

                <div className="lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input 
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" 
                        type="text" 
                        placeholder="Search products" 
                        value={search}
                        onChange={handleSearch}
                    />
                    <img src={searchicon} alt="search_icon" />
                </div>

                <div className="relative cursor-pointer" onClick={handleCart}>
                    <img src={cart} alt="cart" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{cartItems.length}</button>
                </div>

                {user ? (
                    <>
                    <span className='text-gray-800'>Welcome {user.username}</span>
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-full text-sm">
                        Logout
                    </button>
                    </>
                ) : (
                    <button className="cursor-pointer px-8 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-full"  
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
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-full text-sm">
                        Logout
                    </button>
                    </>
                ) : (
                    <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-full text-sm"
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
