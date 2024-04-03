import { db } from "../data/db";
import { useState, useEffect, useMemo } from "react";
import type { Guitar, CartItem } from "../types/Index";

const useCart = () => {
    const inicialCart = function (): CartItem[] {
        const localCart = localStorage.getItem("cart");
        return localCart ? JSON.parse(localCart) : [];
    };

    const [data] = useState(db);
    const [cart, setCart] = useState(inicialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(guitar: Guitar) {
        const guitarIndex = cart.findIndex((item) => item.id === guitar.id);
        if (guitarIndex >= 0) {
            cart[guitarIndex].quantity++;
            setCart([...cart]);
        } else {
            const newItem = { ...guitar, quantity: 1 };
            setCart([...cart, newItem]);
        }
    }

    function removeToCart(guitar: Guitar) {
        const newCart = cart.filter((item: Guitar) => item.id !== guitar.id);
        setCart(newCart);
    }
    function incrementQuantity(cardItem: CartItem) {
        if (cardItem.quantity < MAX_ITEMS) {
            const newCart = cart.map((item) => {
                if (item.id === cardItem.id) {
                    item.quantity++;
                }
                return item;
            });
            setCart(newCart);
        }
    }

    function decrementQuantity(cardItem: CartItem) {
        if (cardItem.quantity > MIN_ITEMS) {
            const newCart = cart.map((item) => {
                if (item.id === cardItem.id) {
                    item.quantity--;
                }
                return item;
            });
            setCart(newCart);
        }
    }

    function clearCart() {
        setCart([]);
    }

    const total = useMemo(() => cart.reduce((total, guitar) => total + guitar.price * guitar.quantity, 0), [cart]);
    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    return {
        data,
        cart,
        addToCart,
        removeToCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        total,
        isEmpty,
    };
};

export default useCart;
