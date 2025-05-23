'use client';

import { ENDPOINTS, formatDate } from "@/utils/config";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllReportPage() {
    const [data, setData] = useState(null);
    const [divison, setDivision] = useState(null);
    const [selectedDivision, setSelectedDivision] = useState("");
    const [office, setOffice] = useState(null);
    const [selectedOffice, setSelectedOffice] = useState("");
    const [selectedTime, setSelectedTime] = useState("monthly");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [error, setError] = useState(null);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [isDivisionDropdownOpen, setIsDivisionDropdownOpen] = useState(false);
    const [isOfficeDropdownOpen, setIsOfficeDropdownOpen] = useState(false);
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [refreshFetch, setRefreshFetch] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        async function fetchData() {
            try {
                const response = await fetch(ENDPOINTS.ATTENDANCES + `?page=${page}&limit=5&period=${selectedTime}&division=${selectedDivision}&office=${selectedOffice}&category=${selectedStatus}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                        'authorization': 'Bearer ' + token,
                    },
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
    }, [refreshFetch])
    console.log(office);

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


    const handleDownload = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token'); // Ambil token dari cookie
        try {
            const response = await fetch(ENDPOINTS.ATTENDANCES + '/report/download?', {
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
            a.download = 'attendance_report.csv'; // Nama file unduhan
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const toggleStatusDropdown = () => {
        setIsStatusDropdownOpen(!isStatusDropdownOpen);
    };

    const toggleDivisionDropdown = () => {
        setIsDivisionDropdownOpen(!isDivisionDropdownOpen);
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
    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        setPage(1);
        setRefreshFetch(true);
        setIsStatusDropdownOpen(false);
    };
    const handleTimeChange = (time) => {
        setSelectedTime(time);
        setPage(1);
        setRefreshFetch(true);
        setIsTimeDropdownOpen(false);
    };

    const toggleOfficeDropdown = () => {
        setIsOfficeDropdownOpen(!isOfficeDropdownOpen);
    };

    const toggleTimeDropdown = () => {
        setIsTimeDropdownOpen(!isTimeDropdownOpen);
    };

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
                    <i className="bi bi-house-door text-lg"></i>
                    <span className="pt-[2px]">Dashboard</span>
                    <p>/</p>
                </div>
                <span className="pl-7 font-bold">All Report</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mt-16">
                <div className="flex justify-between items-center mb-4 mt-6">
                    <div className="flex gap-3">
                        <div className="relative">
                            <button
                                className="cursor-pointer menu-button bg-dodgerBlue text-white px-6 py-2 rounded-xl shadow-md flex items-center gap-3 text-xs font-bold"
                                onClick={toggleStatusDropdown}
                            >
                                Status
                                <i className="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                            </button>

                            <div className={`menu-dropdown absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 ${isStatusDropdownOpen ? 'block' : 'hidden'}`}>
                                <div className="py-1 max-h-45 overflow-hidden overflow-y-auto">
                                    <a onClick={e => { handleStatusChange("") }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">All</a>
                                    <a onClick={e => { handleStatusChange("discipline") }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Discipline</a>
                                    <a onClick={e => { handleStatusChange("undiscipline") }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Undiscipline</a>
                                    <a onClick={e => { handleStatusChange("overtime") }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Overtime</a>
                                    <a onClick={e => { handleStatusChange("on_leave") }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">On Leave</a>
                                </div>
                            </div>
                        </div>

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

                        <div className="relative">
                            <button
                                className="menu-button bg-dodgerBlue text-white px-6 py-2 rounded-xl shadow-md flex items.center gap-3 text-xs font-bold"
                                onClick={toggleTimeDropdown}
                            >
                                Time
                                <i className="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                            </button>

                            <div className={`menu-dropdown absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 ${isTimeDropdownOpen ? 'block' : 'hidden'}`}>
                                <div className="py-1 max-h-45 overflow-hidden overflow-y-auto">
                                    <a onClick={e => handleTimeChange("daily")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover.text-black">Today</a>
                                    <a onClick={e => handleTimeChange("weakly")} className="block px-4 py-2 text-sm text-gray-700 hover.bg-slate-200 hover.text-black">This Week</a>
                                    <a onClick={e => handleTimeChange("monthly")} className="block px-4 py-2 text-sm text-gray-700 hover.bg-slate-200 hover.text-black">This Month</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={handleDownload} className="bg-brightGold text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md flex items-center gap-2">
                            Download Review
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto my-12 shadow-sm rounded-md border border-black/30 text-xs">
                    <table className="w-full border-collapse overflow-hidden border-black/30">
                        <thead className="bg-dodgerBlue/10 text-dodgerBlue">
                            <tr>
                                <th className="px-4 py-2 text-center">Name</th>
                                <th className="px-4 py-2 text-center">Check In Time</th>
                                <th className="px-4 py-2 text-center">Divisi / Unit</th>
                                <th className="px-4 py-2 text-center">Office</th>
                                <th className="px-4 py-2 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.attendance.map((item, index) => (
                                <tr key={index} className={`border-t border-black/30 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                    <td className="px-4 py-2 text-center">{item.full_name}</td>
                                    <td className="px-4 py-2 text-center">{formatDate(item.check_in)}</td>
                                    <td className="px-4 py-2 text-center">{item.division_name}</td>
                                    <td className="px-4 py-2 text-center">{item.office_name}</td>
                                    <td className="px-4 py-2 text-center">{item.status_check_in}</td>
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