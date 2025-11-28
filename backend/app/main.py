import logging
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import auth, tasks
from app.db.database import engine, Base

# 1. Setup Logging (File AND Console for easier debugging)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("app.log"),      # Saves to file (Requirement)
        logging.StreamHandler(sys.stdout)    # Prints to terminal (For you to see errors)
    ]
)
logger = logging.getLogger(__name__)

# 2. Create DB Tables (Wrapped in try/catch to catch connection errors early)
try:
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables verified/created successfully.")
except Exception as e:
    logger.error(f"CRITICAL: Database connection failed. Is Docker running? Error: {e}")

app = FastAPI(title="CryptoDesk API")

# 3. CORS Middleware (Permissive for Codespaces)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods
    allow_headers=["*"], # Allows all headers
)

# 4. Register Routers
app.include_router(auth.router, prefix="/api/v1", tags=["Auth"])
app.include_router(tasks.router, prefix="/api/v1/tasks", tags=["Tasks"])

@app.get("/")
def root():
    logger.info("Root endpoint hit - API is healthy")
    return {"message": "CryptoDesk API is running. Go to /docs for Swagger."}