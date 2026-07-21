import Sidebar from "./components/Sidebar";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Alerts from "./components/Alerts";
import LoadingScreen from "./components/LoadingScreen";

function WelcomeScreen({ onStart }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "650px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "55px",
          textAlign: "center",
          boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
          border: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            fontSize: "65px",
            marginBottom: "15px",
          }}
        >
          ⚙️
        </div>

        <div
          style={{
            color: "#0f766e",
            fontWeight: "700",
            fontSize: "13px",
            letterSpacing: "2px",
            marginBottom: "18px",
          }}
        >
          ACADEMIC EVALUATION PROTOTYPE
        </div>

        <h1
          style={{
            color: "#1e293b",
            fontSize: "42px",
            fontWeight: "800",
            lineHeight: "1.2",
            marginBottom: "18px",
          }}
        >
          Predictive Maintenance
          <br />
          Monitoring System
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "18px",
            marginBottom: "30px",
          }}
        >
          Industrial Equipment Monitoring using IoT Sensor Data &
          Machine Learning
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "35px",
          }}
        >
          <span
            style={{
              background: "#dbeafe",
              color: "#2563eb",
              padding: "8px 16px",
              borderRadius: "30px",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            IoT Sensors
          </span>

          <span
            style={{
              background: "#dcfce7",
              color: "#15803d",
              padding: "8px 16px",
              borderRadius: "30px",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            Machine Learning
          </span>

          <span
            style={{
              background: "#ede9fe",
              color: "#6d28d9",
              padding: "8px 16px",
              borderRadius: "30px",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            Real-Time Monitoring
          </span>
        </div>

        <button
          onClick={onStart}
          style={{
            width: "100%",
            padding: "18px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
            transition: ".3s",
            boxShadow: "0 10px 20px rgba(37,99,235,0.25)",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#1d4ed8";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#2563eb";
          }}
        >
          START MONITORING SYSTEM →
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleStartSystem = () => {
    setHasStarted(true);
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!hasStarted) return <WelcomeScreen onStart={handleStartSystem} />;
  if (isLoading) return <LoadingScreen />;

  return (
   <div
    style={{
      display: "flex",
      minHeight: "100vh",
      background: "#eef2f7",
      overflow: "hidden",
    }}
  >
    <Sidebar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />

    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          maxWidth: "1600px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "analytics" && <Analytics />}
        {activeTab === "alerts" && <Alerts />}
      </main>
    </div>
  </div>
  )
};