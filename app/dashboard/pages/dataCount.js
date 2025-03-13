import React from "react";

const DataCard = React.memo(({ title, icon, count }) => (
  <div className="bg-white p-4 rounded-xl shadow-lg mt-16 w-1/5">
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

const DataCount = () => {
  const data = [
    { title: "Total On Time", icon: "bi-person-bounding-box", count: 80 },
    { title: "Total Late", icon: "bi-person-video3", count: 80 },
    { title: "Total On Leave", icon: "bi-person-walking", count: 80 },
    { title: "Total Absent", icon: "bi-x", count: 80 },
    { title: "Total Karyawan", icon: "bi-people-fill", count: 80 },
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