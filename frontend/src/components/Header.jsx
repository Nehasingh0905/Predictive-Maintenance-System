import React, { useEffect, useState } from "react";

export default function Header({ activeTab, setActiveTab }) {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  
  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        padding: "20px 30px",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: "800",
              color: "#1e293b",
            }}
          >
            AI Predictive Maintenance System
          </h1>

          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              fontSize: "15px",
              color: "#64748b",
              fontWeight: "500",
            }}
          >
            Industrial Equipment Health Monitoring using IoT Sensors & Machine Learning
          </p>
        </div>

        <div
  style={{
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "10px 16px",
    textAlign: "center",
  }}
>
  <div
    style={{
      fontSize: "18px",
      fontWeight: "700",
      color: "#1e293b",
    }}
  >
    {currentTime.toLocaleTimeString()}
  </div>

  <div
    style={{
      fontSize: "12px",
      color: "#64748b",
    }}
  >
    {currentTime.toLocaleDateString()}
  </div>
</div>


          <div
            style={{
              background: "#dcfce7",
              color: "#15803d",
              padding: "8px 16px",
              borderRadius: "20px",
              fontWeight: "700",
              fontSize: "13px",
            }}
          >
            ● System Online
          </div>

          <div
            style={{
              color: "#085cd1",
              fontWeight: "700",
              borderRadius: "20px",
              padding: "8px 16px",
              fontSize: "15px",
            }}
          >
            Admin
          </div>
        </div>
    </header>
  );
}