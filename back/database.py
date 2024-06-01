from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import DATABASE_HOSTNAME,DATABASE_NAME,DATABASE_PASSWORD,DATABASE_PORT,DATABASE_USERNAME


url="postgresql://"+DATABASE_USERNAME+":"+DATABASE_PASSWORD+"@"+DATABASE_HOSTNAME+":"+DATABASE_PORT+"/"+DATABASE_NAME
SQLALCHEMY_DATABASE_URL= url



engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal= sessionmaker(autocommit=False,autoflush=False, bind=engine)
Base=declarative_base()

def get_db():
    db=SessionLocal()
    try:
        yield db
        
    finally:
        db.close()