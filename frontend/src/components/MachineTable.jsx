function MachineTable() {
  const machines = [
    {
      id: "M001",
      temperature: "65°C",
      vibration: "0.21",
      health: "95%",
      status: "Healthy",
    },
    {
      id: "M002",
      temperature: "89°C",
      vibration: "0.78",
      health: "82%",
      status: "Warning",
    },
    {
      id: "M003",
      temperature: "98°C",
      vibration: "1.12",
      health: "65%",
      status: "Critical",
    },
    {
      id: "M004",
      temperature: "62°C",
      vibration: "0.18",
      health: "97%",
      status: "Healthy",
    },
  ];

  return (
    <div>
      <h2>Machine Monitoring Table</h2>

      <table className="machine-table">
        <thead>
          <tr>
            <th>Machine ID</th>
            <th>Temperature</th>
            <th>Vibration</th>
            <th>Health</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id}>
              <td>{machine.id}</td>
              <td>{machine.temperature}</td>
              <td>{machine.vibration}</td>
              <td>{machine.health}</td>
              <td>
               <span
                className={
                 machine.status === "Healthy"
                  ? "healthy"
                  : machine.status === "Warning"
                  ? "warning"
                  : "critical"
                }
               >
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

export default MachineTable;