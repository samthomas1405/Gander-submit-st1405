"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});


export default function Map({ aircrafts }) {
  const center = [39.8283, -98.5795]; // Center of US

  return (
    <MapContainer center={center} zoom={4} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {aircrafts.map((ac, idx) => (
        <Marker key={idx} position={[ac.location.lat, ac.location.lng]}>
          <Popup>
            <strong>{ac.tailNumber}</strong><br />
            {ac.model}<br />
            Status: {ac.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
