"""Database models module.

This module defines the SQLAlchemy ORM models representing the PostgreSQL database tables.
All table names and column names strictly adhere to the project's Master Context Document.
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, Date, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class Machines(Base):
    """Represents the 'Machines' database table."""

    __tablename__ = "Machines"

    machine_id = Column(Integer, primary_key=True, index=True)
    machine_name = Column(String, nullable=False)
    machine_type = Column(String, nullable=False)
    location = Column(String, nullable=False)
    installation_date = Column(Date, nullable=False)
    status = Column(String, nullable=False)

    # Relationships
    sensor_data = relationship("Sensor_Data", back_populates="machine", cascade="all, delete-orphan")
    predictions = relationship("Predictions", back_populates="machine", cascade="all, delete-orphan")
    alerts = relationship("Alerts", back_populates="machine", cascade="all, delete-orphan")
    maintenance_logs = relationship("Maintenance_Logs", back_populates="machine", cascade="all, delete-orphan")


class Sensor_Data(Base):
    """Represents the 'Sensor_Data' database table."""

    __tablename__ = "Sensor_Data"

    sensor_id = Column(Integer, primary_key=True, index=True)
    machine_id = Column(Integer, ForeignKey("Machines.machine_id"), nullable=False)
    temperature = Column(Float, nullable=False)
    pressure = Column(Float, nullable=False)
    vibration = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    current = Column(Float, nullable=False)
    timestamp = Column(DateTime, nullable=False)

    # Relationship
    machine = relationship("Machines", back_populates="sensor_data")


class Predictions(Base):
    """Represents the 'Predictions' database table."""

    __tablename__ = "Predictions"

    prediction_id = Column(Integer, primary_key=True, index=True)
    machine_id = Column(Integer, ForeignKey("Machines.machine_id"), nullable=False)
    anomaly_score = Column(Float, nullable=False)
    failure_probability = Column(Float, nullable=False)
    remaining_useful_life = Column(Float, nullable=False)
    prediction_time = Column(DateTime, nullable=False)

    # Relationship
    machine = relationship("Machines", back_populates="predictions")


class Alerts(Base):
    """Represents the 'Alerts' database table."""

    __tablename__ = "Alerts"

    alert_id = Column(Integer, primary_key=True, index=True)
    machine_id = Column(Integer, ForeignKey("Machines.machine_id"), nullable=False)
    alert_type = Column(String, nullable=False)
    alert_message = Column(String, nullable=False)
    alert_time = Column(DateTime, nullable=False)
    status = Column(String, nullable=False)

    # Relationship
    machine = relationship("Machines", back_populates="alerts")


class Maintenance_Logs(Base):
    """Represents the 'Maintenance_Logs' database table."""

    __tablename__ = "Maintenance_Logs"

    maintenance_id = Column(Integer, primary_key=True, index=True)
    machine_id = Column(Integer, ForeignKey("Machines.machine_id"), nullable=False)
    maintenance_date = Column(Date, nullable=False)
    maintenance_type = Column(String, nullable=False)
    technician_name = Column(String, nullable=False)
    remarks = Column(String, nullable=True)
    next_due_date = Column(Date, nullable=False)

    # Relationship
    machine = relationship("Machines", back_populates="maintenance_logs")
