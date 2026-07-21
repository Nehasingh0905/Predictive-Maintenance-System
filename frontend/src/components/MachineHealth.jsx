import React from "react";

export default function MachineHealth() {
  const machines = [
    { id: "MAC-2301", health: 89 },
    { id: "MAC-2302", health: 96 },
    { id: "MAC-2303", health: 65 },
    { id: "MAC-2304", health: 91 },
  ];

  return (
    <div
      style={{
        backgroundColor: "#1f2937",
        border: "1px solid #374151",
        borderRadius: "16px",
        padding: "20px",
        color: "#ffffff",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#8b5cf6",
          fontSize: "22px",
          fontWeight: "700",
        }}
      >
        Machine Health Monitoring
      </h2>

      {machines.map((machine) => (
        <div
          key={machine.id}
          style={{
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "6px",
              fontWeight: "600",
            }}
          >
            <span>{machine.id}</span>
            <span>{machine.health}%</span>
          </div>

          <div
            style={{
              width: "100%",
              height: "12px",
              background: "#374151",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${machine.health}%`,
                height: "100%",
                borderRadius: "10px",
                backgroundColor:
                  machine.health >= 90
                    ? "#22c55e"
                    : machine.health >= 75
                    ? "#f59e0b"
                    : "#ef4444",
              }}
            />
          </div>

          <p
            style={{
              fontSize: "12px",
              marginTop: "6px",
              fontWeight: "600",
              color:
                machine.health >= 90
                  ? "#22c55e"
                  : machine.health >= 75
                  ? "#f59e0b"
                  : "#ef4444",
            }}
          >
            {machine.health >= 90
              ? "Healthy"
              : machine.health >= 75
              ? "Warning"
              : "Critical"}
          </p>
        </div>
      ))}

      <div
        style={{
          marginTop: "25px",
          padding: "15px",
          borderRadius: "12px",
          backgroundColor: "#111827",
          border: "1px solid #374151",
        }}
      >
        <h3
          style={{
            color: "#ef4444",
            marginBottom: "10px",
          }}
        >
          🚨 Critical Alerts
        </h3>

        <p style={{ margin: "5px 0" }}>
          MAC-2303 health dropped below safe threshold.
        </p>

        <p style={{ margin: "5px 0" }}>
          Immediate inspection recommended.
        </p>
      </div>
    </div>
  );
}