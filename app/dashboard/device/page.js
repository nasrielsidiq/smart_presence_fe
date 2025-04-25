'use client';

import { ENDPOINTS } from "@/utils/config";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import ModalCreate from "./modalCreate";
import ModalUpdate from "./modalUpdate";

export default function DivisionPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [refreshFetch, setRefreshFetch] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedKey, setSelectedKey] = useState("");
    const [page, setPage] = useState(1);


    const deleteDevice = async (userId) => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(ENDPOINTS.DEVICE + '/' + userId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                    'authorization': 'Bearer ' + token,
                }
            });
            const result = await response.json();
            if (!response.ok) {
                setDeleteMessage(result.error);
                console.error('HTTP error! status:', result.error);
            }
            setRefreshFetch(true);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const token = Cookies.get('token');
                const response = await fetch(ENDPOINTS.DEVICE + `?limit=5&page=${page}&key=${selectedKey}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                        'authorization': 'Bearer ' + token,
                    }
                });
                if (!response.ok) {
                    console.error('HTTP error! status:', response.json());
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

    const toggleCreateModal = () => {
        setOpenCreateModal(!openCreateModal);
        setRefreshFetch(true);
    };

    const toggleUpdateModal = (id) => {
        setOpenUpdateModal(!openUpdateModal);
        setSelectedId(id)
        setRefreshFetch(true);
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
                <span className="pl-7 font-bold">Device</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mt-16">
                <div className="flex justify-between items-center mb-4 mt-6">
                    <div className="flex gap-3">
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input onKeyDown={e => { e.key === "Enter" && handleSearch(e.target.value) }} type="text" placeholder="Search" className="border border-black/60 px-4 py-2 rounded-2xl shadow-md text-xs" />
                            <span className="absolute right-3 top-1 text-gray-500">
                                <i className="bi bi-search text-xs"></i>
                            </span>
                        </div>

                        <button className="bg-brightGold text-white text-xs font-bold px-4 py-1 rounded-xl shadow-md flex items-center gap-2" onClick={toggleCreateModal}>
                            <i className="bi bi-plus text-lg"></i>
                            Add Device
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto my-12 shadow-sm rounded-md border border-black/30 text-xs">
                    <table className="w-full border-collapse overflow-hidden border-black/30">
                        <thead className="bg-dodgerBlue/10 text-dodgerBlue">
                            <tr>
                                <th className="px-4 py-2 text-center">Device Code</th>
                                {/* <th className="px-4 py-2 text-center">Divisi / Unit</th> */}
                                <th className="px-4 py-2 text-center">Device Name</th>
                                <th className="px-4 py-2 text-center">Status</th>
                                <th className="px-4 py-2 text-center">Location</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.devices.map((item, index) => (
                                    <tr key={index} className={`border-t border-black/30 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                        <td className="px-4 py-2 text-center">{item.device_code}</td>
                                        {/* <td className="px-4 py-2 text-center">{item.division_name}</td> */}
                                        <td className="px-4 py-2 text-center">{item.device_name}</td>
                                        <td className={`px-4 py-2 text-center font-semibold ${item.status === "active" ? "text-green-500" : "text-red-500"}`}>{item.status}</td>
                                        <td className="px-4 py-2 text-center">{item.location}</td>
                                        <td className="px-4 py-2 text-center">
                                            <button
                                                className="bg-skyBlue text-white px-6 py-[6px] rounded-xl"
                                                onClick={() => toggleUpdateModal(item.device_code)}
                                            >
                                                Edit
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
                                                            deleteDevice(item.device_code);
                                                            if (deleteMessage === null) {
                                                                Swal.fire(
                                                                    'Deleted!',
                                                                    'The device has been deleted.',
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
                                ))
                            }
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

            {openCreateModal && <ModalCreate closeModal={toggleCreateModal} />}
            {openUpdateModal && <ModalUpdate closeModal={toggleUpdateModal} id={selectedId} />}
        </>
    );
}