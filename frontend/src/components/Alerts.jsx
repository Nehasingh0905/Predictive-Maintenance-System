

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getAlerts } from "../services/alertService";
export default function Alerts() {

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("ALL");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: "ALR-801",
      severity: "CRITICAL",
      node: "Robotic Arm - Unit 03",
      parameter: "High Vibration",
      value: "8.45 mm/s",
      timestamp: "14:22:15",
      color: "#dc2626",
      bg: "#1bd411",
    },
    {
      id: "ALR-802",
      severity: "WARNING",
      node: "CNC Machine - Unit 01",
      parameter: "High Temperature",
      value: "89.4 °C",
      timestamp: "14:18:40",
      color: "#d97706",
      bg: "#ecc013",
    },
    {
      id: "ALR-803",
      severity: "CRITICAL",
      node: "Hydraulic Press - Unit 05",
      parameter: "Pressure Drop",
      value: "45.0 kPa",
      timestamp: "13:55:12",
      color: "#dc2626",
      bg: "#f01313",
    },
  ]);
  useEffect(() => {
     loadAlerts();
  }, []);
  

  const [clearedAlerts, setClearedAlerts] = useState([
    {
      id: "ALR-798",
      severity: "RESOLVED",
      node: "Conveyor Belt",
      message: "Lubrication Restored",
      time: "11:20:05",
    },
    {
      id: "ALR-795",
      severity: "RESOLVED",
      node: "Hydraulic Press",
      message: "Voltage Stabilized",
      time: "09:14:32",
    },
  ]);
  useEffect(() => {
  async function loadAlerts() {
    try {
      setLoading(true);

      const data = await getAlerts();

      if (Array.isArray(data) && data.length > 0) {
        setActiveAlerts(data);
      }

      setError("");
    } catch (err) {
      console.log("Using local alerts");

      setError("Backend unavailable. Using local demo data.");
    } finally {
      setLoading(false);
    }
  }

  loadAlerts();
}, []);

  const handleDismissIncident = (incident) => {
    useEffect(() => {

  async function loadAlerts() {

    try {

      setLoading(true);

      const response = await getAlerts();

      console.log("API Response");

      console.log(response);

      // Backend integration will be added later

    }

    catch (err) {

      console.log(err);

      setError("Backend not available. Using local alert data.");

    }

    finally {

      setLoading(false);

    }

  }

  loadAlerts();

}, []);
    setActiveAlerts(prev =>
prev.filter(item => item.id !== incident.id)
);

setClearedAlerts(prev => [
{
id: incident.id,
severity:"RESOLVED",
node:incident.node,
message:`${incident.parameter} cleared successfully`,
time:new Date().toLocaleTimeString(),
},
...prev,
]);
  };
  const loadAlerts = async () => {
  try {
    setLoading(true);
    setError("");

    const data = await getAlerts();

    if (Array.isArray(data) && data.length > 0) {
      setActiveAlerts(data);
    }
  } catch (err) {
    console.error(err);
    setError("Backend not available. Showing demo data.");
  } finally {
    setLoading(false);
  }
};

  const exportCSV = () => {
  const rows = [
    ["Alert ID", "Severity", "Machine", "Issue", "Reading", "Time"],

    ...activeAlerts.map((a) => [
      a.id,
      a.severity,
      a.node,
      a.parameter,
      a.value,
      a.timestamp,
    ]),
  ];

  const csvContent = rows
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "Machine_Alerts_Report.csv";

  link.click();

  URL.revokeObjectURL(url);
};
 const filteredAlerts = activeAlerts.filter((alert) => {
  const matchesSearch =
    alert.node.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.parameter.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.id.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesSeverity =
    filterSeverity === "ALL" ||
    alert.severity === filterSeverity;

  return matchesSearch && matchesSeverity;
});
  const pieData = [
    {
      name: "Critical",
      value: activeAlerts.filter(a => a.severity === "CRITICAL").length,
    },
    {
      name: "Warning",
      value: activeAlerts.filter(a => a.severity === "WARNING").length,
    },
    {
      name: "Resolved",
      value: clearedAlerts.length,
    },
  ];

  const COLORS = [
    "#ef4444",
    "#f59e0b",
    "#22c55e",
  ];

  const trendData = [
   { time: "09:00", alerts: 1 },
   { time: "10:00", alerts: 2 },
   { time: "11:00", alerts: 3 },
   { time: "12:00", alerts: 2 },
   { time: "13:00", alerts: 4 },
   { time: "14:00", alerts: activeAlerts.length },
  ];

  const recommendedActions = [
  {
    machine: "Robotic Arm - Unit 03",
    severity: "Critical",
    actions: [
      "Inspect vibration bearings",
      "Check shaft alignment",
      "Schedule maintenance immediately",
    ],
  },
  {
    machine: "CNC Machine - Unit 01",
    severity: "Warning",
    actions: [
      "Inspect cooling system",
      "Reduce spindle speed",
      "Monitor temperature",
    ],
  },
  {
    machine: "Hydraulic Press - Unit 05",
    severity: "Critical",
    actions: [
      "Check hydraulic pump",
      "Inspect pressure valve",
      "Replace damaged seal if required",
    ],
  },
];

return (
   <>
    {loading && (
      <div
        style={{
          padding: "10px",
          background: "#DBEAFE",
          borderRadius: "8px",
          marginBottom: "15px",
          color: "#1D4ED8",
          fontWeight: "600",
        }}
      >
        Loading alerts from backend...
      </div>
    )}

    {error && (
      <div
        style={{
          padding: "10px",
          background: "#FEF2F2",
          borderRadius: "8px",
          marginBottom: "15px",
          color: "#DC2626",
        }}
      >
        {error}
      </div>
    )}

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      }}
    >

      {/* SUMMARY CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "18px",
        }}
      >

        <div
          style={{
            background: "#cfc7bb",
            border: "7px solid #fff7eb",
            borderRadius: "22px",
            padding: "18px",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#1a0d0d",
              fontSize: "16px",
            }}
          >
            Critical Alerts
          </p>

          <h2
            style={{
              marginTop: "12px",
              color: "#dc2626",
            }}
          >
            {activeAlerts.filter(a => a.severity === "CRITICAL").length}
          </h2>

        </div>

        <div
          style={{
            background: "#cfc7bb",
            border: "7px solid #fff7eb",
            borderRadius: "22px",
            padding: "18px",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#1a0d0d",
              fontSize: "16px",
            }}
          >
            Warning Alerts
          </p>

          <h2
            style={{
              marginTop: "12px",
              color: "#d97706",
            }}
          >
            {activeAlerts.filter(a => a.severity === "WARNING").length}
          </h2>

        </div>

        <div
          style={{
            background: "#cfc7bb",
            border: "7px solid #fff7eb",
            borderRadius: "22px",
            padding: "18px",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#1a0d0d",
              fontSize: "28x",
            }}
          >
            Resolved Alerts
          </p>

          <h2
            style={{
              marginTop: "12px",
              color: "#16a34a",
            }}
          >
            {clearedAlerts.length}
          </h2>

        </div>

      </div>

      <div
  style={{
    background: "#ffffff",
    border: "1px solid #eff7eb",
    borderRadius: "17px",
    padding: "12px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    alignItems: "center",
  }}
>

  <input
    type="text"
    placeholder="Search Machine, Alert ID..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      flex: 1,
      minWidth: "250px",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      outline: "none",
      fontSize: "14px",
    }}
  />

  <select
    value={filterSeverity}
    onChange={(e) => setFilterSeverity(e.target.value)}
    style={{
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      cursor: "pointer",
    }}
  >
    {filteredAlerts.length === 0 && (
<div
style={{
textAlign:"center",
padding:"40px",
color:"#6b7280",
fontWeight:"600"
}}
>
No matching alerts found.
</div>
)}
    <option value="ALL">All Alerts</option>
    <option value="CRITICAL">Critical</option>
    <option value="WARNING">Warning</option>
  </select>

</div>
 <div
  style={{
    background: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #e5e7eb",
  }}
 >
  <h3
    style={{
      marginBottom: "20px",
      color: "#111827",
    }}
  >
    Alert Distribution
  </h3>

  <div style={{ width: "100%", height: 320 }}>
   <ResponsiveContainer>
    <PieChart>
     <Pie
      data={pieData}
      dataKey="value"
      nameKey="name"
      innerRadius={50}
      outerRadius={100}
      label
     >
      {pieData.map((entry, index) => (
        <Cell
          key={index}
          fill={COLORS[index]}
        />
      ))}
     </Pie>

     <Tooltip />
     <Legend />
      </PieChart>
  </ResponsiveContainer>
</div>
</div>

 <div 
  style={{
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "20px",
  }}
 >
  <h3
    style={{
      marginBottom: "20px",
      color: "#111827",
    }}
  >
    Alert Trend
  </h3>

  <div style={{ width: "100%", height: 320 }}>
  <ResponsiveContainer>
    <LineChart data={trendData}>
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis dataKey="time" />

    <YAxis />

    <Tooltip />

    <Legend />

    <Line
        type="monotone"
        dataKey="alerts"
        stroke="#2563eb"
        strokeWidth={3}
    />
      </LineChart>
  </ResponsiveContainer>
</div>
<div
  style={{
    background: "#ffffff",
    border: "1px solid #eff7eb",
    borderRadius: "12px",
    padding: "20px",
  }}
>
  <h2
    style={{
      marginBottom: "20px",
      color: "#111827",
    }}
  >
    Recommended Maintenance Actions
  </h2>

  {recommendedActions.map((item, index) => (
    <div
      key={index}
      style={{
        borderLeft:
          item.severity === "Critical"
            ? "6px solid #dc2626"
            : "6px solid #f34e0b",
        background:
          item.severity === "Critical"
            ? "#6e6b8c"
            : "#d3caa4",
        padding: "18px",
        marginBottom: "18px",
        borderRadius: "10px",
      }}
    >
      <h3
        style={{
          marginBottom: "8px",
          color: "#111827",
        }}
      >
        {item.machine}
      </h3>

      <p
        style={{
          color:
            item.severity === "Critical"
              ? "#dc2626"
              : "#d97706",
          fontWeight: "bold",
        }}
      >
        {item.severity}
      </p>

      <ul style={{ marginTop: "10px" }}>
        {item.actions.map((action, i) => (
          <li
            key={i}
            style={{
              marginBottom: "8px",
            }}
          >
            {action}
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>
  
</div>

      {/* ACTIVE ALERTS START HERE */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"18px 20px",
background:"#f8fafc",
borderBottom:"1px solid #e5e7eb"
}}
>
  <button
onClick={exportCSV}
style={{
background:"#2563eb",
color:"#fff",
border:"none",
padding:"10px 18px",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"600"
}}
>
Export CSV
</button>
          <div>
            <h3
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "18px",
              }}
            >
              Active Machine Alerts
            </h3>

            <p
              style={{
                margin: "5px 0 0",
                color: "#6b7280",
                fontSize: "13px",
              }}
            >
              Real-time machine abnormalities detected
            </p>
          </div>

          <span
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "6px 14px",
              borderRadius: "20px",
              fontWeight: "600",
              fontSize: "13px",
            }}
          >{filteredAlerts.length} Showing
          </span>
        </div>
        

        <div style={{ padding: "20px" }}>
          {activeAlerts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "#9c0909",
                fontWeight: "600",
              }}
            >
              ✔ No active alerts detected.
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                style={{
                  background: alert.bg,
                  border: `1px solid ${alert.color}`,
                  borderLeft: `6px solid ${alert.color}`,
                  borderRadius: "10px",
                  padding: "18px",
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        background: alert.color,
                        color: "#ffffff",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    >
                      {alert.severity}
                    </span>

                    <strong
                      style={{
                        color: "#111827",
                        fontSize: "15px",
                      }}
                    >
                      {alert.node}
                    </strong>
                  </div>

                  <div
                    style={{
                      color: "#374151",
                      fontSize: "14px",
                      marginBottom: "6px",
                    }}
                  >
                    <strong>Issue:</strong> {alert.parameter}
                  </div>

                  <div
                    style={{
                      color: "#374151",
                      fontSize: "14px",
                    }}
                  >
                    <strong>Reading:</strong> {alert.value}
                    {" | "}
                    <strong>Time:</strong> {alert.timestamp}
                  </div>

                </div>

                <button
                  onClick={() => handleDismissIncident(alert)}
                  style={{
                    background: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Resolve
                </button>

              </div>
            ))
          )}
        </div>
      </div>
            {/* RESOLVED ALERT HISTORY */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px 20px",
            background: "#f8fafc",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#111827",
              fontSize: "18px",
            }}
          >
            Resolved Alert History
          </h3>

          <p
            style={{
              marginTop: "5px",
              color: "#6b7280",
              fontSize: "13px",
            }}
          >
            Previously acknowledged machine alerts
          </p>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f9fafb",
              }}
            >
              <th
                style={{
                  padding: "14px",
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Alert ID
              </th>

              <th
                style={{
                  padding: "14px",
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Machine
              </th>

              <th
                style={{
                  padding: "14px",
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Resolution
              </th>

              <th
                style={{
                  padding: "14px",
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Time
              </th>
            </tr>
          </thead>

          <tbody>
            {clearedAlerts.map((log) => (
              <tr key={log.id}>
                <td
                  style={{
                    padding: "14px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {log.id}
                </td>

                <td
                  style={{
                    padding: "14px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {log.node}
                </td>

                <td
                  style={{
                    padding: "14px",
                    color: "#16a34a",
                    fontWeight: "600",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {log.message}
                </td>

                <td
                  style={{
                    padding: "14px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {log.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
    </>
  );
 }
