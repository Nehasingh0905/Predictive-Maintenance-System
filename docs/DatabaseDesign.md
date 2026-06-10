# DATABASE DESIGN DOCUMENT

# AI-Driven Predictive Maintenance System for Industrial Equipment using IoT Sensor Data and Machine Learning

---

# 1. Introduction

## 1.1 Purpose

This document describes the database structure for the AI-Driven Predictive Maintenance System. The database is responsible for storing machine information, sensor readings, machine learning predictions, alerts, and maintenance schedules.

The database serves as the central repository connecting the Data Pipeline, Machine Learning Models, Backend APIs, and Dashboard.

---

# 2. Database Management System

## Selected DBMS

PostgreSQL

### Reasons for Selection

* Open Source
* High Performance
* Supports Large Datasets
* Excellent Python Integration
* Reliable for Industrial Applications
* Supports Time-Series Data Storage

---

# 3. Database Architecture

```text
+----------------+
|   Machines     |
+--------+-------+
         |
         |
         | 1
         |
         | N
+--------v--------+
|  Sensor_Data    |
+--------+--------+
         |
         |
         | 1
         |
         | N
+--------v--------+
| Predictions     |
+--------+--------+
         |
         |
         +--------+
         |        |
         |        |
+--------v--+ +---v-----------+
| Alerts    | | Maintenance   |
+-----------+ +---------------+
```

---

# 4. Entity Relationship Diagram (ER Diagram)

```text
Machines
│
├── Sensor_Data
│
├── Predictions
│
├── Alerts
│
└── Maintenance_Logs
```

Relationship:

* One Machine can have many Sensor Readings.
* One Machine can generate many Predictions.
* One Machine can generate many Alerts.
* One Machine can have many Maintenance Records.

---

# 5. Database Tables

---

# Table 1: Machines

## Description

Stores machine details.

### Attributes

| Field Name        | Data Type    | Description       |
| ----------------- | ------------ | ----------------- |
| machine_id        | SERIAL       | Primary Key       |
| machine_name      | VARCHAR(100) | Machine Name      |
| machine_type      | VARCHAR(100) | Equipment Type    |
| location          | VARCHAR(100) | Plant Location    |
| installation_date | DATE         | Installation Date |
| status            | VARCHAR(20)  | Active/Inactive   |

### Primary Key

machine_id

---

# Table 2: Sensor_Data

## Description

Stores machine sensor readings.

### Attributes

| Field Name  | Data Type | Description         |
| ----------- | --------- | ------------------- |
| sensor_id   | SERIAL    | Primary Key         |
| machine_id  | INT       | Foreign Key         |
| temperature | FLOAT     | Temperature Reading |
| pressure    | FLOAT     | Pressure Reading    |
| vibration   | FLOAT     | Vibration Reading   |
| humidity    | FLOAT     | Humidity Reading    |
| current     | FLOAT     | Motor Current       |
| timestamp   | TIMESTAMP | Reading Time        |

### Primary Key

sensor_id

### Foreign Key

machine_id → Machines(machine_id)

---

# Table 3: Predictions

## Description

Stores machine learning prediction results.

### Attributes

| Field Name            | Data Type | Description         |
| --------------------- | --------- | ------------------- |
| prediction_id         | SERIAL    | Primary Key         |
| machine_id            | INT       | Foreign Key         |
| anomaly_score         | FLOAT     | Anomaly Value       |
| failure_probability   | FLOAT     | Failure Probability |
| remaining_useful_life | FLOAT     | Remaining Life      |
| prediction_time       | TIMESTAMP | Prediction Time     |

### Primary Key

prediction_id

### Foreign Key

machine_id → Machines(machine_id)

---

# Table 4: Alerts

## Description

Stores system-generated alerts.

### Attributes

| Field Name    | Data Type   | Description      |
| ------------- | ----------- | ---------------- |
| alert_id      | SERIAL      | Primary Key      |
| machine_id    | INT         | Foreign Key      |
| alert_type    | VARCHAR(50) | Warning/Critical |
| alert_message | TEXT        | Alert Details    |
| alert_time    | TIMESTAMP   | Generated Time   |
| status        | VARCHAR(20) | Open/Closed      |

### Primary Key

alert_id

### Foreign Key

machine_id → Machines(machine_id)

---

# Table 5: Maintenance_Logs

## Description

Stores maintenance records.

### Attributes

| Field Name       | Data Type    | Description           |
| ---------------- | ------------ | --------------------- |
| maintenance_id   | SERIAL       | Primary Key           |
| machine_id       | INT          | Foreign Key           |
| maintenance_date | DATE         | Date Performed        |
| maintenance_type | VARCHAR(100) | Preventive/Corrective |
| technician_name  | VARCHAR(100) | Technician            |
| remarks          | TEXT         | Notes                 |
| next_due_date    | DATE         | Next Maintenance      |

### Primary Key

maintenance_id

### Foreign Key

machine_id → Machines(machine_id)

---

# 6. Relationships

## Machines → Sensor_Data

Relationship:

One-to-Many

```text
One Machine
      |
      |---- Many Sensor Records
```

---

## Machines → Predictions

Relationship:

One-to-Many

```text
One Machine
      |
      |---- Many Predictions
```

---

## Machines → Alerts

Relationship:

One-to-Many

```text
One Machine
      |
      |---- Many Alerts
```

---

## Machines → Maintenance_Logs

Relationship:

One-to-Many

```text
One Machine
      |
      |---- Many Maintenance Records
```

---

# 7. SQL Table Creation Scripts

## Machines Table

```sql
CREATE TABLE Machines (
    machine_id SERIAL PRIMARY KEY,
    machine_name VARCHAR(100),
    machine_type VARCHAR(100),
    location VARCHAR(100),
    installation_date DATE,
    status VARCHAR(20)
);
```

## Sensor_Data Table

```sql
CREATE TABLE Sensor_Data (
    sensor_id SERIAL PRIMARY KEY,
    machine_id INT REFERENCES Machines(machine_id),
    temperature FLOAT,
    pressure FLOAT,
    vibration FLOAT,
    humidity FLOAT,
    current FLOAT,
    timestamp TIMESTAMP
);
```

## Predictions Table

```sql
CREATE TABLE Predictions (
    prediction_id SERIAL PRIMARY KEY,
    machine_id INT REFERENCES Machines(machine_id),
    anomaly_score FLOAT,
    failure_probability FLOAT,
    remaining_useful_life FLOAT,
    prediction_time TIMESTAMP
);
```

## Alerts Table

```sql
CREATE TABLE Alerts (
    alert_id SERIAL PRIMARY KEY,
    machine_id INT REFERENCES Machines(machine_id),
    alert_type VARCHAR(50),
    alert_message TEXT,
    alert_time TIMESTAMP,
    status VARCHAR(20)
);
```

## Maintenance_Logs Table

```sql
CREATE TABLE Maintenance_Logs (
    maintenance_id SERIAL PRIMARY KEY,
    machine_id INT REFERENCES Machines(machine_id),
    maintenance_date DATE,
    maintenance_type VARCHAR(100),
    technician_name VARCHAR(100),
    remarks TEXT,
    next_due_date DATE
);
```

---

# 8. Data Flow Through Database

Step 1:
Sensor readings are received from IoT devices.

↓

Step 2:
Sensor data is stored in Sensor_Data table.

↓

Step 3:
Machine learning models analyze stored data.

↓

Step 4:
Prediction results are stored in Predictions table.

↓

Step 5:
High-risk predictions generate entries in Alerts table.

↓

Step 6:
Maintenance activities are recorded in Maintenance_Logs.

---

# 9. Future Database Enhancements

* InfluxDB for Time-Series Data
* User Authentication Table
* Audit Logs
* Equipment Parts Table
* Spare Inventory Table
* Multi-Factory Support

---

# 10. Conclusion

The database design provides a structured and scalable foundation for storing machine sensor data, machine learning predictions, alerts, and maintenance records. The schema supports efficient data retrieval, predictive analytics, and future system expansion.
