"use client";

import { useState, useEffect } from "react";
import aircraftData from "../data/data";
import dynamic from "next/dynamic"

// Dynamically import AircraftMap with SSR disabled
const Map = dynamic(() => import("./map"), {
  ssr: false,
});

export default function HomePage() {
  const [aircrafts, setAircrafts] = useState([]);
  const [filter, setFilter] = useState({
    tailNumber: "",
    model: "",
    status: ""
  });

  // Load data from localStorage if available, else use sample data
  useEffect(() => {
    const storedData = localStorage.getItem("aircrafts");
    if (storedData) {
      setAircrafts(JSON.parse(storedData));
    } else {
      setAircrafts(aircraftData);
    }
  }, []);

  // Filter aircrafts based on user input
  const filteredAircrafts = aircrafts.filter(ac =>
    (filter.tailNumber === "" || ac.tailNumber.toLowerCase().includes(filter.tailNumber.toLowerCase())) &&
    (filter.model === "" || ac.model.toLowerCase().includes(filter.model.toLowerCase())) &&
    (filter.status === "" || ac.status.toLowerCase() === filter.status.toLowerCase())
  );

  // Handle status update on click
  const handleStatusUpdate = (index) => {
    const newStatus = prompt("Enter new status (available, aog, maintenance):", aircrafts[index].status);
    if (newStatus && ["available", "aog", "maintenance"].includes(newStatus.toLowerCase())) {
      const updated = [...aircrafts];
      updated[index].status = newStatus.toLowerCase();
      setAircrafts(updated);
      localStorage.setItem("aircrafts", JSON.stringify(updated));
    } else if (newStatus) {
      alert("Invalid status! Please enter available, aog, or maintenance.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Aircraft Status Dashboard</h1>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by Tail Number"
          value={filter.tailNumber}
          onChange={e => setFilter({ ...filter, tailNumber: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by Model"
          value={filter.model}
          onChange={e => setFilter({ ...filter, model: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        />
        <select
          value={filter.status}
          onChange={e => setFilter({ ...filter, status: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="available">Available</option>
          <option value="aog">AOG</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      {/* Table of Aircraft */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-black-100">
            <th className="border p-2">Tail Number</th>
            <th className="border p-2">Model</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Location (Lat, Lng)</th>
          </tr>
        </thead>
        <tbody>
          {filteredAircrafts.map((ac, idx) => (
            <tr
              key={ac.tailNumber}
              className="bg-black-50 hover:bg-white hover:text-black cursor-pointer"
              onClick={() => handleStatusUpdate(idx)}
            >

              <td className="border p-2">{ac.tailNumber}</td>
              <td className="border p-2">{ac.model}</td>
              <td className="border p-2">{ac.status}</td>
              <td className="border p-2">
                ({ac.location.lat.toFixed(2)}, {ac.location.lng.toFixed(2)})
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Ready to Fly Count */}
      <div className="mt-4 text-lg">
        <strong>Ready to Fly: </strong>
        {filteredAircrafts.filter(ac => ac.status === "available").length} aircraft
      </div>
      {/* Aircraft Map Visualization */}
    
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Aircraft Locations</h2>
        <Map aircrafts={filteredAircrafts} />
      </div>
    </div>
  );
}


