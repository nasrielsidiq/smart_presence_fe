'use client';
import { ENDPOINTS, formatDate } from "@/utils/config";
import Cookies from "js-cookie";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailIndividualReportPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id;
    const name = searchParams.get('name');
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        async function fetchData() {
            try {
                const response = await fetch(ENDPOINTS.ATTENDANCES + `/${id}?period=monthly`, {
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
    return (
        <>
            <div className="text-white">
                <div className="flex gap-2">
                    <i className="bi bi-house-door text-lg"></i>
                    <span className="pt-[2px]">Dashboard</span>
                    <p>/</p>
                </div>
                <Link href={"/dashboard/individualReport"} className="pl-7">Individual Report</Link><span className="font-bold"> - {name}</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mt-16 font-poppins text-sm">
                <div className="flex justify-between items-center mb-4 mt-6">
                    <div className="flex items-center gap-3">
                        <button onClick={() => {handleDownload(id, name)}} className="bg-brightGold text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md flex items-center gap-2">
                            Download Review
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto mb-12 mt-5 shadow-sm rounded-xl border border-black/50 text-xs">
                    <table className="w-full border-collapse overflow-hidden">
                        <thead className="bg-black/76 text-white divide-x divide-dodgerBlue/40">
                            <tr>
                                <th className="px-4 py-2 text-center">Date</th>
                                <th className="px-4 py-2 text-center">Check in Time</th>
                                <th className="px-4 py-2 text-center">Status Check in</th>
                                <th className="px-4 py-2 text-center">Check out Time</th>
                                <th className="px-4 py-2 text-center">Status Check out</th>
                                <th className="px-4 py-2 text-center">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.attendance.map((item, index) => (
                                <tr key={index} className={`border-t divide-x divide-dodgerBlue/40 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                    <td className="px-4 py-2 text-center">{item.check_in === null ? "leave" : formatDate(item.check_in)}</td>
                                    <td className="px-4 py-2 text-center">{item.check_in === null ? "leave" : formatDate(item.check_in)}</td>
                                    <td className="px-4 py-2 text-center">{item.status_check_in === null ? "leave" : item.status_check_in}</td>
                                    <td className="px-4 py-2 text-center">{item.check_out === null ? "NULL" : formatDate(item.check_out)}</td>
                                    <td className="px-4 py-2 text-center">{item.status_check_out === null ? "NULL" : item.status_check_out}</td>
                                    <td className="px-4 py-2 text-center">{item.category === null ? "NULL" : item.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}