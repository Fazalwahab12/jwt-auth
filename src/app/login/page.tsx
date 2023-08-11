'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function login() {
    const [user, setUser] = useState({
     
        emil: '',
        passward: '',
    });

    const onlogin = async () => {
        // Implement your signup logic here
    };

    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-2xl font-bold">login</h1>

            <hr className="w-full my-4" />

            <div className="w-64">
               

                <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={user.emil}
                    onChange={(e) => setUser({ ...user, emil: e.target.value })}
                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />

                <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                    Password
                </label>
                <input
                   type="email" id="email" name="email"
                    placeholder="Password"
                    value={user.passward}
                    onChange={(e) => setUser({ ...user, passward: e.target.value })}
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
