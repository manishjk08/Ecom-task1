import { useState, useEffect } from "react";

const useCart = () => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : []
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addtocart = (product) => {
        if (!product) return;
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const removefromcart = (id) => {
        if (!id) return;
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    const updateQuantity = (id, quantity) => {
        if (!id || quantity < 1) return;
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, Math.floor(quantity)) } : item
            )
        )
    }
    const clearCart = () => {
        setCart([])
    }
    return { cart, addtocart, removefromcart, updateQuantity, clearCart }
}
export default useCart