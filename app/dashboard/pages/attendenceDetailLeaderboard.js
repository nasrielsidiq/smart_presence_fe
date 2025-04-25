import { ENDPOINTS, formatDate } from "@/utils/config";
import Cookies from "js-cookie";
import { memo, useEffect, useState } from "react";

const AttendanceDetailLeaderboard = memo(() => {
  const [data, setData] = useState(null);
  const [rankData, setRankData] = useState(null);
  const [page, setPage] = useState(1);
  const [refreshFetch, setRefreshFetch] = useState(false);
  const [period, setPeriod] = useState("daily");

  useEffect(() => {
    const token = Cookies.get('token');
    async function fetchData() {
      try {
        const response = await fetch(ENDPOINTS.ATTENDANCES + `?page=${page}&limit=5&period=${period}`, {
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

        const rankResponse = await fetch(ENDPOINTS.ATTENDANCES + `/rank`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'authorization': 'Bearer ' + token,
          }
        });
        if (!rankResponse.ok) {
          throw new Error(`HTTP error! status: ${rankResponse.status}`);
        }
        const rankResult = await rankResponse.json();
        setRankData(rankResult);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    }

    fetchData();
    setRefreshFetch(false);
  }, [refreshFetch]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setRefreshFetch(true);
  }

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
    setRefreshFetch(true);
  }

  const handlePeriod = (period) => {
    setPeriod(period);
    setPage(1);
    setRefreshFetch(true);
  }

  const leaderboard = [
    { color: "text-goldenYellow", size: "text-5xl", bgColor: "bg-goldenYellow" },
    { color: "text-skyBlue", size: "text-5xl", bgColor: "bg-skyBlue" },
    { color: "text-gray-600", size: "text-5xl", bgColor: "bg-gray-600" },
  ];

  return (
    <div className="flex mt-10">
      <div className="bg-white rounded-xl shadow-lg w-3/5 p-4 flex flex-col justify-between">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold font-poppins">Attendance Detail Table</h2>
          <div className="flex border-b">
            <button onClick={e => (handlePeriod("daily"))} className={`${period === "daily" ? "text-blue-600 border-blue-600 font-semibold border-b-2 " : "text-gray-500"} px-4 cursor-pointer`}>Today</button>
            <button onClick={e => (handlePeriod("weakly"))} className={`${period === "weakly" ? "text-blue-600 border-blue-600 font-semibold border-b-2 " : "text-gray-500"} px-4 cursor-pointer`}>This Week</button>
            <button onClick={e => (handlePeriod("monthly"))} className={`${period === "monthly" ? "text-blue-600 border-blue-600 font-semibold border-b-2 " : "text-gray-500"} px-4 cursor-pointer`}>This Month</button>
          </div>
        </div>

        <table className="w-full mt-4 text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-black/10">
              <th className="py-2 px-4 text-gray-600">Name</th>
              <th className="py-2 px-4 text-gray-600">ID Card</th>
              <th className="py-2 px-4 text-gray-600">Divisi/Unit</th>
              <th className="py-2 px-4 text-gray-600">Office</th>
              <th className="py-2 px-4 text-gray-600">CheckIn Time</th>
              <th className="py-2 px-4 text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {data && data.attendance.map((item, index) => (
              <tr key={index} className="border-b border-black/10">
                <td className="py-2 px-4">{item.full_name}</td>
                <td className="py-2 px-4">{item.serial_id}</td>
                <td className="py-2 px-4">{item.division_name}</td>
                <td className="py-2 px-4">{item.office_name}</td>
                <td className="py-2 px-4">{formatDate(item.check_in)}</td>
                <td className="py-2 px-4">
                  <span className={`${item.status_check_in === "on_time" ? "bg-dodgerBlue/30 text-dodgerBlue" : "bg-brightGold/30 text-brightGold"} font-bold px-3 py-1 rounded-lg`}>{item.status_check_in}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-auto gap-4">
          <div className="flex gap-2 ml-auto">
            <button disabled={page === 1 ? true : false} onClick={handlePrevPage} className="disabled:bg-gray-300  bg-goldenYellow text-white px-2 py-1 rounded-full">
              <i className="bi bi-chevron-double-left"></i>
            </button>
            <span className="text-black">{page}</span>
            <button disabled={page === data?.totalPages ? true : false} onClick={handleNextPage} className="disabled:bg-gray-300  bg-goldenYellow text-white px-2 py-1 rounded-full">
              <i className="bi bi-chevron-double-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg w-2/5 p-4 ml-3">
        <h2 className="text-lg font-bold flex items-center">
          Leader Board
          <span className="ml-2 text-yellow-500">🏅</span>
        </h2>

        <div className="flex justify-center mt-6 space-x-6 text-xs">
          {rankData && rankData.slice(0, 3).map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative">
                <div className="">
                  <i className={`bi bi-person-circle ${leaderboard[index].color} ${leaderboard[index].size}`}></i>
                </div>
                <span className={`absolute top-0 right-0 ${leaderboard[index].bgColor} text-white text-sm px-2 py-1 rounded-full shadow-lg`}>{index + 1}</span>
              </div>
              <p className="font-bold mt-2">{item.employee_name}</p>
              <p className="text-gray-500 text-sm">{item.position}</p>
              <p className="text-gray-700 text-sm">Streak On Time <b>{item.current_streak} days</b></p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <ol className="list-none text-gray-700 space-y-2">
            {rankData && rankData.slice(3).map((item, index) => (
              <li key={index} className="flex items-center border-b py-1">
                <span className="text-gray-500 text-sm">{index + 4}.</span>
                <div className="flex items-center ml-2">
                  <i className={`bi bi-person-circle ${leaderboard[2].color} text-1xl`}></i>
                  <p className="font-bold ml-2">{item.employee_name}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
});

export default AttendanceDetailLeaderboard;