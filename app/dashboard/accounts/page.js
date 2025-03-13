'use client';

import { ENDPOINTS } from "@/utils/config";
import { useEffect, useState } from "react";

export default function AccountsPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(ENDPOINTS.USERS+'?page=1&limit=10', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInByaXZpbGVnZSI6ImFkbWluIiwiaWF0IjoxNzQxNjgwMzA5LCJleHAiOjE3NDE2ODM5MDl9.ffqrfuI6_L3716G__KWjfwQilXQmr8JQfhGVdHtWEcA'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result.users);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div class="text-white">
                <div class="flex gap-2">
                    <i class="bi bi-folder-symlink-fill text-lg"></i>
                    <span class="pt-[2px]">Management</span>
                    <p>/</p>
                </div>
                <span class="pl-7 font-bold">Account</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mt-16">
                <div className="flex justify-between items-center mb-4 mt-6">
                    <div className="flex gap-3">
                        <div class="relative">
                            <button class="menu-button bg-dodgerBlue text-white px-8 py-2 rounded-xl shadow-md flex items-center gap-3 text-xs font-bold">
                                Divisi / Unit
                                <i class="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                            </button>

                            <div class="menu-dropdown absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 hidden">
                                <div class="py-1">
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">IOT</a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">IOT</a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">IOT</a>
                                </div>
                            </div>
                        </div>

                        <div class="relative">
                            <button class="menu-button bg-dodgerBlue text-white px-6 py-2 rounded-xl shadow-md flex items-center gap-3 text-xs font-bold">
                                Previllage
                                <i class="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                            </button>

                            <div class="menu-dropdown absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 hidden">
                                <div class="py-1">
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Admin</a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Admin</a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Admin</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <input type="text" placeholder="Search" class="border border-black border-opacity-60 px-4 py-2 rounded-2xl shadow-md text-xs" />
                            <span class="absolute right-3 top-1 text-gray-500">
                                <i class="bi bi-search text-xs"></i>
                            </span>
                        </div>

                        <button class="bg-brightGold text-white text-xs font-bold px-4 py-1 rounded-xl shadow-md flex items-center gap-2">
                            <i class="bi bi-plus text-lg"></i>
                            Add Account
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto my-12 shadow-sm rounded-md border border-black/30 text-xs">
                    <table className="w-full border-collapse overflow-hidden border-black/30">
                        <thead className="bg-dodgerBlue/10  text-dodgerBlue">
                            <tr>
                                <th className="px-4 py-2 text-center">Username</th>
                                <th className="px-4 py-2 text-center">User ID</th>
                                <th className="px-4 py-2 text-center">Divisi</th>
                                <th className="px-4 py-2 text-center">Previllage</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item, index) => (
                                <tr key={index} className="border-t border-black/30">
                                    <td className="px-4 py-2 text-center">{item.username}</td>
                                    <td className="px-4 py-2 text-center">{item.serial_id}</td>
                                    <td className="px-4 py-2 text-center">{item.divisi}</td>
                                    <td className="px-4 py-2 text-center">{item.previllage}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button className="bg-skyBlue text-white px-6 py-[6px] rounded-xl text-sm">Edit
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>
                                        <button className="bg-brightGold text-white px-6 py-[6px] rounded-xl text-sm">Delete
                                            <i className="bi bi-trash-fill"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4 gap-4">
                    <div className="flex gap-2 ml-auto">
                        <button className="bg-goldenYellow text-white px-2 py-1 rounded-full">
                            <i className="bi bi-chevron-double-left"></i>
                        </button>
                        <span className="text-black">1</span>
                        <button className="bg-goldenYellow text-white px-2 py-1 rounded-full">
                            <i className="bi bi-chevron-double-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}