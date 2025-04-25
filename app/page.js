'use client'

import { ENDPOINTS } from '@/utils/config';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import React from 'react';
import Image from 'next/image';

const LoginImage = () => (
    <Image src="/img/login.png" alt="Login Image" layout="fill" objectFit="cover" className="object-cover rounded-tr-3xl rounded-br-3xl" />
);

export default function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.push('/dashboard');
        }
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.status !== 200) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            Cookies.set('token', data.token, { expires: 7 });
            Cookies.set('privilage', data.user.privilege, { expires: 7 });
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your username and password.');
        }
    }, [username, password, router]);

    return (
        <>
            <div className="flex bg-white shadow-lg rounded-lg">
                <div className='w-1/2 h-screen relative'>
                    <LoginImage />
                </div>

                <div className="flex flex-col justify-center items-center flex-1 px-12">
                    <div className="items-start">
                        <div className="font-poppins">
                            <span className="text-3xl font-bold">Sign In</span>
                            <p className="font-medium">
                                Selamat Datang di Smart Presence
                                <span className="text-goldenYellow font-semibold">Antares</span>
                            </p>
                            <p className="text-xs text-gray-500">
                                Masukan Username dan Password untuk melanjutkan
                            </p>
                        </div>

                        <div className="my-10">
                            <form onSubmit={handleSubmit} className="w-[360px]">
                                <div className="mb-4">
                                    <label htmlFor="username" className="block font-semibold text-sm my-2">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Masukan Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 invalid:border-red-500 peer"
                                    />
                                    <p className="text-red-500 text-sm mt-2 hidden peer-invalid:block">Username should not be empty / Please enter your Username</p>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="password" className="block font-semibold text-sm my-2">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Masukan Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 invalid:border-red-500 peer"
                                    />
                                    <p className="text-red-500 text-sm mt-2 hidden peer-invalid:block">Password should not be empty / Please enter your password</p>
                                </div>

                                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                                <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}