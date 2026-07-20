"""
Anomaly Detection Module

Owner: Akhil
Model: Isolation Forest
Project: AI-Driven Predictive Maintenance System
"""
import numpy as np
import joblib

# Load trained model and scaler
model = joblib.load("isolation_forest.pkl")
scaler = joblib.load("anomaly_scaler.pkl")


def detect_anomaly(temperature, pressure, vibration, humidity, current):
    """
    Detect anomaly using Isolation Forest.

    Returns:
        anomaly_score (float)
        status (str)
    """

    data = np.array([[temperature,
                      pressure,
                      vibration,
                      humidity,
                      current]])

    # Scale input
    data_scaled = scaler.transform(data)

    # Predict
    prediction = model.predict(data_scaled)
    score = model.decision_function(data_scaled)[0]

    status = "Abnormal" if prediction[0] == -1 else "Normal"

    return float(score), status