"""API routes module.

This module defines the Pydantic schemas and the FastAPI routes/endpoints
for the Predictive Maintenance System, ensuring compliance with the fixed
API contract. It handles CRUD operations for machines, sensor ingestion,
alerting, maintenance tracking, and ML predictions.
"""

import sys
import importlib.util
from datetime import datetime, date
from pathlib import Path
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .database import get_db
from . import models

# Initialize APIRouter
router = APIRouter()


# ==========================================
# PYDANTIC SCHEMAS (Request/Response Models)
# ==========================================

# Machine Schemas
class MachineBase(BaseModel):
    machine_name: str
    machine_type: str
    location: str
    installation_date: date
    status: str


class MachineCreate(MachineBase):
    pass


class MachineUpdate(BaseModel):
    machine_name: Optional[str] = None
    machine_type: Optional[str] = None
    location: Optional[str] = None
    installation_date: Optional[date] = None
    status: Optional[str] = None


class MachineResponse(MachineBase):
    machine_id: int

    class Config:
        from_attributes = True


# Sensor Data Schemas
class SensorDataBase(BaseModel):
    machine_id: int
    temperature: float
    pressure: float
    vibration: float
    humidity: float
    current: float
    timestamp: datetime


class SensorDataCreate(SensorDataBase):
    pass


class SensorDataResponse(SensorDataBase):
    sensor_id: int

    class Config:
        from_attributes = True


# Prediction Schemas
class PredictionBase(BaseModel):
    machine_id: int
    anomaly_score: float
    failure_probability: float
    remaining_useful_life: float
    prediction_time: datetime


class PredictionCreate(PredictionBase):
    pass


class PredictionResponse(PredictionBase):
    prediction_id: int

    class Config:
        from_attributes = True


# Alert Schemas
class AlertBase(BaseModel):
    machine_id: int
    alert_type: str
    alert_message: str
    alert_time: datetime
    status: str


class AlertCreate(AlertBase):
    pass


class AlertResponse(AlertBase):
    alert_id: int

    class Config:
        from_attributes = True


# Maintenance Log Schemas
class MaintenanceLogBase(BaseModel):
    machine_id: int
    maintenance_date: date
    maintenance_type: str
    technician_name: str
    remarks: Optional[str] = None
    next_due_date: date


class MaintenanceLogCreate(MaintenanceLogBase):
    pass


class MaintenanceLogResponse(MaintenanceLogBase):
    maintenance_id: int

    class Config:
        from_attributes = True


# ML Inference Requests
class PredictRequest(BaseModel):
    machine_id: int


class AnomalyRequest(BaseModel):
    machine_id: int
    temperature: Optional[float] = None
    pressure: Optional[float] = None
    vibration: Optional[float] = None
    humidity: Optional[float] = None
    current: Optional[float] = None


class RulRequest(BaseModel):
    machine_id: int
    temperature: Optional[float] = None
    pressure: Optional[float] = None
    vibration: Optional[float] = None
    humidity: Optional[float] = None
    current: Optional[float] = None


# Dashboard Schemas
class DashboardSummary(BaseModel):
    total_machines: int
    active_alerts: int
    average_rul: float
    healthy_machines: int


class RiskAnalysisItem(BaseModel):
    machine_id: int
    machine_name: str
    failure_probability: float
    risk_level: str


# ==========================================
# DYNAMIC ML MODULE LOADER & FALLBACKS
# ==========================================

def get_ml_module(module_name: str):
    """Loads Akhil's ML module dynamically from the 'ml-models' directory.

    If not found or an error occurs, returns None, prompting fallback execution.
    """
    import os
    ml_path = Path(__file__).resolve().parent.parent / "ml-models"
    file_path = ml_path / f"{module_name}.py"
    if file_path.exists():
        old_cwd = os.getcwd()
        try:
            # Shift cwd to ml-models folder so internal relative pickle file loading works
            os.chdir(str(ml_path))
            spec = importlib.util.spec_from_file_location(module_name, file_path)
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            return module
        except Exception:
            return None
        finally:
            os.chdir(old_cwd)
    return None


def calculate_anomaly(
        temperature: float,
        pressure: float,
        vibration: float,
        humidity: float,
        current: float
    ) -> tuple[float, str]:
        """Detect anomalies using the trained Isolation Forest model.
    
        Returns:
          tuple (anomaly_score, status)
        """

        ml_module = get_ml_module("anomaly_detection")

        if ml_module and hasattr(ml_module, "detect_anomaly"):
            try:
              return ml_module.detect_anomaly(
                 temperature,
                 pressure,
                 vibration,
                 humidity,
                 current
            )
            except Exception as e:
              print(f"Anomaly Detection Error: {e}")

        # Fallback logic
        score = 0.05

        if vibration > 4.2:
           score += 0.30

        if temperature > 85:
           score += 0.30

        if current > 15:
           score += 0.20

        if pressure > 50:
           score += 0.10

        if humidity > 80:
           score += 0.10

        status = "Abnormal" if score >= 0.5 else "Normal"

        return score, status


def calculate_failure_probability(
    temperature: float,
    pressure: float,
    vibration: float,
    humidity: float,
    current: float
) -> float:
    """
    Predict failure probability using the trained XGBoost model.
    Falls back to deterministic rules if the ML model is unavailable.
    """

    ml_module = get_ml_module("failure_prediction")

    if ml_module and hasattr(ml_module, "predict_failure"):
        try:
            return ml_module.predict_failure(
                temperature,
                pressure,
                vibration,
                humidity,
                current
            )
        except Exception as e:
            print(f"Failure Prediction Error: {e}")

    # Fallback logic
    prob = 0.10

    if vibration > 4.0:
        prob += 0.30

    if current > 16.0:
        prob += 0.30

    if temperature > 85:
        prob += 0.15

    if pressure > 50:
        prob += 0.10

    if humidity > 80:
        prob += 0.05

    return min(prob, 0.99)


def calculate_rul(machine_id: int, db: Session, sensor_vals: Optional[dict] = None) -> float:
    """Helper to estimate remaining useful life using Akhil's model or deterministic fallback."""
    ml_module = get_ml_module("rul_estimator")
    if ml_module:
        func = getattr(ml_module, "predict_rul", None) or getattr(ml_module, "estimate_rul", None)
        if func:
            try:
                cycle_count = db.query(models.Sensor_Data).filter(models.Sensor_Data.machine_id == machine_id).count()
                # Use provided sensor values or defaults if none exist
                temp = 70.0
                pressure = 150.0
                vibration = 3.0
                humidity = 50.0
                current = 12.0

                if sensor_vals:
                    temp = sensor_vals.get("temperature", temp) or temp
                    pressure = sensor_vals.get("pressure", pressure) or pressure
                    vibration = sensor_vals.get("vibration", vibration) or vibration
                    humidity = sensor_vals.get("humidity", humidity) or humidity
                    current = sensor_vals.get("current", current) or current

                # Construct an 18-dimensional feature array mapping to the NASA C-MAPSS cleaned feature vector
                features = [
                    float(cycle_count),   # Cycle count
                    0.0,                  # Operational setting 1
                    0.0,                  # Operational setting 2
                    float(temp),          # Sensor 2 (mapped to temp)
                    float(pressure),      # Sensor 3 (mapped to pressure)
                    float(vibration),     # Sensor 4 (mapped to vibration)
                    float(humidity),      # Sensor 7 (mapped to humidity)
                    float(current),       # Sensor 8 (mapped to current)
                    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0  # Remaining 10 padded features
                ]

                if func.__name__ == "predict_rul":
                    res = func(features)
                else:
                    res = func(machine_id, sensor_vals)
                return float(res)
            except Exception:
                pass

    # Fallback RUL calculation representing operating cycles count-down (NASA C-MAPSS engine cycles)
    cycle_count = db.query(models.Sensor_Data).filter(models.Sensor_Data.machine_id == machine_id).count()
    rul = max(160.0 - cycle_count, 10.0)
    return rul


# ==========================================
# API ENDPOINTS
# ==========================================

# --- Machines ---

@router.get("/machines", response_model=List[MachineResponse])
def get_machines(db: Session = Depends(get_db)):
    """Retrieves all machine records from the database."""
    return db.query(models.Machines).all()


@router.get("/machines/{id}", response_model=MachineResponse)
def get_machine(id: int, db: Session = Depends(get_db)):
    """Retrieves a single machine record by its ID."""
    machine = db.query(models.Machines).filter(models.Machines.machine_id == id).first()
    if not machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Machine with id {id} not found"
        )
    return machine


@router.post("/machines", response_model=MachineResponse, status_code=status.HTTP_201_CREATED)
def create_machine(machine: MachineCreate, db: Session = Depends(get_db)):
    """Creates a new machine record in the database."""
    db_machine = models.Machines(**machine.dict())
    db.add(db_machine)
    db.commit()
    db.refresh(db_machine)
    return db_machine


@router.put("/machines/{id}", response_model=MachineResponse)
def update_machine(id: int, machine_update: MachineUpdate, db: Session = Depends(get_db)):
    """Updates an existing machine record."""
    db_machine = db.query(models.Machines).filter(models.Machines.machine_id == id).first()
    if not db_machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Machine with id {id} not found"
        )

    update_data = machine_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_machine, key, value)

    db.commit()
    db.refresh(db_machine)
    return db_machine


@router.delete("/machines/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_machine(id: int, db: Session = Depends(get_db)):
    """Deletes a machine record and all its cascading dependents."""
    db_machine = db.query(models.Machines).filter(models.Machines.machine_id == id).first()
    if not db_machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Machine with id {id} not found"
        )
    db.delete(db_machine)
    db.commit()
    return None


# --- Sensor Data ---

@router.post("/sensor-data", response_model=SensorDataResponse, status_code=status.HTTP_201_CREATED)
def create_sensor_data(sensor_data: SensorDataCreate, db: Session = Depends(get_db)):
    """Receives and stores raw sensor readings."""
    # Ensure machine exists
    machine = db.query(models.Machines).filter(models.Machines.machine_id == sensor_data.machine_id).first()
    if not machine:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Machine with id {sensor_data.machine_id} does not exist"
        )

    db_sensor = models.Sensor_Data(**sensor_data.dict())
    db.add(db_sensor)
    db.commit()
    db.refresh(db_sensor)
    return db_sensor


@router.get("/sensor-data/{machine_id}", response_model=List[SensorDataResponse])
def get_sensor_data(machine_id: int, db: Session = Depends(get_db)):
    """Retrieves all sensor readings for a specific machine."""
    # Ensure machine exists
    machine = db.query(models.Machines).filter(models.Machines.machine_id == machine_id).first()
    if not machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Machine with id {machine_id} not found"
        )

    return db.query(models.Sensor_Data).filter(
        models.Sensor_Data.machine_id == machine_id
    ).order_by(models.Sensor_Data.timestamp.desc()).all()


# --- ML / Predictions ---

@router.post("/predict", response_model=PredictionResponse, status_code=status.HTTP_201_CREATED)
def predict(request: PredictRequest, db: Session = Depends(get_db)):
    """Triggers ML failure prediction and estimates Remaining Useful Life.

    Loads the latest sensor data, queries the ML modules, stores the result,
    and returns the prediction output.
    """
    machine = db.query(models.Machines).filter(models.Machines.machine_id == request.machine_id).first()
    if not machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Machine with id {request.machine_id} not found"
        )

    # Get the latest sensor reading
    latest_sensor = db.query(models.Sensor_Data).filter(
        models.Sensor_Data.machine_id == request.machine_id
    ).order_by(models.Sensor_Data.timestamp.desc()).first()

    if not latest_sensor:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"No sensor data available for machine {request.machine_id} to perform predictions"
        )

    # Calculate values
    anomaly_score, _ = calculate_anomaly(
      latest_sensor.temperature,
      latest_sensor.pressure,
      latest_sensor.vibration,
      latest_sensor.humidity,
      latest_sensor.current
    )
    fail_prob = calculate_failure_probability(
      latest_sensor.temperature,
      latest_sensor.pressure,
      latest_sensor.vibration,
      latest_sensor.humidity,
      latest_sensor.current
    )
    rul_value = calculate_rul(request.machine_id, db, latest_sensor.__dict__)

    # Save prediction
    db_pred = models.Predictions(
        machine_id=request.machine_id,
        anomaly_score=anomaly_score,
        failure_probability=fail_prob,
        remaining_useful_life=rul_value,
        prediction_time=datetime.utcnow()
    )
    db.add(db_pred)
    db.commit()
    db.refresh(db_pred)
    return db_pred


@router.get("/predictions/{machine_id}", response_model=List[PredictionResponse])
def get_predictions(machine_id: int, db: Session = Depends(get_db)):
    """Retrieves all prediction logs for a machine."""
    machine = db.query(models.Machines).filter(models.Machines.machine_id == machine_id).first()
    if not machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Machine with id {machine_id} not found"
        )

    return db.query(models.Predictions).filter(
        models.Predictions.machine_id == machine_id
    ).order_by(models.Predictions.prediction_time.desc()).all()


@router.post("/anomaly-detection")
def detect_anomalies(request: AnomalyRequest, db: Session = Depends(get_db)):
    """Determines if the provided or latest machine sensor metrics contain anomalies."""
    machine = db.query(models.Machines).filter(models.Machines.machine_id == request.machine_id).first()
    if not machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Machine with id {request.machine_id} not found"
        )

    temp, vib = request.temperature, request.vibration

    # Fallback to latest database values if not provided
    if temp is None or vib is None:
        latest_sensor = db.query(models.Sensor_Data).filter(
            models.Sensor_Data.machine_id == request.machine_id
        ).order_by(models.Sensor_Data.timestamp.desc()).first()

        if not latest_sensor:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"No sensor data available for machine {request.machine_id}"
            )
        temp = latest_sensor.temperature if temp is None else temp
        vib = latest_sensor.vibration if vib is None else vib

    score, status_str = calculate_anomaly(temp, vib)
    return {
        "machine_id": request.machine_id,
        "anomaly_score": score,
        "status": status_str
    }


@router.post("/rul")
def remaining_useful_life(request: RulRequest, db: Session = Depends(get_db)):
    """Predicts the remaining useful cycles/life (RUL) for a machine."""
    machine = db.query(models.Machines).filter(models.Machines.machine_id == request.machine_id).first()
    if not machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Machine with id {request.machine_id} not found"
        )

    sensor_vals = request.dict(exclude={"machine_id"})
    rul_value = calculate_rul(request.machine_id, db, sensor_vals)
    return {
        "machine_id": request.machine_id,
        "remaining_useful_life": rul_value
    }


# --- Alerts ---

@router.get("/alerts", response_model=List[AlertResponse])
def get_alerts(db: Session = Depends(get_db)):
    """Retrieves all machine alerts."""
    return db.query(models.Alerts).order_by(models.Alerts.alert_time.desc()).all()


@router.post("/alerts", response_model=AlertResponse, status_code=status.HTTP_201_CREATED)
def create_alert(alert: AlertCreate, db: Session = Depends(get_db)):
    """Triggers and logs a new equipment alert."""
    machine = db.query(models.Machines).filter(models.Machines.machine_id == alert.machine_id).first()
    if not machine:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Machine with id {alert.machine_id} does not exist"
        )

    db_alert = models.Alerts(**alert.dict())
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert


# --- Maintenance Logs ---

@router.get("/maintenance/{machine_id}", response_model=List[MaintenanceLogResponse])
def get_maintenance_logs(machine_id: int, db: Session = Depends(get_db)):
    """Retrieves all historical maintenance records for a machine."""
    machine = db.query(models.Machines).filter(models.Machines.machine_id == machine_id).first()
    if not machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Machine with id {machine_id} not found"
        )

    return db.query(models.Maintenance_Logs).filter(
        models.Maintenance_Logs.machine_id == machine_id
    ).order_by(models.Maintenance_Logs.maintenance_date.desc()).all()


@router.post("/maintenance", response_model=MaintenanceLogResponse, status_code=status.HTTP_201_CREATED)
def create_maintenance_log(log: MaintenanceLogCreate, db: Session = Depends(get_db)):
    """Creates a new maintenance log record."""
    machine = db.query(models.Machines).filter(models.Machines.machine_id == log.machine_id).first()
    if not machine:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Machine with id {log.machine_id} does not exist"
        )

    db_log = models.Maintenance_Logs(**log.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log


# --- Dashboard ---

@router.get("/dashboard/summary", response_model=DashboardSummary)
def get_dashboard_summary(db: Session = Depends(get_db)):
    """Calculates aggregates for dashboard summary metrics."""
    total_machines = db.query(models.Machines).count()
    active_alerts = db.query(models.Alerts).filter(models.Alerts.status == "active").count()

    # Calculate average RUL across all machines based on their latest prediction
    # Subquery to fetch the latest prediction_id for each machine
    from sqlalchemy import func
    subq = db.query(
        models.Predictions.machine_id,
        func.max(models.Predictions.prediction_time).label("max_time")
    ).group_by(models.Predictions.machine_id).subquery()

    latest_preds = db.query(models.Predictions).join(
        subq,
        (models.Predictions.machine_id == subq.c.machine_id) &
        (models.Predictions.prediction_time == subq.c.max_time)
    ).all()

    avg_rul = 0.0
    if latest_preds:
        avg_rul = sum(p.remaining_useful_life for p in latest_preds) / len(latest_preds)

    healthy_machines = db.query(models.Machines).filter(models.Machines.status == "healthy").count()

    return {
        "total_machines": total_machines,
        "active_alerts": active_alerts,
        "average_rul": round(avg_rul, 2),
        "healthy_machines": healthy_machines
    }


@router.get("/dashboard/risk-analysis", response_model=List[RiskAnalysisItem])
def get_dashboard_risk_analysis(db: Session = Depends(get_db)):
    """Retrieves latest failure risk categorization for all registered machines."""
    machines = db.query(models.Machines).all()
    risk_list = []

    for machine in machines:
        # Fetch the latest prediction for this machine
        latest_pred = db.query(models.Predictions).filter(
            models.Predictions.machine_id == machine.machine_id
        ).order_by(models.Predictions.prediction_time.desc()).first()

        fail_prob = 0.0
        if latest_pred:
            fail_prob = latest_pred.failure_probability

        # Determine risk level
        if fail_prob >= 0.70:
            risk = "High"
        elif fail_prob >= 0.35:
            risk = "Medium"
        else:
            risk = "Low"

        risk_list.append({
            "machine_id": machine.machine_id,
            "machine_name": machine.machine_name,
            "failure_probability": round(fail_prob, 2),
            "risk_level": risk
        })

    # Sort high risk first
    risk_list.sort(key=lambda x: x["failure_probability"], reverse=True)
    return risk_list
