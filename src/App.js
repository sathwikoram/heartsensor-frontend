import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [heartRate, setHeartRate] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [error, setError] = useState(null);

  // Change to your server IP if ESP32 also connects
  const API_URL = "http://15.20.52.193:5000/api/heart/latest";

  const fetchHeartRate = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data && res.data.bpm !== null && res.data.bpm !== undefined) {
        setHeartRate(res.data.bpm);
        setTimestamp(res.data.timestamp);
        setError(null);
      } else {
        setHeartRate(null);
      }
    } catch (err) {
      console.error("Error fetching heart rate:", err);
      setError("Failed to connect to backend");
    }
  };

  useEffect(() => {
    fetchHeartRate(); // initial fetch
    const interval = setInterval(fetchHeartRate, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>💓 Heart Rate Monitor</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {heartRate ? (
        <>
          <h2 style={{ fontSize: "2rem", color: "crimson" }}>{heartRate} BPM</h2>
          <p style={{ color: "gray" }}>
            Last updated: {new Date(timestamp).toLocaleString()}
          </p>
        </>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
}

export default App;
