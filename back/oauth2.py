from fastapi.security import OAuth2PasswordBearer
from datetime import datetime,timedelta
from sqlalchemy.orm import Session
from fastapi import status,HTTPException,Depends
from jose import JWTError,jwt
import database,models,schemas
from config import SECRET_KEY,ACCESS_TOKEN_EXPIRE_MINUTES,ALGORITHM

outh2_scheme = OAuth2PasswordBearer(tokenUrl='login')



SECRET_KEY= SECRET_KEY+""
ALGORITHM=ALGORITHM+""
ACCESS_TOKEN_EXPIRE_MINUTES=int(ACCESS_TOKEN_EXPIRE_MINUTES)

def create_access_token(data: dict):
    to_encode= data.copy()

    expire=datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encode_jwt= jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)

    return encode_jwt

def verify_access_token(token: str, cresdentials_exception):

    try:
        payload= jwt.decode(token, SECRET_KEY,algorithms=ALGORITHM)
        id: int=payload.get("user_id")
       
        if id is None:
            raise cresdentials_exception
        token_data=schemas.TokenData(id=id)
        
    except JWTError:
        raise cresdentials_exception
    return token_data



def get_current_user(token:str =Depends(outh2_scheme), db :Session = Depends(database.get_db)):
    credentials_exception= HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"could not validate credentials",headers={"WWW-Authenticate":"Bearer"})

    token=verify_access_token(token,credentials_exception)
   
    user= db.query(models.User).filter(models.User.id == token.id).first()

    return user