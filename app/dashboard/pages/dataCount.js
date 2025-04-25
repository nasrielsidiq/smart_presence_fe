'use client';
import { ENDPOINTS } from "@/utils/config";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const DataCard = React.memo(({ title, icon, count }) => (
  <div className="bg-white p-4 rounded-xl shadow-lg mr-3 mt-16 w-1/5 ">
    <div className="flex justify-between mb-3">
      <h2 className="text-xs shad font-poppins">{title}</h2>
      <div className="rounded-full bg-dodgerBlue py-1 px-2 shadow-sm">
        <i className={`bi ${icon} text-white`}></i>
      </div>
    </div>
    <div>
      <h2 className="text-3xl font-bold font-poppins">{count}</h2>
    </div>
  </div>
));

const DataCount = ({cData}) => {

  const data = [
    { title: "Total On Time", icon: "bi-person-bounding-box", count: cData ? cData.onTimeCount : "Offline" },
    { title: "Total Late", icon: "bi-person-video3", count: cData ? cData.lateCount : "Offline" },
    { title: "Total On Leave", icon: "bi-person-walking", count: cData ? cData.onLeaveCount : "Offline" },
    { title: "Total Absent", icon: "bi-x", count: cData ? cData.absentCount : "Offline" },
    { title: "Total Karyawan", icon: "bi-people-fill", count: cData ? cData.employeeCount : "Offline" },
  ];



  return (
    <div className="flex">
      {data.map((item, index) => (
        <DataCard key={index} title={item.title} icon={item.icon} count={item.count} />
      ))}
    </div>
  );
};

export default DataCount;