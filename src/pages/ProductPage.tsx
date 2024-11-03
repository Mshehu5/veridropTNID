import React from "react";
import { useParams } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { products } from "../data/products";

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find((p) => p.id === parseInt(id!));
    const { addToCart } = useCart();

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full md:w-1/2 h-auto object-cover mb-4 md:mb-0 md:mr-6"
                />
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-lg mb-2">
                        Price: ${product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
