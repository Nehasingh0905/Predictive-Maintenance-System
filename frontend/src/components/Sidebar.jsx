import React from "react";

function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {
  const menuStyle = (active) => ({
   width: "200%",
   display: "flex",
   alignItems: "center",
   gap: "24px",
   padding: "14px 18px",
   marginBottom: "10px",
   border: "none",
   borderRadius: "10px",
   cursor: "pointer",
   background: active
    ? "linear-gradient(90deg,#2563eb,#3b82f6)"
    : "transparent",
   color: active ? "#ffffff" : "#cbd5e1",
   fontWeight: active ? "700" : "600",
   fontSize: "15px",
   textAlign: "left",
   transition: "all .25s ease",
   boxShadow: active
    ? "0 8px 20px rgba(37,99,235,.30)"
    : "none",
  });

  return (
    <div
      style={{
        width: sidebarOpen ? "260px" : "80px",
        transition: "0.3s ease",
        overflow: "hidden",
        backgroundColor: "#233044",
        minHeight: "100vh",
        padding: "20px",
        borderRight: "1px solid #374151",
        boxSizing: "border-box",
      }}
    >
      {/* Toggle Button */}

      <div
        style={{
          display: "flex",
          justifyContent: sidebarOpen ? "flex-end" : "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "#ffffff",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      </div>

      {/* Logo */}

      {sidebarOpen && (
        <>
          <div
            style={{
             textAlign: "center",
             marginBottom: "30px",
            }}
           >
            <div
             style={{
              width: "56px",
              height: "56px",
              margin: "0 auto 14px",
              borderRadius: "14px",
              background: "linear-gradient(135deg,#2563eb,#4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "26px",
              boxShadow: "0 8px 18px rgba(37,99,235,0.35)",
            }}
          >
            ⚙️
          </div>

          {sidebarOpen && (
            <>
              <h2
                style={{
                  color: "#ffffff",
                  margin: 0,
                  fontSize: "26px",
                  fontWeight: "800",
                  letterSpacing: "1px",
                }}
              >
                AI PMS
              </h2>

              <p 
                style={{
                 color: "#94a3b8",
                 fontSize: "12px",
                 marginTop: "8px",
                 letterSpacing: "1px",
                }}
              >
                Predictive Maintenance
              </p>
            </>
          )}
         </div>
        </>
      )}

      {/* Dashboard */}

      <button
        style={menuStyle(activeTab === "dashboard")}
        onClick={() => setActiveTab("dashboard")}
      >
        <span style={{ fontSize: "20px" }}>🏠</span>

        {sidebarOpen && <span>Dashboard</span>}
      </button>

      {/* Analytics */}

      <button
       style={menuStyle(activeTab === "analytics")}
       onClick={() => setActiveTab("analytics")}
      >
       <span style={{ fontSize: "20px" }}>📊</span>

       {sidebarOpen && <span>Analytics</span>}
      </button>

      {/* Alerts */}

       <button
        style={menuStyle(activeTab === "alerts")}
        onClick={() => setActiveTab("alerts")}
       >
        <span style={{ fontSize: "20px" }}>🚨</span>

        {sidebarOpen && <span>Alerts</span>}
       </button>
                               

      {/* Status */}

      {sidebarOpen && (
        <div
          style={{
            marginTop: "auto",
            padding: "18px",
            background: "#1e293b",
            borderRadius: "14px",
            border: "1px solid #334155",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
               width: "10px",
               height: "10px",
               borderRadius: "50%",
               background: "#22c55e",
               boxShadow: "0 0 10px #22c55e",
              }}
            ></span>

            <span
               style={{
                 color: "#ffffff",
                 fontWeight: "700",
                 fontSize: "14px",
                }}
            >
                System Online
            </span> 
          </div>

          <div
            style={{
             color: "#94a3b8",
             fontSize: "12px",
             lineHeight: "22px",
            }}
          >
            Version : 1.0.0
            <br />
            Last Sync : Just now
            <br />
            Network : Connected
          </div>
        </div>
      )}
      

    </div>
  );
}

export default Sidebar;
