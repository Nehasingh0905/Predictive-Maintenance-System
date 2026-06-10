# API DOCUMENTATION

# AI-Driven Predictive Maintenance System for Industrial Equipment using IoT Sensor Data and Machine Learning

---

# 1. Introduction

## 1.1 Purpose

This document defines the REST APIs used in the AI-Driven Predictive Maintenance System.

The APIs enable communication between:

* Frontend Dashboard (React)
* Backend Services (FastAPI)
* PostgreSQL Database
* Machine Learning Models

---

# 2. Base URL

Development Environment

```http
http://localhost:8000/api
```

Production Environment

```http
https://your-domain.com/api
```

---

# 3. API Architecture

```text
React Dashboard
       |
       v
FastAPI Backend
       |
       +------------------+
       |                  |
       v                  v
PostgreSQL         ML Models
       |
       v
Predictions
```

---

# 4. Authentication API

## Login

### Endpoint

```http
POST /auth/login
```

### Request

```json
{
  "username": "admin",
  "password": "password123"
}
```

### Response

```json
{
  "token": "jwt_token_here",
  "role": "admin"
}
```

### Status Codes

| Code | Description   |
| ---- | ------------- |
| 200  | Login Success |
| 401  | Unauthorized  |

---

# 5. Machine APIs

## Get All Machines

### Endpoint

```http
GET /machines
```

### Response

```json
[
  {
    "machine_id": 1,
    "machine_name": "Compressor A",
    "status": "Active"
  }
]
```

---

## Get Machine by ID

### Endpoint

```http
GET /machines/{machine_id}
```

### Example

```http
GET /machines/1
```

### Response

```json
{
  "machine_id": 1,
  "machine_name": "Compressor A",
  "machine_type": "Compressor",
  "location": "Plant A"
}
```

---

## Add New Machine

### Endpoint

```http
POST /machines
```

### Request

```json
{
  "machine_name": "Machine X",
  "machine_type": "Motor",
  "location": "Factory 1"
}
```

### Response

```json
{
  "message": "Machine Created Successfully"
}
```

---

## Update Machine

### Endpoint

```http
PUT /machines/{machine_id}
```

---

## Delete Machine

### Endpoint

```http
DELETE /machines/{machine_id}
```

---

# 6. Sensor Data APIs

## Insert Sensor Data

### Endpoint

```http
POST /sensor-data
```

### Request

```json
{
  "machine_id": 1,
  "temperature": 78.5,
  "pressure": 120,
  "vibration": 0.18,
  "humidity": 45,
  "current": 6.5
}
```

### Response

```json
{
  "message": "Sensor Data Stored"
}
```

---

## Get Sensor Data

### Endpoint

```http
GET /sensor-data/{machine_id}
```

### Response

```json
[
  {
    "temperature": 78.5,
    "pressure": 120,
    "vibration": 0.18,
    "timestamp": "2026-06-10T12:00:00"
  }
]
```

---

# 7. Prediction APIs

## Generate Prediction

### Endpoint

```http
POST /predict
```

### Request

```json
{
  "machine_id": 1
}
```

### Response

```json
{
  "anomaly_score": 0.78,
  "failure_probability": 0.82,
  "remaining_useful_life": 120
}
```

---

## Get Latest Prediction

### Endpoint

```http
GET /predictions/{machine_id}
```

### Response

```json
{
  "failure_probability": 0.82,
  "remaining_useful_life": 120
}
```

---

# 8. Anomaly Detection API

## Detect Anomaly

### Endpoint

```http
POST /anomaly-detection
```

### Request

```json
{
  "machine_id": 1
}
```

### Response

```json
{
  "status": "Abnormal",
  "anomaly_score": 0.91
}
```

---

# 9. Remaining Useful Life API

## Estimate RUL

### Endpoint

```http
POST /rul
```

### Request

```json
{
  "machine_id": 1
}
```

### Response

```json
{
  "remaining_useful_life": 145
}
```

---

# 10. Alert APIs

## Get Alerts

### Endpoint

```http
GET /alerts
```

### Response

```json
[
  {
    "alert_id": 1,
    "alert_type": "Critical",
    "message": "Failure Risk Above 90%"
  }
]
```

---

## Create Alert

### Endpoint

```http
POST /alerts
```

### Request

```json
{
  "machine_id": 1,
  "alert_type": "Critical",
  "message": "Machine may fail within 24 hours"
}
```

### Response

```json
{
  "message": "Alert Generated"
}
```

---

# 11. Maintenance APIs

## Get Maintenance Schedule

### Endpoint

```http
GET /maintenance/{machine_id}
```

### Response

```json
{
  "machine_id": 1,
  "recommended_date": "2026-06-15",
  "priority": "High"
}
```

---

## Add Maintenance Record

### Endpoint

```http
POST /maintenance"
```

### Request

```json
{
  "machine_id": 1,
  "maintenance_type": "Preventive",
  "technician_name": "John"
}
```

### Response

```json
{
  "message": "Maintenance Record Added"
}
```

---

# 12. Dashboard APIs

## Get Machine Health Summary

### Endpoint

```http
GET /dashboard/summary
```

### Response

```json
{
  "total_machines": 25,
  "healthy": 18,
  "warning": 5,
  "critical": 2
}
```

---

## Get Risk Analytics

### Endpoint

```http
GET /dashboard/risk-analysis
```

### Response

```json
{
  "average_risk_score": 0.65,
  "critical_machines": 2
}
```

---

# 13. Standard Response Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 404  | Resource Not Found    |
| 500  | Internal Server Error |

---

# 14. Error Response Format

```json
{
  "error": true,
  "message": "Machine Not Found"
}
```

---

# 15. Future API Enhancements

* JWT Authentication
* Role-Based Access Control
* WebSocket Real-Time Updates
* SMS Notifications
* Cloud API Integration

---

# 16. Conclusion

The API layer acts as the communication bridge between the frontend dashboard, machine learning models, and database. It provides secure and scalable access to machine monitoring, predictions, alerts, and maintenance services.
