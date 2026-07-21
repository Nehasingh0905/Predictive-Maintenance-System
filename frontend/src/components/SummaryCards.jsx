import React from "react";

function SummaryCards() {
  const cards = [
    {
      title: "Total Machines",
      value: "24",
      icon: "🏭",
      color: "#2563eb",
      trend: "+2%",
    },
    {
      title: "Healthy Machines",
      value: "21",
      icon: "🟢",
      color: "#22c55e",
      trend: "+4%",
    },
    {
      title: "Active Alerts",
      value: "3",
      icon: "🚨",
      color: "#ef4444",
      trend: "-1",
    },
    {
      title: "Avg Health Score",
      value: "91%",
      icon: "📈",
      color: "#f59e0b",
      trend: "+1.2%",
    },
  ];

  return (
    <div className="summary-container">
      {cards.map((card, index) => (
        <div
          key={index}
          className="summary-card"
          style={{
            borderTop: `5px solid ${card.color}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <span style={{ fontSize: "32px" }}>
              {card.icon}
            </span>

            <span
              style={{
                color: card.color,
                fontWeight: "700",
                fontSize: "13px",
              }}
            >
              {card.trend}
            </span>
          </div>

          <h3>{card.title}</h3>

          <p
            style={{
              color: card.color,
            }}
          >
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;