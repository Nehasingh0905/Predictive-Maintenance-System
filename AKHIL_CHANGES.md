# Akhil's Development Log

## Branch
akhil-ml

---

# Assigned Responsibilities

1. Anomaly Detection using Isolation Forest
2. Failure Prediction using XGBoost
3. Remaining Useful Life Estimation
4. Backend Integration
5. ML Model Integration

---

# Completed Work

## 1. Isolation Forest

- Trained Isolation Forest model
- Saved model as:
  - isolation_forest.pkl
- Created:
  - anomaly_scaler.pkl
- Updated anomaly_detection.py
- Integrated model with FastAPI backend

---

## 2. Failure Prediction

- Created Failure labels from RUL
- Trained XGBoost Classifier
- Achieved:

Accuracy:
95.86%

Precision:
88%

Recall:
84%

F1 Score:
86%

Saved:

- failure_prediction.pkl
- failure_scaler.pkl

Updated:

- failure_prediction.py

Integrated with backend.

---

## 3. Remaining Useful Life

Integrated existing Random Forest RUL model.

Uses:

- random_forest_rul.pkl

Connected with backend prediction endpoint.

---

## 4. Backend Changes

Updated:

routes.py

Modified:

calculate_anomaly()

calculate_failure_probability()

Updated /predict endpoint to use:

Temperature

Pressure

Vibration

Humidity

Current

instead of only vibration and current.

---

## 5. ML Files Added

isolation_forest.pkl

anomaly_scaler.pkl

failure_prediction.pkl

failure_scaler.pkl

---

## 6. Testing

Successfully tested using Swagger UI.

Verified:

POST /sensor-data

POST /predict

Prediction Response:

Anomaly Score

Failure Probability

Remaining Useful Life

---

## Current Status

All assigned ML responsibilities completed.

Backend successfully integrated with trained ML models.

Ready for team testing and deployment.