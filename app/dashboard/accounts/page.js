'use client';

import { ENDPOINTS } from "@/utils/config";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ModalUpdate from "./modalUpdate";
import ModalCreate from "./modalCreate";
import Swal from "sweetalert2";

export default function AccountsPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isDivisionDropdownOpen, setIsDivisionDropdownOpen] = useState(false);
    const [isPrevillageDropdownOpen, setIsPrevillageDropdownOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [refreshFetch, setRefreshFetch] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [division, setDivision] = useState(null);
    const [selectedDivision, setSelectedDivision] = useState("")
    const [selectedPrevillage, setSelectedPrevillage] = useState("")
    const [page, setPage] = useState(1);
    const [selectedKey, setSelectedKey] = useState("");

    const deleteUser = async (userId) => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`${ENDPOINTS.USERS}/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                setDeleteMessage(errorData.message);
            } else {
                setDeleteMessage(null);
            }
            setRefreshFetch(true);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const token = Cookies.get('token');
                const response = await fetch(ENDPOINTS.USERS+ `?division=${selectedDivision}&privilage=${selectedPrevillage}&page=${page}&limit=5&key=${selectedKey}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        }

        fetchData();
        setRefreshFetch(false);
    }, [refreshFetch]);

    useEffect(() => {
            const token = Cookies.get('token');
            async function fetchData() {
                try {
                    const divisionResponse = await fetch(ENDPOINTS.DIVISIONS, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'ngrok-skip-browser-warning': 'true',
                            'authorization': 'Bearer ' + token,
                        },
                    });
                    if (!divisionResponse.ok) {
                        throw new Error(`HTTP error! status: ${divisionResponse.status}`);
                    }
                    const divisionResult = await divisionResponse.json();
                    setDivision(divisionResult.divisions.map(division => ({ value: division.id, label: division.name })));
    
                } catch (error) {
                    setError(error.message);
                    console.error('Error fetching data:', error);
                }
            }
            fetchData();
        }, [])

    const toggleDivisionDropdown = () => {
        setIsDivisionDropdownOpen(!isDivisionDropdownOpen);
    };

    const togglePrevillageDropdown = () => {
        setIsPrevillageDropdownOpen(!isPrevillageDropdownOpen);
    };

    const openUpdateModal = (userId) => {
        setSelectedUserId(userId);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedUserId(null);
        setRefreshFetch(true);
    };

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        setRefreshFetch(true);
    };

    const handleDivisionChange = (division) => {
        setSelectedDivision(division);
        setPage(1);
        setRefreshFetch(true);
        setIsDivisionDropdownOpen(false);
    };
    const handlePrevillageChange = (division) => {
        setSelectedPrevillage(division);
        setPage(1);
        setRefreshFetch(true);
        setIsPrevillageDropdownOpen(false);
    };

    const handleSearch = (search) => {
        setSelectedKey(search);
        setPage(1);
        setRefreshFetch(true);
    }

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
        setRefreshFetch(true);
    }

    const handlePrevPage = () => {
        setPage((prevPage) => prevPage - 1);
        setRefreshFetch(true);
    }

    return (
        <>
            <div className="text-white">
                <div className="flex gap-2">
                    <i className="bi bi-folder-symlink-fill text-lg"></i>
                    <span className="pt-[2px]">Management</span>
                    <p>/</p>
                </div>
                <span className="pl-7 font-bold">Account</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mt-16">
                <div className="flex justify-between items-center mb-4 mt-6">
                    <div className="flex gap-3">
                    <div className="relative">
                            <button
                                className="menu-button bg-dodgerBlue text-white px-8 py-2 rounded-xl shadow-md flex items-center gap-3 text-xs font-bold"
                                onClick={toggleDivisionDropdown}
                            >
                                Divisi / Unit
                                <i className="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                            </button>

                            <div className={`menu-dropdown absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 ${isDivisionDropdownOpen ? 'block' : 'hidden'}`}>
                                <div className="py-1 max-h-45 overflow-hidden overflow-y-auto">
                                    <a onClick={e => { handleDivisionChange("") }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">All</a>
                                    {division && division.map((item, index) => (
                                        <a key={index} onClick={e => { handleDivisionChange(item.value) }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">{item.label}</a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <button
                                className="menu-button bg-dodgerBlue text-white px-6 py-2 rounded-xl shadow-md flex items-center gap-3 text-xs font-bold"
                                onClick={togglePrevillageDropdown}
                            >
                                Previllage
                                <i className="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                            </button>

                            <div className={`menu-dropdown absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 ${isPrevillageDropdownOpen ? 'block' : 'hidden'}`}>
                                <div className="py-1">
                                    <a onClick={() => {handlePrevillageChange('')}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">All</a>
                                    <a onClick={() => {handlePrevillageChange('admin')}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Admin</a>
                                    <a onClick={() => {handlePrevillageChange('supervisor')}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Supervisor</a>
                                    <a onClick={() => {handlePrevillageChange('top_manager')}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Top Manager</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input onKeyDown={e => { e.key === "Enter" && handleSearch(e.target.value) }} type="text" placeholder="Search" className="border border-black/60 px-4 py-2 rounded-2xl shadow-md text-xs" />
                            <span  className="absolute right-3 top-1 text-gray-500">
                                <i className="bi bi-search text-xs"></i>
                            </span>
                        </div>

                        <button className="bg-brightGold text-white text-xs font-bold px-4 py-1 rounded-xl shadow-md flex items-center gap-2" onClick={openCreateModal}>
                            <i className="bi bi-plus text-lg"></i>
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
                            {data && data.users.map((item, index) => (
                                <tr key={index} className={`border-t border-black/30 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                    <td className="px-4 py-2 text-center">{item.username}</td>
                                    <td className="px-4 py-2 text-center">{item.serial_id}</td>
                                    <td className="px-4 py-2 text-center">{item.division_name}</td>
                                    <td className="px-4 py-2 text-center">{item.privilage}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button className="bg-skyBlue text-white px-6 py-[6px] rounded-xl" onClick={() => openUpdateModal(item.id)}>Edit
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>
                                        <button
                                            className="bg-brightGold text-white px-6 py-[6px] rounded-xl"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'Are you sure?',
                                                    text: "You won't be able to revert this!",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Yes, delete it!'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        deleteUser(item.id);
                                                        if (deleteMessage === null) {
                                                            Swal.fire(
                                                                'Deleted!',
                                                                'Account has been deleted.',
                                                                'success'
                                                            );
                                                        } else {
                                                            Swal.fire(
                                                                'Delete failed',
                                                                deleteMessage,
                                                                'error'
                                                            );
                                                        }
                                                    }
                                                });
                                            }}
                                        >
                                            Delete
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
                        <button disabled={page === 1 ? true : false} onClick={handlePrevPage} className="disabled:bg-gray-300  bg-goldenYellow text-white px-2 py-1 rounded-full">
                            <i className="bi bi-chevron-double-left"></i>
                        </button>
                        <span className="text-black">{page}</span>
                        <button disabled={page >= data?.totalPages ? true : false} onClick={handleNextPage} className="disabled:bg-gray-300  bg-goldenYellow text-white px-2 py-1 rounded-full">
                            <i className="bi bi-chevron-double-right"></i>
                        </button>
                    </div>
                </div>
            </div>

            {isUpdateModalOpen && <ModalUpdate id={selectedUserId} closeModal={closeUpdateModal} />}
            {isCreateModalOpen && <ModalCreate closeModal={closeCreateModal} />}
        </>
    );
}