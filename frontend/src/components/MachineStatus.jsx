import React from "react";

function MachineStatus() {
  const machines = [
    {
      id: "MAC-2301",
      name: "CNC Milling Machine",
      status: "Healthy",
      health: "98%",
    },
    {
      id: "MAC-2302",
      name: "Hydraulic Press",
      status: "Warning",
      health: "78%",
    },
    {
      id: "MAC-2303",
      name: "Robotic Arm",
      status: "Critical",
      health: "41%",
    },
    {
      id: "MAC-2304",
      name: "Conveyor System",
      status: "Healthy",
      health: "95%",
    },
  ];

  const statusStyle = (status) => ({
    padding: "6px 14px",
    borderRadius: "20px",
    color: "#fff",
    fontWeight: "700",
    background:
      status === "Healthy"
        ? "#22c55e"
        : status === "Warning"
        ? "#f59e0b"
        : "#ef4444",
  });

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          color: "#1e293b",
        }}
      >
        Machine Status
      </h2>

      <table className="machine-table">
        <thead>
          <tr>
            <th>Machine ID</th>
            <th>Machine Name</th>
            <th>Health</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id}>
              <td>{machine.id}</td>
              <td>{machine.name}</td>
              <td>{machine.health}</td>
              <td>
                <span style={statusStyle(machine.status)}>
                  {machine.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MachineStatus;