/* eslint-disable no-restricted-globals */
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ProductPage from "../pages/ProductPage";

const Router = () => {
    return (
        <Routes>
            <Route>
                {/* Unprotected Routes [home, about, privacy, login, signup, forgot password] */}
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/cart"
                    element={<CartPage />}
                />
                <Route
                    path="/checkout"
                    element={<CheckoutPage />}
                />
                <Route
                    path="/product/:id"
                    element={<ProductPage />}
                />
                <Route
                    path="*"
                    element={<h1>404, page not found</h1>}
                />
            </Route>

            <Route
                path="*"
                element={<h1>404, page not found</h1>}
            />
        </Routes>
    );
};

export default Router;
