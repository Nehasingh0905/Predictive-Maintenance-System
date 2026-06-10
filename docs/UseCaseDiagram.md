# USE CASE DIAGRAM DOCUMENT

# AI-Driven Predictive Maintenance System for Industrial Equipment using IoT Sensor Data and Machine Learning

---

# 1. Introduction

## 1.1 Purpose

This document describes the interactions between users and the AI-Driven Predictive Maintenance System.

A Use Case Diagram represents the functional requirements of the system by showing how users interact with different system features.

---

# 2. Actors

The system consists of three primary actors.

---

## 2.1 Administrator

### Responsibilities

* Manage machines
* Monitor system performance
* View predictions and reports
* Manage users

---

## 2.2 Maintenance Engineer

### Responsibilities

* Monitor machine health
* Receive failure alerts
* Schedule maintenance
* View machine analytics

---

## 2.3 Operator

### Responsibilities

* View machine status
* Monitor sensor values
* Check maintenance schedules

---

# 3. System Use Cases

The following use cases are supported by the system.

---

## UC1: View Machine Status

### Actor

* Administrator
* Maintenance Engineer
* Operator

### Description

Allows users to monitor the current condition of machines.

### Preconditions

Machine exists in system.

### Postconditions

Current machine status is displayed.

---

## UC2: Monitor Sensor Data

### Actor

* Administrator
* Maintenance Engineer
* Operator

### Description

Displays real-time sensor readings such as temperature, pressure, and vibration.

### Preconditions

Sensor data available.

### Postconditions

Sensor dashboard displayed.

---

## UC3: Detect Anomalies

### Actor

* Administrator
* Maintenance Engineer

### Description

System automatically detects abnormal machine behavior using machine learning.

### Preconditions

Sensor data available.

### Postconditions

Anomaly score generated.

---

## UC4: Predict Machine Failure

### Actor

* Administrator
* Maintenance Engineer

### Description

System predicts future equipment failures using AI models.

### Preconditions

Historical sensor data available.

### Postconditions

Failure probability displayed.

---

## UC5: Estimate Remaining Useful Life (RUL)

### Actor

* Administrator
* Maintenance Engineer

### Description

System estimates remaining operational life of machine components.

### Preconditions

Prediction model available.

### Postconditions

RUL value displayed.

---

## UC6: Receive Alerts

### Actor

* Maintenance Engineer

### Description

Receives notifications when machine failure risk exceeds threshold.

### Preconditions

Alert condition triggered.

### Postconditions

Alert generated and displayed.

---

## UC7: View Maintenance Recommendations

### Actor

* Maintenance Engineer

### Description

System suggests optimal maintenance windows.

### Preconditions

Prediction results available.

### Postconditions

Maintenance recommendation displayed.

---

## UC8: Manage Machines

### Actor

* Administrator

### Description

Add, update, or remove machine information.

### Preconditions

Administrator authenticated.

### Postconditions

Machine database updated.

---

## UC9: View Reports

### Actor

* Administrator

### Description

Generate analytics and performance reports.

### Preconditions

Historical data available.

### Postconditions

Report generated.

---

# 4. Use Case Diagram (Text Representation)

```text
                    +-------------------+
                    |   Administrator   |
                    +-------------------+
                             |
      ------------------------------------------------
      |          |          |         |             |
      v          v          v         v             v
 Manage      View      Monitor   Predict      View
 Machines    Status    Sensors   Failure      Reports


                 +------------------------+
                 | Maintenance Engineer   |
                 +------------------------+
                             |
 ---------------------------------------------------------
 |          |          |          |          |           |
 v          v          v          v          v           v
View     Monitor   Detect    Predict     Receive   Schedule
Status   Sensors   Anomaly   Failure     Alerts    Maintenance


                     +-------------+
                     |  Operator   |
                     +-------------+
                             |
                  ----------------------
                  |                    |
                  v                    v
             View Status       Monitor Sensors
```

---

# 5. UML Use Case Diagram

The actual UML diagram should contain:

Actors:

1. Administrator
2. Maintenance Engineer
3. Operator

Use Cases:

1. Manage Machines
2. View Machine Status
3. Monitor Sensor Data
4. Detect Anomalies
5. Predict Failures
6. Estimate RUL
7. Receive Alerts
8. Schedule Maintenance
9. View Reports

Connections:

Administrator
→ Manage Machines
→ View Machine Status
→ Monitor Sensor Data
→ Predict Failures
→ View Reports

Maintenance Engineer
→ View Machine Status
→ Monitor Sensor Data
→ Detect Anomalies
→ Predict Failures
→ Estimate RUL
→ Receive Alerts
→ Schedule Maintenance

Operator
→ View Machine Status
→ Monitor Sensor Data

---

# 6. Use Case Summary Table

| Use Case             | Actor                     |
| -------------------- | ------------------------- |
| View Machine Status  | Admin, Engineer, Operator |
| Monitor Sensor Data  | Admin, Engineer, Operator |
| Detect Anomalies     | Admin, Engineer           |
| Predict Failure      | Admin, Engineer           |
| Estimate RUL         | Admin, Engineer           |
| Receive Alerts       | Engineer                  |
| Schedule Maintenance | Engineer                  |
| Manage Machines      | Admin                     |
| View Reports         | Admin                     |

---

# 7. Benefits of Use Case Model

* Clearly identifies user interactions.
* Helps define system requirements.
* Improves communication between stakeholders.
* Simplifies system design.
* Assists during testing and validation.

---

# 8. Conclusion

The Use Case Diagram provides a clear representation of how different users interact with the AI-Driven Predictive Maintenance System. It helps identify system functionalities and ensures that all user requirements are properly addressed during development.
