# DATA FLOW DIAGRAM (DFD)

# AI-Driven Predictive Maintenance System for Industrial Equipment using IoT Sensor Data and Machine Learning

---

# 1. Introduction

## 1.1 Purpose

A Data Flow Diagram (DFD) illustrates how data moves through the AI-Driven Predictive Maintenance System.

It identifies:

* External Entities
* Processes
* Data Stores
* Data Flows

The DFD helps visualize the movement of sensor data from collection to prediction and maintenance recommendation.

---

# 2. External Entities

The system interacts with the following external entities.

## E1: IoT Sensors

Provide machine data such as:

* Temperature
* Pressure
* Vibration
* Humidity
* Current

---

## E2: Administrator

Responsible for:

* Machine management
* Report viewing
* Monitoring predictions

---

## E3: Maintenance Engineer

Responsible for:

* Monitoring machine health
* Receiving alerts
* Scheduling maintenance

---

## E4: Operator

Responsible for:

* Viewing machine status
* Monitoring sensor values

---

# 3. Data Stores

The following data stores are used.

---

## D1: Machines Database

Stores:

* Machine Information
* Installation Details
* Machine Status

---

## D2: Sensor Data Database

Stores:

* Temperature Readings
* Pressure Readings
* Vibration Readings
* Timestamps

---

## D3: Predictions Database

Stores:

* Anomaly Scores
* Failure Probability
* Remaining Useful Life

---

## D4: Alerts Database

Stores:

* Warning Alerts
* Critical Alerts
* Alert History

---

## D5: Maintenance Database

Stores:

* Maintenance Records
* Maintenance Schedule
* Technician Notes

---

# 4. Context Diagram (Level 0 DFD)

The Context Diagram shows the entire system as a single process.

```text
+------------------+
|   IoT Sensors    |
+--------+---------+
         |
         | Sensor Data
         v
+--------------------------------------+
| AI Predictive Maintenance System     |
+--------------------------------------+
 ^            ^              ^
 |            |              |
 |            |              |
 |            |              |
Admin     Engineer      Operator
```

Data Flow:

IoT Sensors
→ Sensor Data

Administrator
↔ Reports / Monitoring

Maintenance Engineer
↔ Alerts / Recommendations

Operator
↔ Machine Status

---

# 5. Level 1 DFD

The system is divided into major processes.

```text
                   +------------------+
                   |   IoT Sensors    |
                   +--------+---------+
                            |
                            v

+---------------------------------------------------+
| P1: Data Collection & Ingestion                   |
+---------------------------------------------------+
                            |
                            v

+---------------------------------------------------+
| P2: Data Preprocessing                            |
+---------------------------------------------------+
                            |
                            v

+---------------------------------------------------+
| D2: Sensor Data Database                          |
+---------------------------------------------------+
                            |
                            v

+---------------------------------------------------+
| P3: Machine Learning Engine                       |
| - Anomaly Detection                               |
| - Failure Prediction                              |
| - RUL Estimation                                  |
+---------------------------------------------------+
                            |
                            v

+---------------------------------------------------+
| D3: Predictions Database                          |
+---------------------------------------------------+
                            |
              +-------------+--------------+
              |                            |
              v                            v

+-----------------------+      +----------------------+
| P4: Alert Generation  |      | P5: Dashboard        |
+-----------------------+      +----------------------+
              |                            |
              v                            v

+-----------------------+      +----------------------+
| D4: Alerts Database   |      | Users               |
+-----------------------+      +----------------------+
```

---

# 6. Level 2 DFD

Detailed breakdown of machine learning process.

```text
Sensor Data
     |
     v

+----------------------+
| Data Cleaning        |
+----------------------+
     |
     v

+----------------------+
| Feature Engineering  |
+----------------------+
     |
     v

+----------------------+
| Anomaly Detection    |
| Isolation Forest     |
+----------------------+
     |
     v

+----------------------+
| Failure Prediction   |
| XGBoost / LSTM       |
+----------------------+
     |
     v

+----------------------+
| RUL Estimation       |
+----------------------+
     |
     v

Predictions
```

---

# 7. Process Descriptions

---

## P1: Data Collection & Ingestion

### Input

Sensor Readings

### Output

Raw Sensor Data

### Description

Collects machine readings from IoT devices or simulator.

---

## P2: Data Preprocessing

### Input

Raw Sensor Data

### Output

Processed Data

### Description

Performs:

* Data Cleaning
* Normalization
* Feature Extraction

---

## P3: Machine Learning Engine

### Input

Processed Data

### Output

Predictions

### Description

Performs:

* Anomaly Detection
* Failure Prediction
* RUL Estimation

---

## P4: Alert Generation

### Input

Prediction Results

### Output

Alerts

### Description

Generates warnings when failure probability exceeds threshold values.

---

## P5: Dashboard Service

### Input

Prediction Results

### Output

Visual Reports

### Description

Displays machine health metrics and recommendations.

---

# 8. Data Flow Descriptions

| Flow | Description                 |
| ---- | --------------------------- |
| F1   | Sensor Data                 |
| F2   | Processed Data              |
| F3   | Prediction Results          |
| F4   | Alerts                      |
| F5   | Maintenance Recommendations |
| F6   | Dashboard Reports           |

---

# 9. DFD Symbols Used

| Symbol         | Meaning         |
| -------------- | --------------- |
| Rectangle      | External Entity |
| Circle         | Process         |
| Open Rectangle | Data Store      |
| Arrow          | Data Flow       |

---

# 10. Benefits of DFD

* Visualizes system workflow
* Simplifies requirement analysis
* Helps database design
* Helps API design
* Useful for testing and maintenance

---

# 11. Conclusion

The DFD illustrates how sensor data flows through the AI Predictive Maintenance System from collection and storage to machine learning analysis, alert generation, and dashboard visualization. It provides a clear understanding of system functionality and data movement.
