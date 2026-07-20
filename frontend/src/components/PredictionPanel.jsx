function PredictionPanel() {
  const predictions = [
    { machine: "Machine B", risk: "78%" },
    { machine: "Machine C", risk: "92%" },
  ];

  return (
    <div>
      <h2>Predicted Failure Risk</h2>

      {predictions.map((item, index) => (
        <div key={index} className="prediction-item">
          <span>{item.machine}</span>
          <span>{item.risk}</span>
        </div>
      ))}
    </div>
  );
}

export default PredictionPanel;