'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import path for router
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function Login() { // Capitalized component name
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [buttonDisabled, setButtonDisabled] = useState(false); // Correct usage of useState
    const [loading, setLoading] = useState(false); // Correct usage of useState

    const onLogin = async () => { // Renamed function to onLogin
        try {
            setLoading(true);
            const response = await axios.post("/api/login", user);
            console.log("Login success", response.data);
            toast.success("Login successful! Redirecting to profile...");
            setTimeout(() => {
                router.push("/profile");
            }, 2000);
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(`Login failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-2xl font-bold">{loading ? 'processing' : 'login'}</h1>

            <hr className="w-full my-4" />

            <div className="w-64">
                <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />

                <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />

                <button
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                    className={`w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg ${buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 focus:outline-none"} transition duration-300`}
                >
                    {loading ? "Processing" : "Login"}
                </button>
            </div>

            <hr className="w-full my-4" />

            <Link href="/signup" className="text-blue-500 hover:underline">
                Not registered? Sign up here
            </Link>
        </div>
    );
}
