import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    // Calculate the total price
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <p className="text-gray-600">Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="space-y-4">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border-b py-4"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {item.title}
                                </h2>
                                <p className="text-gray-600">
                                    ${item.price.toFixed(2)} x {item.quantity}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-right">
                <p className="text-lg font-bold">
                    Total: ${totalPrice.toFixed(2)}
                </p>
                <button
                    onClick={clearCart}
                    className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Clear Cart
                </button>
                <button
                    className="mt-4 ml-4 bg-blue-500 text-white px-6 py-2 rounded"
                    onClick={() => navigate("/checkout")}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;
