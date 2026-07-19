"""Main application module.

This module initializes the FastAPI application, configures CORS middleware for the React frontend,
triggers the automatic creation of PostgreSQL database tables on startup, and mounts the API routes.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .routes import router

# Automatically create all tables defined in models.py if they do not exist in the database.
Base.metadata.create_all(bind=engine)

# Initialize FastAPI application
app = FastAPI(
    title="Predictive Maintenance System API",
    description="Backend API for AI-Driven Predictive Maintenance System",
    version="1.0.0"
)

# CORS middleware configuration to enable Pavan Kalyan's React frontend
# to communicate with the FastAPI server running on a different port.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Safe wildcard for development, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all API routes defined in routes.py
app.include_router(router)


@app.get("/")
def read_root():
    """Root health check endpoint."""
    return {
        "status": "online",
        "message": "Predictive Maintenance System API is running successfully."
    }
