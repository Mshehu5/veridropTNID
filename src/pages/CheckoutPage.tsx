import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../utils/firebase";

const CheckoutPage: React.FC = () => {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Calculate the total price
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    // Handle checkout
    const handleCheckout = () => {
        createOrder();
        // Simulate successful checkout
        setShowSuccessModal(true);
        clearCart();
    };

    // Close the modal and navigate to the homepage
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate("/");
    };

    const createOrder = async () => {
        try {
            if (!user) {
                throw new Error("User not logged in");
            }

            // Create new order
            const orderRef = await addDoc(collection(FIREBASE_DB, "orders"), {
                ...cart,
                email: user.email, // User's email
                userId: user.uid, // User's ID
                createdAt: new Date(), // Timestamp for when the order was created
            });
            console.log("Order created with ID:", orderRef.id);
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border-b py-2"
                    >
                        <p>
                            {item.title} (x{item.quantity})
                        </p>
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
                <p className="text-lg font-bold mt-4">
                    Total: ${totalPrice.toFixed(2)}
                </p>
            </div>

            <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white px-6 py-2 rounded mt-4"
            >
                Pay
            </button>

            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-80 text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Payment Successful!
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Thank you for your purchase.
                        </p>
                        <button
                            onClick={handleCloseModal}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Go to Homepage
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
