function MachineHealth() {
  const machines = [
    { name: "Machine A", health: 95 },
    { name: "Machine B", health: 82 },
    { name: "Machine C", health: 65 },
    { name: "Machine D", health: 97 },
  ];

  return (
    <div>
      <h2>Machine Health Overview</h2>

      {machines.map((machine, index) => (
        <div key={index} className="health-item">
          <div className="health-header">
            <span>{machine.name}</span>
            <span>{machine.health}%</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${machine.health}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MachineHealth;