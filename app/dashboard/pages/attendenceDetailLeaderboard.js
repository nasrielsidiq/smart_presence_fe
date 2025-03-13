import React from "react";

const AttendanceDetailLeaderboard = React.memo(() => {
  const data = [
    { name: "Mrs Angel", id: "012345678", division: "IOT", office: "Bandung", checkIn: "08.00", status: "OnTime", statusClass: "bg-dodgerBlue/30 text-dodgerBlue" },
    { name: "Mrs Angel", id: "012345678", division: "IOT", office: "Bandung", checkIn: "10.00", status: "Late", statusClass: "bg-brightGold/30 text-brightGold" },
    { name: "Mrs Angel", id: "012345678", division: "IOT", office: "Bandung", checkIn: "08.00", status: "OnTime", statusClass: "bg-dodgerBlue/30 text-dodgerBlue" },
    { name: "Mrs Angel", id: "012345678", division: "IOT", office: "Bandung", checkIn: "10.00", status: "Late", statusClass: "bg-brightGold/30 text-brightGold" },
    { name: "Mrs Angel", id: "012345678", division: "IOT", office: "Bandung", checkIn: "10.00", status: "Late", statusClass: "bg-brightGold/30 text-brightGold" },
  ];

  const leaderboard = [
    { name: "Mrs. Angel", position: "CEO", streak: 25, rank: 2, color: "text-skyBlue", size: "text-6xl", bgColor: "bg-skyBlue" },
    { name: "Mrs. Angel", position: "CEO", streak: 31, rank: 1, color: "text-goldenYellow", size: "text-7xl", bgColor: "bg-goldenYellow" },
    { name: "Mrs. Angel", position: "CEO", streak: 24, rank: 3, color: "text-gray-600", size: "text-5xl", bgColor: "bg-gray-600" },
  ];

  return (
    <div className="flex mt-10">
      <div className="bg-white rounded-xl shadow-lg w-3/5 p-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold font-poppins">Attendance Detail Table</h2>
          <div className="flex border-b">
            <button className="text-blue-600 font-semibold border-b-2 border-blue-600 px-4">Today</button>
            <button className="text-gray-500 px-4">This Week</button>
            <button className="text-gray-500 px-4">This Month</button>
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
            {data.map((item, index) => (
              <tr key={index} className="border-b border-black/10">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">{item.division}</td>
                <td className="py-2 px-4">{item.office}</td>
                <td className="py-2 px-4">{item.checkIn}</td>
                <td className="py-2 px-4">
                  <span className={`${item.statusClass} px-3 py-1 rounded-lg`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow-lg w-2/5 p-4 ml-3">
        <h2 className="text-lg font-bold flex items-center">
          Leader Board
          <span className="ml-2 text-yellow-500">🏅</span>
        </h2>

        <div className="flex justify-center mt-6 space-x-6 text-xs">
          {leaderboard.map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative">
                <div className="">
                  <i className={`bi bi-person-circle ${item.color} ${item.size}`}></i>
                </div>
                <span className={`absolute top-0 right-0 ${item.bgColor} text-white text-sm px-2 py-1 rounded-full shadow-lg`}>{item.rank}</span>
              </div>
              <p className="font-bold mt-2">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.position}</p>
              <p className="text-gray-700 text-sm">Streak On Time <b>{item.streak} days</b></p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <ol className="list-none text-gray-700 space-y-2">
            <li className="border-b py-1">4.</li>
            <li className="border-b py-1">5.</li>
          </ol>
        </div>
      </div>
    </div>
  );
});

export default AttendanceDetailLeaderboard;