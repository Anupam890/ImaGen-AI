import Toast, { Toaster } from "react-hot-toast";
// import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../utils/firebaseConfig.js";
// import { FaGoogle } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";

export default function Login() {
    const toast = Toast;
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            // Handle the result, such as saving the user info
            toast.success("Logged in successfully!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <Toaster />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleGoogleLogin}
                >
                    Login with Google
                </button>
            </div>
        </>
    );
}
