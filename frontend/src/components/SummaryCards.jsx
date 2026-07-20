function SummaryCards() {
  const cards = [
    {
      title: "Total Machines",
      value: "24",
    },
    {
      title: "Active Alerts",
      value: "3",
    },
    {
      title: "Health Score",
      value: "91%",
    },
    {
      title: "Predicted Failures",
      value: "2",
    },
  ];

  return (
    <div className="summary-container">
      {cards.map((card, index) => (
        <div key={index} className="summary-card">
          <h3>{card.title}</h3>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;