import Footer from "./components/Footer";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import useCart from "./hooks/useCart";

function App() {
    const { total, isEmpty, data, cart, addToCart, removeToCart, incrementQuantity, decrementQuantity, clearCart } =
        useCart();
    return (
        <>
            <Header
                cart={cart}
                removeToCart={removeToCart}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                clearCart={clearCart}
                total={total}
                isEmpty={isEmpty}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>
                <div className="row mt-5">
                    {data.map((guitar) => (
                        <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default App;
