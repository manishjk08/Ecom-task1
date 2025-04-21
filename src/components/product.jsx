import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext'
import useCart from './UseCart'
import { toast } from 'react-toastify'
import useFetchProducts from './UseFetchProducts';
const Product = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { addtocart } = useCart()
    const{data:product,loading,error}=useFetchProducts(`https://fakestoreapi.com/products/${id}`)

    const handleAddToCart = () => {
        addtocart(product)
        toast.success(`${product.title} added to cart`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
        })
        navigate('/cart')
    }
  
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-700"></div>
            </div>
        )
    }
    
    if (error || !product) {
        return (
            <div className="text-center p-8">
                <p className="text-red-500 mb-4">{error || 'Product not found'}</p>
                <button 
                    onClick={() => navigate('/products')} 
                    className="px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-600"
                >
                    Back to the Products
                </button>
            </div>
        )
    }
    
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center bg-white p-8 rounded-lg">
                    <img src={product.image} className="h-80 object-contain" alt={product.title} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center mb-4">
                        <span className="text-2xl font-bold text-indigo-600">Rs: {product.price}</span>
                        <span className="ml-2 text-sm text-black">Category: {product.category}</span>
                    </div>
                    
                    <button
                        onClick={handleAddToCart}
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product
