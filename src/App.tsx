import Footer from "./components/Footer";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useReducer } from "react";
import { cartReducer, initialState } from "./reducers/cart-reducer";

function App() {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <>
            <Header cart={state.cart} dispatch={dispatch} />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>
                <div className="row mt-5">
                    {state.data.map((guitar) => (
                        <Guitar key={guitar.id} guitar={guitar} dispatch={dispatch} />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default App;
