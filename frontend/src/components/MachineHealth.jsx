import React from "react";

export default function MachineHealth() {
  const machines = [
    { id: "MAC-2301", health: 89 },
    { id: "MAC-2302", health: 96 },
    { id: "MAC-2303", health: 65 },
    { id: "MAC-2304", health: 91 },
  ];

  return (
    <div>
      <h2>Machine Health Monitoring</h2>

      {machines.map((machine) => (
        <div key={machine.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <span>{machine.id}</span>
            <span>{machine.health}%</span>
          </div>

          <div
            style={{
              width: "100%",
              height: "10px",
              background: "#1e293b",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${machine.health}%`,
                height: "100%",
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
              marginTop: "5px",
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
    </div>
  );
}