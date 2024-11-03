import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./Auth/LoginModal";
import SignupModal from "./Auth/SignupModal";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const { cart } = useCart();
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
            <Link
                to="/"
                className="text-xl font-bold"
            >
                E-Commerce
            </Link>
            <div className="space-x-4">
                <Link
                    to="/cart"
                    className="hover:text-gray-300"
                >
                    Cart ({cart.length})
                </Link>
                {user ? (
                    <button
                        onClick={() => logout()}
                        className="hover:text-gray-300"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => setIsLoginOpen(true)}
                            className="hover:text-gray-300"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsSignupOpen(true)}
                            className="hover:text-gray-300"
                        >
                            Signup
                        </button>
                    </>
                )}
            </div>

            {/* Modals */}
            {isLoginOpen && (
                <LoginModal onClose={() => setIsLoginOpen(false)} />
            )}
            {isSignupOpen && (
                <SignupModal onClose={() => setIsSignupOpen(false)} />
            )}
        </nav>
    );
};

export default Navbar;
