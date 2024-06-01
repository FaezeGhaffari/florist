from fastapi import FastAPI,UploadFile,File

import models
from database import engine

import Apartment,User,Bunch,Accessory,auth,AccessoryOrder,ApartmentOrder,BunchOrder,TablesName,Admin
from fastapi.middleware.cors import CORSMiddleware

from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pathlib import Path



app=FastAPI()



origins=["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


models.Base.metadata.create_all(bind=engine)
app.include_router(Admin.router)
app.include_router(User.router)
app.include_router(Apartment.router)
app.include_router(Bunch.router)
app.include_router(Accessory.router)
app.include_router(auth.router)
app.include_router(ApartmentOrder.router)
app.include_router(BunchOrder.router)
app.include_router(AccessoryOrder.router)
app.include_router(TablesName.router)

@app.get("/")
def root():
    return {"message": "hello world"}


