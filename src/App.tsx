import Navbar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Router from "./routes/Router";

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <div className="h-screen overflow-auto">
                    <Navbar />
                    <Router />
                </div>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
