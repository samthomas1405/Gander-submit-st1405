// data.js
const aircraftData = [
  {
    tailNumber: "N12345",
    model: "Boeing 737",
    status: "available",
    location: { lat: 40.7128, lng: -74.0060 } // New York City
  },
  {
    tailNumber: "N67890",
    model: "Airbus A320",
    status: "maintenance",
    location: { lat: 34.0522, lng: -118.2437 } // Los Angeles
  },
  {
    tailNumber: "N54321",
    model: "Cessna 172",
    status: "aog",
    location: { lat: 41.8781, lng: -87.6298 } // Chicago
  },
  {
    tailNumber: "N98765",
    model: "Embraer 190",
    status: "available",
    location: { lat: 29.7604, lng: -95.3698 } // Houston
  },
  {
    tailNumber: "N11111",
    model: "Gulfstream G650",
    status: "available",
    location: { lat: 25.7617, lng: -80.1918 } // Miami
  }
];

export default aircraftData;
