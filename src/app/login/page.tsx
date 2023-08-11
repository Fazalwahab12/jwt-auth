'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify'

export default function login() {
    const router = useRouter();
    const [user, setUser] = useState({
     
        email: '',
        password: '',
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onlogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/login", user);
            console.log("Signup success", response.data);
            router.push("/profile");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center mt-8">
        <h1 className="text-2xl font-bold">{loading ? 'procesing' : 'login'}</h1>

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
                    password
                </label>
                <input
                   type="email" id="email" name="email"
                    placeholder="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />

                <button
                    onClick={onlogin}
                    className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Sign Up
                </button>
            </div>

            <hr className="w-full my-4" />

            <Link href="siginup" className="text-blue-500 hover:underline">
                Not registered? signup in here
            </Link>
        </div>
    );
}
