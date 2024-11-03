import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTnid } from "../../hooks/useTnid";

const SignupModal = ({ onClose }: { onClose: () => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useAuth();
    const { createTnidUser } = useTnid();
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        phone: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await signup(email, password);
            await createTnidUser({
                ...userDetails,
                email: user!.email,
                uid: user!.uid,
            });
            onClose();
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <button
                    onClick={onClose}
                    className="float-right text-gray-500"
                >
                    X
                </button>
                <h2 className="text-2xl mb-4">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Firstname"
                            className="w-full p-2 border rounded"
                            value={userDetails.firstName}
                            onChange={(e) =>
                                setUserDetails({
                                    ...userDetails,
                                    firstName: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Lastname"
                            className="w-full p-2 border rounded"
                            value={userDetails.lastName}
                            onChange={(e) =>
                                setUserDetails({
                                    ...userDetails,
                                    lastName: e.target.value,
                                })
                            }
                        />
                    </div>
                    <input
                        type="number"
                        placeholder="Phone Number"
                        className="w-full p-2 border rounded mb-4"
                        value={userDetails.phone}
                        onChange={(e) =>
                            setUserDetails({
                                ...userDetails,
                                phone: e.target.value,
                            })
                        }
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupModal;
