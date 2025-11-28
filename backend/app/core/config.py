from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CryptoDesk"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "super_secret_key_12345" # In prod, use env var
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120
    DATABASE_URL: str # Will come from Docker

settings = Settings()