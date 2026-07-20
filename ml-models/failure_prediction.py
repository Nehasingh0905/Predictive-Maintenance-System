"""
Failure Prediction Module

Owner: Akhil
Model: XGBoost
Project: AI-Driven Predictive Maintenance System
"""
import numpy as np
import joblib

# Load trained model and scaler
model = joblib.load("failure_prediction.pkl")
scaler = joblib.load("failure_scaler.pkl")


def predict_failure(temperature, pressure, vibration, humidity, current):
    """
    Predict machine failure probability.

    Returns:
        float -> probability between 0 and 1
    """

    data = np.array([[
        temperature,
        pressure,
        vibration,
        humidity,
        current
    ]])

    data_scaled = scaler.transform(data)

    probability = model.predict_proba(data_scaled)[0][1]

    return float(probability)