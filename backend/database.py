"""Database configuration module.

This module sets up the SQLAlchemy database engine, session factory,
and base class for ORM models. It uses environment variables to configure
the connection details for PostgreSQL.
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Retrieve database connection URL from environment variables,
# using a default connection string if none is defined.
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:akhil@localhost:5432/predictive_maintenance"
)

# Create the SQLAlchemy engine for PostgreSQL database connection.
engine = create_engine(DATABASE_URL)

# Configure a sessionmaker factory for creating new database sessions.
# autocommit=False ensures transactions must be explicitly committed.
# autoflush=False prevents automatic flushing of pending changes before query execution.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the Declarative Base class from which all ORM models will inherit.
Base = declarative_base()


def get_db():
    """Dependency injection generator to provide database sessions.

    Yields:
        db (SessionLocal): A SQLAlchemy database session instance.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
