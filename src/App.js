import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [currentTemperature, setCurrentTemperature] = useState([]);
  const [currentHumidity, setCurrentHumidity] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://XXX.XXX.X.XXX:5000/realtime")
        .then((response) => response.json())
        .then((sensorData) => {
          if (!sensorData.error) {
            setCurrentTemperature(sensorData.Homerseklet);
            setCurrentHumidity(sensorData.Paratartalom);

            setTemperatureData((prev) => [
              ...prev.slice(-9),
              sensorData.Homerseklet,
            ]);
            setHumidityData((prev) => [
              ...prev.slice(-9),
              sensorData.Paratartalom,
            ]);
            setLabels((prev) => [
              ...prev.slice(-9),
              new Date(sensorData.timestamp * 1000).toLocaleTimeString(),
            ]);
          }
        })
        .catch((error) => console.error("Hiba az adatok olvasásakor.", error));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const temperatureChartData = {
    labels,
    datasets: [
      {
        label: "Hőmérséklet (°C)",
        data: temperatureData,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const humidityChartData = {
    labels,
    datasets: [
      {
        label: "Páratartalom (%)",
        data: humidityData,
        borderColor: "rgba(54, 162, 235, 1)",
        borderwidth: 2,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  return (
    <div style={{ width: "60%", margin: "50px auto"}}>
      <h1>Valósidejű DHT-11 Szenzor adatok</h1>

      <div style={{display: "flex", justifyContent: "center", gap: "20px", marginBottom: "40px",}}>
        <div style={{border: "1px solid #ddd", borderRadius: "8px", padding: "20px", width: "200px", textAlign: "center", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",}}>
          <h2>Hőmérséklet</h2>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {currentTemperature !== null ? `${currentTemperature} °C` : "Nincs adat"}
          </p>
        </div>
        <div style={{border: "1px solid #ddd", borderRadius: "8px", padding: "20px", width: "200px", textAlign: "center", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",}}>
          <h2>Páratartalom</h2>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {currentHumidity !== null ? `${currentHumidity} %` : "nincs adat"}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "50px" }}>
        <h2>Hőmérséklet</h2>
        <Line data={temperatureChartData} />
      </div>
      <div>
        <h2>Páratartalom</h2>
        <Line data={humidityChartData} />
      </div>
    </div>
  );
}

export default App;
