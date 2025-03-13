export default function individualReportPage() {
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

            <div className="bg-white p-6 rounded-lg shadow-lg mt-16">
                <div className="flex justify-between items-center mb-4 mt-6">
                    <div className="flex gap-3">
                        <div className="relative">
                            <button className="menu-button bg-dodgerBlue text-white px-7 py-2 rounded-xl shadow-md flex items-center gap-3 text-xs font-bold">
                                Status
                                <i className="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                            </button>

                            <div className="menu-dropdown absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 hidden">
                                <div className="py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">On Time</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Late</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">On Leave</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">Absent</a>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <button className="menu-button bg-dodgerBlue text-white px-8 py-2 rounded-xl shadow-md flex items-center gap-3 text-xs font-bold">
                                Divisi / Unit
                                <i className="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                            </button>

                            <div className="menu-dropdown absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 hidden">
                                <div className="py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">IOT</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">IOT</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">IOT</a>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <button className="menu-button bg-dodgerBlue text-white px-6 py-2 rounded-xl shadow-md flex items-center gap-3 text-xs font-bold">
                                Office
                                <i className="bi bi-chevron-down text-dodgerBlue bg-white px-[2px] rounded-md"></i>
                            </button>

                            <div className="menu-dropdown absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 hidden">
                                <div className="py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">DBT</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">DBT</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-black">DBT</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex ">
                        <div className="relative">
                            <input type="text" placeholder="Search" className="border border-black/60 px-4 py-2 rounded-2xl shadow-md text-xs w-48" />
                            <span className="absolute right-3 top-1 text-gray-500">
                                <i className="bi bi-search text-xs"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto my-12 shadow-sm rounded-md border border-black/30 text-xs">
                    <table className="w-full border-collapse overflow-hidden border-black/30">
                        <thead className="bg-dodgerBlue/10 text-dodgerBlue">
                            <tr>
                                <th className="px-4 py-2 text-center">Name</th>
                                <th className="px-24 py-2 text-center">Divisi / Unit</th>
                                <th className="px-4 py-2 text-center">Status</th>
                                <th className="px-34 py-2 text-center">Check In Time</th>
                                <th className="px-4 py-2 text-center">Office</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-black/30">
                                <td className="px-4 py-2 text-center">Mrs Angel</td>
                                <td className="px-24 py-2 text-center">IOT</td>
                                <td className="px-4 py-2 text-center">On Time</td>
                                <td className="px-34 py-2 text-center">08.00</td>
                                <td className="px-4 py-2 text-center">DBT</td>
                                <td className="px-4 py-2 text-center gap-2">
                                    <button className="bg-skyBlue text-white px-6 py-[6px] rounded-full">
                                        View Report
                                    </button>
                                    <button className="bg-brightGold text-white px-6 py-[6px] rounded-full">
                                        Download
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-t border-black/30">
                                <td className="px-4 py-2 text-center">Mrs Angel</td>
                                <td className="px-24 py-2 text-center">IOT</td>
                                <td className="px-4 py-2 text-center">On Time</td>
                                <td className="px-34 py-2 text-center">08.00</td>
                                <td className="px-4 py-2 text-center">DBT</td>
                                <td className="px-4 py-2 text-center gap-2">
                                    <button className="bg-skyBlue text-white px-6 py-[6px] rounded-full ">
                                        View Report
                                    </button>
                                    <button className="bg-brightGold text-white px-6 py-[6px] rounded-full ">
                                        Download
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-t border-black/30">
                                <td className="px-4 py-2 text-center">Mrs Angel</td>
                                <td className="px-24 py-2 text-center">IOT</td>
                                <td className="px-4 py-2 text-center">On Time</td>
                                <td className="px-34 py-2 text-center">08.00</td>
                                <td className="px-4 py-2 text-center">DBT</td>
                                <td className="px-4 py-2 text-center gap-2">
                                    <button className="bg-skyBlue text-white px-6 py-[6px] rounded-full">
                                        View Report
                                    </button>
                                    <button className="bg-brightGold text-white px-6 py-[6px] rounded-full">
                                        Download
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-t border-black/30">
                                <td className="px-4 py-2 text-center">Mrs Angel</td>
                                <td className="px-24 py-2 text-center">IOT</td>
                                <td className="px-4 py-2 text-center">On Time</td>
                                <td className="px-34 py-2 text-center">08.00</td>
                                <td className="px-4 py-2 text-center">DBT</td>
                                <td className="px-4 py-2 text-center gap-2">
                                    <button className="bg-skyBlue text-white px-6 py-[6px] rounded-full">
                                        View Report
                                    </button>
                                    <button className="bg-brightGold text-white px-6 py-[6px] rounded-full">
                                        Download
                                    </button>
                                </td>
                            </tr>
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