from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models import all_models
from app.schemas import schemas
from app.core import security

# THIS LINE WAS MISSING OR BROKEN
router = APIRouter()

@router.post("/register", response_model=schemas.Token)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    user = db.query(all_models.User).filter(all_models.User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = all_models.User(
        email=user_in.email,
        hashed_password=security.get_password_hash(user_in.password),
        role="user"
    )
    db.add(new_user)
    db.commit()
    
    access_token = security.create_access_token(data={"sub": str(new_user.email)})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/token", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(all_models.User).filter(all_models.User.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = security.create_access_token(data={"sub": str(user.email)})
    return {"access_token": access_token, "token_type": "bearer"}