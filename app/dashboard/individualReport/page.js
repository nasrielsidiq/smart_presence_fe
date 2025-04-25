'use client';

import { ENDPOINTS } from "@/utils/config";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function individualReportPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [divison, setDivision] = useState(null);
    const [selectedDivision, setSelectedDivision] = useState("");
    const [office, setOffice] = useState(null);
    const [selectedOffice, setSelectedOffice] = useState("");
    const [isDivisionDropdownOpen, setIsDivisionDropdownOpen] = useState(false);
    const [isOfficeDropdownOpen, setIsOfficeDropdownOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [refreshFetch, setRefreshFetch] = useState(false);
    const [keySearch, setKeySearch] = useState("");

    useEffect(() => {
        const token = Cookies.get('token');
        async function fetchData() {
            try {
                const response = await fetch(ENDPOINTS.ATTENDANCES + `/individual?page=${page}&limit=5&division=${selectedDivision}&office=${selectedOffice}&key=${keySearch}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                        'Authorization': 'Bearer ' + token,
                    }
                });
                if (!response.ok) {
                    const result = await response.json();
                    const errorMessages = result.errors.map(error => `${error.path}: ${error.msg}`).join(', ');
                    throw new Error(errorMessages || `HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
        setRefreshFetch(false);
    }, [refreshFetch])

    useEffect(() => {
        const token = Cookies.get('token');
        async function fetchData() {
            try{
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

                const officeResponse = await fetch(ENDPOINTS.OFFICES, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                        'Authorization': 'Bearer ' + token,
                    }
                });
                const officeResult = await officeResponse.json();
                if (!officeResponse.ok) {
                    const errorMessages = officeResult.errors.map(error => `${error.path}: ${error.msg}`).join(', ');
                    throw new Error(errorMessages || `HTTP error! status: ${officeResponse.status}`);
                }
                setOffice(officeResult.offices.map(office => ({ value: office.id, label: office.name })));
            }catch( error ){
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    const handleDownload = async (id, name) => {
        const token = Cookies.get('token'); // Ambil token dari cookie
        try {
            const response = await fetch(ENDPOINTS.ATTENDANCES + `/report/${id}/download`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                    'Authorization': 'Bearer ' + token, // Sertakan token untuk autentikasi
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Proses respons sebagai file CSV
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `attendance_${name}_report.csv`; // Nama file unduhan
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };


    const toggleDivisionDropdown = () => {
        setIsDivisionDropdownOpen(!isDivisionDropdownOpen);
    };

    const toggleOfficeDropdown = () => {
        setIsOfficeDropdownOpen(!isOfficeDropdownOpen);
    };

    const handleDivisionChange = (division) => {
        setSelectedDivision(division);
        setPage(1);
        setRefreshFetch(true);
        setIsDivisionDropdownOpen(false);
    };

    const handleOfficeChange = (office) => {
        setSelectedOffice(office);
        setPage(1);
        setRefreshFetch(true);
        setIsOfficeDropdownOpen(false);
    };
    const handleSearch = (search) => {
        setKeySearch(search);
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


    console.log(data);
    return (
        <>
            <div className="text-white">
                <div className="flex gap-2">
                    <i className="bi bi-house-door text-lg"></i>
                    <span className="pt-[2px]">Dashboard</span>
                    <p>/</p>
                </div>
                <span className="pl-7 font-bold">Individual Report</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mt-16 font-poppins text-sm">
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
                                    {divison && divison.map((item, index) => (
                                        <a key={index} onClick={e => { handleDivisionChange(item.value) }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">{item.label}</a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <button
                                className="menu-button bg-dodgerBlue text-white px-6 py-2 rounded-xl shadow-md flex items.center gap-3 text-xs font-bold"
                                onClick={toggleOfficeDropdown}
                            >
                                Office
                                <i className="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                            </button>

                            <div className={`menu-dropdown absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 ${isOfficeDropdownOpen ? 'block' : 'hidden'}`}>
                                <div className="py-1 max-h-45 overflow-hidden overflow-y-auto">
                                    <a onClick={e => { handleOfficeChange("") }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">All</a>
                                    {office && office.map((item, index) => (
                                        <a key={index} onClick={e => { handleOfficeChange(item.value) }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">{item.label}</a>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex ">
                        <div className="relative">
                            <input onKeyDown={e => {e.key === "Enter" && handleSearch(e.target.value)}} type="text" placeholder="Search" className="border border-black border-opacity-60 px-4 py-2 rounded-2xl shadow-md text-xs w-48 focus:outline-none focus:ring-1 focus:ring-goldenYellow-300 focus:border-none text-gray-500" />
                            <span className="absolute right-3 top-1 text-gray-500">
                                <i className="bi bi-search text-xs bg-white rounded-lg"></i>
                            </span>
                        </div>
                    </div>

                </div>
                <div className="overflow-x-auto my-12 shadow-sm rounded-md border border-black/30 text-xs">
                    <table className="w-full border-collapse overflow-hidden border-black/30">
                        <thead className="bg-dodgerBlue/10 text-dodgerBlue">
                            <tr>
                                <th className="px-4 py-2 text-center">Name</th>
                                <th className="px-4 py-2 text-center">Divisi / Unit</th>
                                <th className="px-4 py-2 text-center">Status</th>
                                <th className="px-4 py-2 text-center">Check In Time</th>
                                <th className="px-4 py-2 text-center">Office</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.attendance.map((item, index) => (
                                <tr key={index} className={`border-t border-black/30 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                    <td className="px-4 py-2 text-center">{item.full_name}</td>
                                    <td className="px-4 py-2 text-center">{item.division_name}</td>
                                    <td className="px-4 py-2 text-center">{item.status_check_in === null ? "leave" : item.status_check_in}</td>
                                    <td className="px-4 py-2 text-center">{item.check_in === null ? "leave" : item.check_in}</td>
                                    <td className="px-4 py-2 text-center">{item.office_name}</td>
                                    <td className="px-4 py-2 text-center gap-2">
                                        <Link href={`/dashboard/individualReport/${item.employee_id}?name=${item.full_name}`} className="bg-skyBlue text-white px-6 py-[6px] rounded-full my-1">
                                            View Report
                                        </Link>
                                        <button onClick={() => { handleDownload(item.employee_id, item.full_name) }} className="bg-brightGold text-white px-6 py-[6px] rounded-full">
                                            Download
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


        </>
    );
}