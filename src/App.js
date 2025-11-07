import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [heartRate, setHeartRate] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "https://heartsensor-backend.onrender.com/api/heart/latest";

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
      setError("⚠️ Failed to connect to backend");
    }
  };

  useEffect(() => {
    fetchHeartRate();
    const interval = setInterval(fetchHeartRate, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg text-center p-4 border-0 rounded-4 heart-card">
        <h1><span className="glow-heart">💓</span> Heart Rate Monitor</h1>


        {error && <p className="error">{error}</p>}

        {heartRate ? (
          <>
            <h2 className="bpm-display">{heartRate} BPM</h2>
            
            <p className="text-muted mb-0">
              Last updated: {new Date(timestamp).toLocaleString()}
            </p>
          </>
        ) : (
          <p className="waiting">Waiting for data...</p>
        )}
      </div>
    </div>
  );
}

export default App;
