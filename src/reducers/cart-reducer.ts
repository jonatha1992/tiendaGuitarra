import { db } from "../data/db";
import { CartItem, Guitar } from "../types/Index";

export type CartState = {
    data: Guitar[];
    cart: CartItem[];
};
export type CartActions =
    | { type: "add-to-cart"; payload: Guitar }
    | { type: "remove-to-cart"; payload: Guitar }
    | { type: "increment-quantity"; payload: CartItem }
    | { type: "decrement-quantity"; payload: CartItem }
    | { type: "clear-cart" };

const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
};
export const initialState: CartState = {
    data: db,
    cart: initialCart(),
};

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

export const cartReducer = (state: CartState = initialState, action: CartActions) => {
    if (action.type === "add-to-cart") {
        let itemAdded = false; // Flag para saber si se agregó el nuevo ítem

        const updatedCart = state.cart.map((item) => {
            if (item.id === action.payload.id) {
                itemAdded = true; // Marcamos que el ítem ya existe y se actualizará
                return item.quantity < MAX_ITEMS ? { ...item, quantity: item.quantity + 1 } : item;
            }
            return item;
        });

        // Si después de intentar actualizar el carrito el ítem no se ha agregado, lo agregamos.
        if (!itemAdded) {
            const newItem = { ...action.payload, quantity: 1 };
            return {
                ...state,
                cart: [...updatedCart, newItem],
            };
        }

        // Si el ítem ya existía y se actualizó, o no se necesitó actualizar, devolvemos el estado actualizado.
        return {
            ...state,
            cart: updatedCart,
        };
    }

    if (action.type === "remove-to-cart") {
        const cart = state.cart.filter((item) => item.id !== action.payload.id);
        return {
            ...state,
            cart,
        };
    }

    if (action.type === "increment-quantity") {
        const cart = state.cart.map((item) => {
            if (item.id === action.payload.id) {
                return item.quantity < MAX_ITEMS ? { ...item, quantity: item.quantity + 1 } : item;
            }
            return item;
        });
        return { ...state, cart };
    }
    if (action.type === "decrement-quantity") {
        const cart = state.cart.map((item) => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
        });

        return {
            ...state,
            cart,
        };
    }
    if (action.type === "clear-cart") {
        return { ...state, cart: [] };
    }
    return state;
};
