from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import auth, tasks
from app.db.database import engine, Base
import logging

# Create DB Tables
Base.metadata.create_all(bind=engine)

# Setup Logging for Assignment
logging.basicConfig(filename='app.log', level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="CryptoDesk API")

# Allow Codespaces Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for Codespaces ease
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1", tags=["Auth"])
app.include_router(tasks.router, prefix="/api/v1/tasks", tags=["Tasks"])

@app.get("/")
def root():
    logger.info("Health check hit")
    return {"message": "API Running"}