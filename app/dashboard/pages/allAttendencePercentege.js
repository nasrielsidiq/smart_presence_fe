import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Cookies from "js-cookie";
import { ENDPOINTS } from "@/utils/config";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const AllAttendancePercentage = () => {
    const [donutIsOpen, setDonutIsOpen] = useState(false);
    const [lineIsOpen, setLineIsOpen] = useState(false);
    const [data, setData] = useState(null);
    const [donutData, setDonutData] = useState(null);
    const [division, setDivision] = useState(null);
    const [selectedLineCategory, setSelectedLineCategory] = useState("discipline");
    const [selectedDivision, setSelectedDivision] = useState("");
    const [refreshFetch, setRefreshFetch] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        async function fetchData() {
            try {
                const response = await fetch(ENDPOINTS.DASHBOARD + `/chart?category=${selectedLineCategory}`, {
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
                const donutResponse = await fetch(ENDPOINTS.DASHBOARD + `/persentages?division=${selectedDivision}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                        'authorization': 'Bearer ' + token,
                    },
                });
                if (!donutResponse.ok) {
                    throw new Error(`HTTP error! status: ${donutResponse.status}`);
                }
                const donutResult = await donutResponse.json();
                setDonutData(donutResult.percentages);
                const divisionResponse = await fetch(ENDPOINTS.DIVISIONS, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                        'authorization': 'Bearer ' + token,
                    }
                });
                if (!divisionResponse.ok) {
                    throw new Error(`HTTP error! status: ${divisionResponse.status}`);
                }
                const divisionResult = await divisionResponse.json();
                setDivision(divisionResult.divisions.map(division => ({
                    value: division.id,
                    label: division.name,
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        }

        fetchData();
        setRefreshFetch(false);
    }, [refreshFetch]);

    console.log(division);


    const toggleDonutDropdown = () => {
        setDonutIsOpen(!donutIsOpen);
    };
    const toggleLineDropdown = () => {
        setLineIsOpen(!lineIsOpen);
    };
    const handleLineCategoryChange = (category) => {
        setSelectedLineCategory(category);
        setRefreshFetch(true);
        setLineIsOpen(false);
    };
    const handleDonutDivisionChange = (division) => {
        setSelectedDivision(division);
        setRefreshFetch(true);
        setDonutIsOpen(false);
    }

    const doughnutData = {
        labels: ["On Time", "Late", "On Leave", "Absent"],
        datasets: [
            {
                data: donutData ? [donutData?.onTime, donutData?.late, donutData?.onLeave, donutData?.absent] : [0, 0, 0, 0],
                backgroundColor: ["#60A5FA", "#1E3A8A", "#312E81", "#FBBF24"],
                hoverBackgroundColor: ["#3B82F6", "#1D4ED8", "#4338CA", "#F59E0B"],
                borderWidth: 0,
                cutout: "50%",
            }
        ]
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            datalabels: {
                color: "black",
                font: { weight: "bold", size: 14 },
                formatter: (value) => `${value}%`,
                anchor: "end",
                align: "start",
                offset: 0,
                backgroundColor: "rgba(240, 240, 240, 0.75)",
                borderRadius: 80,
                padding: 6,
            }
        }
    };

    const lineData = {
        labels: data?.labels,
        datasets: [
            {
                type: "line",
                label: data?.datasets[0] ? data?.datasets[0]?.label : "null",
                data: data?.datasets[0] ? data?.datasets[0]?.data : [0, 0, 0, 0, 0, 0],
                fill: true,
                borderColor: "#3B82F6",
                backgroundColor: "#3B82F6",
                tension: 0.4,
            },
            {
                type: "line",
                label: data?.datasets[1] ? data?.datasets[1]?.label : "null",
                data: data?.datasets[1] ? data?.datasets[1]?.data : [0, 0, 0, 0, 0, 0],
                borderColor: "#F59E0B",
                backgroundColor: "#F59E0B",
                fill: true,
                tension: 0.4,
            },
            {
                type: "line",
                label: data?.datasets[2] ? data?.datasets[2]?.label : "null",
                data: data?.datasets[2] ? data?.datasets[2]?.data : [0, 0, 0, 0, 0, 0],
                borderColor: "#2563EB",
                backgroundColor: "#2563EB",
                fill: true,
                tension: 0.4,
            }
        ]
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            // legend: { display: true, position: "bottom" },
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true, // Gunakan gaya titik (bisa lingkaran, segitiga, dsb.)
                    pointStyle: "circle", // Membuat bentuk legenda menjadi lingkaran
                    generateLabels: function (chart) {
                        const labels = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
                        labels.forEach(label => {
                            label.strokeStyle = "white"; // Warna stroke
                            label.lineWidth = 1; // Ketebalan stroke
                        });
                        return labels;
                    }
                }
            }
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    return (
        <div className="flex mt-10 text-black">
            <div className="bg-white rounded-xl shadow-lg w-2/5  p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="relative">
                        <button onClick={toggleDonutDropdown} className="bg-white text-dodgerBlue border border-dodgerBlue px-4 py-1 rounded-2xl shadow-md flex items-center gap-2 text-sm font-bold">
                            {selectedDivision ? division?.find(item => item.value === selectedDivision)?.label : "All"}
                            <i className="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                        </button>
                        {donutIsOpen && (
                            <div className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white ring-1 shadow-lg ring-black/5">
                                <div className="py-1">
                                    <a onClick={() => {handleDonutDivisionChange("")}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">All</a>
                                    {division && division.map((item, index) => (
                                        <a key={index} onClick={() => {handleDonutDivisionChange(item.value)}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">{item.label}</a>

                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <span className="font-semibold text-lg">Attendance Percentage</span>
                </div>
                <div className="flex justify-center">
                    <div className="w-50 h-40 relative">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                    {/* Legend */}
                    <div className="mt-0">
                        <h3 className="text-sm font-semibold mb-2">Total Percentage of:</h3>
                        <div className="flex items-center gap-2 mb-2"><span className="w-4 h-4 bg-blue-400 inline-block rounded-full"></span> On Time</div>
                        <div className="flex items-center gap-2 mb-2"><span className="w-4 h-4 bg-blue-700 inline-block rounded-full"></span> Late</div>
                        <div className="flex items-center gap-2 mb-2"><span className="w-4 h-4 bg-blue-900 inline-block rounded-full"></span> On Leave</div>
                        <div className="flex items-center gap-2"><span className="w-4 h-4 bg-yellow-500 inline-block rounded-full"></span> Absent</div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg w-3/5 ml-3 p-4">
                <div className="flex justify-between items-center">
                    <div className="relative">
                        <button onClick={toggleLineDropdown} className="bg-white text-dodgerBlue border border-dodgerBlue px-4 py-1 rounded-2xl shadow-md flex items-center gap-2 text-sm font-bold">
                            {selectedLineCategory.charAt(0).toUpperCase() + selectedLineCategory.slice(1)}
                            <i className="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                        </button>
                        {lineIsOpen && (
                            <div className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white ring-1 shadow-lg ring-black/5">
                                <div className="py-1">
                                    <a onClick={() => { handleLineCategoryChange("discipline") }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Discipline</a>
                                    <a onClick={() => { handleLineCategoryChange("undiscipline") }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Undiscipline</a>
                                    <a onClick={() => { handleLineCategoryChange("overtime") }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Overtime</a>
                                    <a onClick={() => { handleLineCategoryChange("on_leave") }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">On Leave</a>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <span className="block font-semibold">Attendance Unit/Division Percentage</span>
                        <span className="block text-xs text-right font-bold">2025</span>
                    </div>
                </div>
                <div className="w-full h-64">
                    <Line data={lineData} options={lineOptions} />
                </div>
            </div>
        </div>
    );
};

export default AllAttendancePercentage;