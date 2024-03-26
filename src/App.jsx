import Footer from "./components/Footer";
import { useState } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";
function App() {
    const [data, setData] = useState(db);
    const [cart, setCart] = useState([]);
    // Todo: Agregar al carrito y mostrarlo en el carro
    function addToCart(guitar) {
        const guitarIndex = cart.findIndex((item) => item.id === guitar.id);
        if (guitarIndex >= 0) {
            cart[guitarIndex].quantity++;
            setCart([...cart]);
        } else {
            guitar.quantity = 1;
            setCart([...cart, guitar]);
        }
    }
    return (
        <>
            <Header />
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
