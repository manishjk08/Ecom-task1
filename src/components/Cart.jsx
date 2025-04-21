import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../Context/UseCart'
const Cart = () => {
    const { cart = [], removefromcart, updateQuantity, clearCart } = useCart()
    const navigate = useNavigate()
    

    const totalprice = useMemo(() => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
    }, [cart])

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return
        updateQuantity(id, newQuantity)
    }

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.error('Your cart is empty!')
            return
        }
        toast.success('Order placed successfully!')
        navigate('/')
    }

    return (
        <div className='p-4'>
            <h2 className="text-2xl text-center font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="text-center p-8">
                    <h2 className="text-xl mb-4">Your cart is empty</h2>
                    <Link to="/products" className="text-indigo-600 hover:text-indigo-700 underline">Go to Shop</Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center border p-4 rounded-lg">
                            <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mr-4" />
                            <div className="flex-1">
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="text-indigo-600">Rs: {item.price}</p>
                                <div className="flex items-center mt-2">
                                    <span>Quantity : {item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        className="px-2 py-1 bg-gray-200 rounded mx-2"
                                    >
                                        -
                                    </button>
                                    
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 mx-2"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => removefromcart(item.id)}
                                className="ml-4 text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="mt-6 text-right">
                        <h3 className="text-xl font-bold">Total: Rs {totalprice}</h3>
                        <button
                            onClick={handleCheckout}
                            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700"
                        >
                            Buy
                        </button>
                        <button
                            onClick={clearCart}
                            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 flex"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
