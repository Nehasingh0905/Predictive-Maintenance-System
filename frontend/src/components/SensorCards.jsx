function SensorCards() {
  const sensors = [
    { name: "Temperature", value: "68°C" },
    { name: "Vibration", value: "0.24 Hz" },
    { name: "Pressure", value: "120 PSI" },
    { name: "RPM", value: "1450" },
  ];

  return (
    <div className="sensor-container">
      {sensors.map((sensor, index) => (
        <div key={index} className="sensor-card">
          <h3>{sensor.name}</h3>
          <p>{sensor.value}</p>
        </div>
      ))}
    </div>
  );
}

export default SensorCards;