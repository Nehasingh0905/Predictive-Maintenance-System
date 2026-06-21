function Sidebar({ activeTab, setActiveTab }) {
  const menuStyle = (active) => ({
    width: "100%",
    padding: "14px",
    marginBottom: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: active ? "#2563eb" : "#1e293b",
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
  });

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#161d2a",
        minHeight: "100vh",
        padding: "20px",
        borderRight: "1px solid #232d3f",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#3b82f6",
          marginBottom: "30px",
        }}
      >
        AI PMS
      </h2>

      <button
        style={menuStyle(activeTab === "dashboard")}
        onClick={() => setActiveTab("dashboard")}
      >
        📊 Dashboard
      </button>

      <button
        style={menuStyle(activeTab === "analytics")}
        onClick={() => setActiveTab("analytics")}
      >
        📈 Analytics
      </button>

      <button
        style={menuStyle(activeTab === "alerts")}
        onClick={() => setActiveTab("alerts")}
      >
        🚨 Alerts
      </button>
    </div>
  );
}

export default Sidebar;