// src/context/AuthContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../utils/firebase";

// Define the shape of our context
interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<User | void>;
    logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Login function
    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setLoading(false);
        }
    };

    // Signup function
    const signup = async (email: string, password: string) => {
        setLoading(true);
        try {
            const user = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password,
            );
            return user.user;
        } catch (error) {
            console.error("Signup failed", error);
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = async () => {
        setLoading(true);
        try {
            await signOut(FIREBASE_AUTH);
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setLoading(false);
        }
    };

    // Context value
    const value = { user, loading, login, signup, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// useAuth hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
