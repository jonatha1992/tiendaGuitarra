import Footer from "./components/Footer";
import { useState, UseEffect, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";
function App() {
    const [data, setData] = useState(db);
    const [cart, setCart] = useState(inicialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const inicialCart = function () {
        const localCart = localStorage.getItem("cart");
        return localCart ? JSON.parse(localCart) : [];
    };

    function addToCart(guitar) {
        const guitarIndex = cart.findIndex((item) => item.id === guitar.id);
        if (guitarIndex >= 0) {
            cart[guitarIndex].quantity++;
            setCart([...cart]);
        } else {
            guitar.quantity = 1;
            setCart([...cart, guitar]);
        }
        saveLocalStorage();
    }

    function removeToCart(guitar) {
        const newCart = cart.filter((item) => item.id !== guitar.id);
        setCart(newCart);
    }
    function incrementQuantity(guitar) {
        if (guitar.quantity < MAX_ITEMS) {
            const newCart = cart.map((item) => {
                if (item.id === guitar.id) {
                    item.quantity++;
                }
                return item;
            });
            setCart(newCart);
        }
    }

    function decrementQuantity(guitar) {
        if (guitar.quantity < MIN_ITEMS) {
            const newCart = cart.map((item) => {
                if (item.id === guitar.id) {
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

    return (
        <>
            <Header
                cart={cart}
                removeToCart={removeToCart}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                clearCart={clearCart}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>
                <div className="row mt-5">
                    {data.map((guitar) => (
                        <Guitar key={guitar.id} guitar={guitar} setCart={setCart} addToCart={addToCart} />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default App;
