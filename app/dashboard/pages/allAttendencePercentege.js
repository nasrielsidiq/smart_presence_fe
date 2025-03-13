import React from "react";

const AllAttendencePercentege = () => {
    return (
        <div className="flex mt-10">
        <div className="bg-white rounded-xl shadow-lg w-2/5 p-4">
            <div>
                <div className="flex justify-between">
                    <div className="relative">
                        <button id="menu-button" className="bg-white text-dodgerBlue border border-dodgerBlue px-3 py-1 rounded-2xl shadow-md flex items-center gap-3 text-sm font-bold font-poppins">
                            All
                            <i className="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                        </button>
                    
                        <div id="menu-dropdown" className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 hidden">
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Account settings</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Support</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">License</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="font-semibold font-poppins">All Attendance Percentage</span>
                    </div>
                </div>
                <div className="flex mt-3">
                    <canvas id="attendanceChart" className="w-1/2"></canvas>
                    <div className="w-1/2">
                        <h3 className="text-sm font-semibold mb-2">Total Percentage of :</h3>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-4 h-4 bg-blue-400 inline-block rounded-full text-xs"></span> On time
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-4 h-4 bg-blue-700 inline-block rounded-full text-xs"></span> Late
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-4 h-4 bg-blue-900 inline-block rounded-full text-xs"></span> On Leave
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-yellow-500 inline-block rounded-full text-xs"></span> Absent
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg w-3/5 ml-3 p-4">
            <div className="">
                <span className="block font-semibold font-poppins">All Attendance by Unit/Division Precentage</span>
                <span className="block text-xs font-poppins font-bold">2025</span>
            </div>
            <canvas id="unitDivisionChart"></canvas>
        </div>
    </div>
    );
}

export default AllAttendencePercentege;