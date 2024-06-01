from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

from pydantic.types import conint

class Apartment(BaseModel):
    name: str
    content: str
    inventory: int
    price:int
    image: str

class ApartmentCreate(Apartment):
    pass

class ApartmentOut(Apartment):
    id: int
    created_at: datetime

    class Config:
        from_attributes= True



class Bunch(BaseModel):
    name: str
    content: str
    inventory: int
    price:int
    image: str

class BunchCreate(Bunch):
    pass

class BunchOut(Bunch):
    id: int
    created_at: datetime

    class Config:
        from_attributes= True



class Accessory(BaseModel):
    name: str
    content: str
    inventory: int
    price:int
    image: str

class AccessoryCreate(Accessory):
    pass

class AccessoryOut(Accessory):
    id: int
    created_at: datetime

    class Config:
        from_attributes= True



class UserCreate(BaseModel):
    profile:str
    username: str
    email: EmailStr
    address: str
    phone_number:str
    password: str

class UserUpdate(BaseModel):
    profile:str
    username: str
    email: EmailStr
    address: str
    phone_number:str


class UserOut(BaseModel):
    id : int
    username: str
    email: EmailStr
    address: str
    phone_number:str

    class Config:
        from_attribute= True



class ApartmentOrderCreate(BaseModel):
    apartment_id: int
    count : int


class ApartmentOrderOut(BaseModel):
    user_id : int
    user_name: str
    user_email: EmailStr
    user_address: str
    user_phone:str
    apartment_id: int
    apartment_name:str
    apartment_content:str
    apartment_image:str
    apartment_price: int
    count : int
    total_price:int

    class Config:
        from_attribute= True


class BunchOrderCreate(BaseModel):
    bunch_id: int
    count : int


class BunchOrderOut(BaseModel):
    user_id : int
    user_name: str
    user_email: EmailStr
    user_address: str
    user_phone:str
    bunch_id: int
    bunch_name:str
    bunch_content:str
    bunch_image:str
    bunch_price: int
    count : int
    total_price:int

    class Config:
        from_attribute= True


class AccessoryOrderCreate(BaseModel):
    accessory_id: int
    count : int


class AccessoryOrderOut(BaseModel):
    user_id : int
    user_name: str
    user_email: EmailStr
    user_address: str
    user_phone:str
    accessory_id: int
    accessory_name:str
    accessory_content:str
    accessory_image:str
    accessory_price: int
    count : int
    total_price:int

    class Config:
        from_attribute= True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id : Optional[int] =None



class TablesNameCreate(BaseModel):
    name:str
    image:str


class TablesNameOut(BaseModel):
    id: int
    name:str
    image:str

    class Config:
        from_attribute= True


class AdminCreate(BaseModel):
    email:str


class AdminOut(BaseModel):
    #id: int
    email:str
    image:str

    class Config:
        from_attribute= True