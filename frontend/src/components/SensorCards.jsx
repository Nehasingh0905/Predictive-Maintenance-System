import React from "react";

function SensorCards() {
  const sensors = [
    {
      name: "Temperature",
      value: "68°C",
      status: "Normal",
      icon: "🌡️",
      color: "#dc2626",
      bg: "#fef2f2",
    },
    {
      name: "Vibration",
      value: "0.24 Hz",
      status: "Stable",
      icon: "📳",
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      name: "Pressure",
      value: "120 PSI",
      status: "Optimal",
      icon: "⚙️",
      color: "#16a34a",
      bg: "#f0fdf4",
    },
    {
      name: "Motor RPM",
      value: "1450",
      status: "Running",
      icon: "🔄",
      color: "#d97706",
      bg: "#fffbeb",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {sensors.map((sensor, index) => (
        <div
          key={index}
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "22px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            transition: ".3s",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow =
              "0 16px 30px rgba(0,0,0,.12)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(0,0,0,.06)";
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {sensor.name}
              </p>

              <h2
                style={{
                  margin: "12px 0 6px",
                  color: "#1e293b",
                  fontSize: "30px",
                }}
              >
                {sensor.value}
              </h2>

              <span
                style={{
                  color: sensor.color,
                  fontWeight: "600",
                  fontSize: "13px",
                }}
              >
                ● {sensor.status}
              </span>
            </div>

            <div
              style={{
                width: "65px",
                height: "65px",
                background: sensor.bg,
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              {sensor.icon}
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            <span>Live Sensor</span>

            <span
              style={{
                color: "#16a34a",
                fontWeight: "600",
              }}
            >
              Updated Now
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SensorCards;