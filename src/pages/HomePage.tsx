// src/pages/HomePage.tsx
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { Product } from "../types/Product";

const HomePage = () => {
    const { addToCart } = useCart();

    const handleAddToCart = (product: Product) => {
        addToCart(product);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Banner Section */}
            <div className="bg-blue-500 text-white text-center py-16">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to Our E-Commerce Store
                </h1>
                <p className="text-lg">
                    Discover amazing products at unbeatable prices
                </p>
                <Link
                    to="/products"
                    className="mt-6 inline-block bg-white text-blue-500 py-2 px-4 rounded hover:bg-gray-200"
                >
                    Shop Now
                </Link>
            </div>

            {/* Featured Products Section */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg p-4 shadow-lg"
                        >
                            <Link to={`/product/${product.id}`}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-48 object-cover mb-4"
                                />
                                <h2 className="text-xl font-semibold">
                                    {product.title}
                                </h2>
                                <p className="text-lg font-bold">
                                    ${product.price.toFixed(2)}
                                </p>
                            </Link>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
