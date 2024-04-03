import { Dispatch, useMemo } from "react";
import { CartItem } from "../types/Index";
import { CartActions } from "../reducers/cart-reducer";

type HeaderProps = {
    cart: CartItem[];
    dispatch: Dispatch<CartActions>;
};

export default function Header({ cart, dispatch }: HeaderProps) {
    const total = useMemo(() => cart.reduce((total, guitar) => total + guitar.price * guitar.quantity, 0), [cart]);
    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="./public/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />
                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((cardItem) => (
                                                    <tr key={cardItem.id}>
                                                        <td>
                                                            <img
                                                                className="img-fluid"
                                                                src={`./public/img/${cardItem.image}.jpg`}
                                                                alt="imagen guitarra"
                                                            />
                                                        </td>
                                                        <td>{cardItem.name}</td>
                                                        <td className="fw-bold">${cardItem.price}</td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() =>
                                                                    dispatch({
                                                                        type: "decrement-quantity",
                                                                        payload: cardItem,
                                                                    })
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            {cardItem.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() =>
                                                                    dispatch({
                                                                        type: "increment-quantity",
                                                                        payload: cardItem,
                                                                    })
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() =>
                                                                    dispatch({
                                                                        type: "remove-to-cart",
                                                                        payload: cardItem,
                                                                    })
                                                                }
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <p className="text-end">
                                            Total pagar: <span className="fw-bold">${total}</span>
                                        </p>
                                        <button
                                            className="btn btn-dark w-100 mt-3 p-2"
                                            onClick={() => dispatch({ type: "clear-cart" })}
                                        >
                                            Vaciar Carrito
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
