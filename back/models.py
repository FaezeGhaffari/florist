from sqlalchemy import Column,Integer,String,Boolean,ForeignKey
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import relationship
from database import Base

class Apartment(Base):
    __tablename__="apartment"

    id=Column(Integer, primary_key=True,nullable=False)
    name= Column(String,nullable=False)
    content= Column(String,nullable=False)
    created_at= Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('now()'))
    inventory=Column(Integer,nullable=False)
    price=Column(Integer,nullable=False)
    image= Column(String,nullable=False)
 #   user_id= Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),nullable=False)
    

class Bunch(Base):
    __tablename__="bunch"

    id=Column(Integer, primary_key=True,nullable=False)
    name= Column(String,nullable=False)
    content= Column(String,nullable=False)
    created_at= Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('now()'))
    inventory=Column(Integer,nullable=False)
    price=Column(Integer,nullable=False)
    image= Column(String,nullable=False)


class Accessory(Base):
    __tablename__="accessory"

    id=Column(Integer, primary_key=True,nullable=False)
    name= Column(String,nullable=False)
    content= Column(String,nullable=False)
    created_at= Column(TIMESTAMP(timezone=True),nullable=False,server_default=text('now()'))
    inventory=Column(Integer,nullable=False)
    price=Column(Integer,nullable=False)
    image= Column(String,nullable=False)

class User(Base):
    __tablename__= "users"
    id = Column(Integer, primary_key=True,nullable=False)
    profile=Column(String,nullable=False)
    username=Column(String,nullable=False)
    email=Column(String,nullable=False, unique=True)
    address=Column(String,nullable=False)
    phone_number=Column(String,nullable=False, unique=True)
    password= Column(String , nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    


class ApartmentOrder(Base):
    __tablename__="apartmentorders"
    user_id= Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),primary_key=True)
    user_name= Column(String,nullable=False)
    user_email= Column(String,nullable=False)
    user_address= Column(String,nullable=False)
    user_phone= Column(String,nullable=False)
    apartment_id=Column(Integer,ForeignKey("apartment.id",ondelete="CASCADE"),primary_key=True)
    apartment_name= Column(String,nullable=False)
    apartment_content= Column(String,nullable=False)
    apartment_image= Column(String,nullable=False)
    apartment_price= Column(Integer,nullable=False)
    count=Column(Integer,nullable=False)
    total_price=Column(Integer,nullable=False)


class BunchOrder(Base):
    __tablename__="bunchorders"
    user_id= Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),primary_key=True)
    user_name= Column(String,nullable=False)
    user_email= Column(String,nullable=False)
    user_address= Column(String,nullable=False)
    user_phone= Column(String,nullable=False)
    bunch_id=Column(Integer,ForeignKey("bunch.id",ondelete="CASCADE"),primary_key=True,nullable=False)
    bunch_name= Column(String,nullable=False)
    bunch_content= Column(String,nullable=False)
    bunch_image= Column(String,nullable=False)
    bunch_price= Column(Integer,nullable=False)
    count=Column(Integer,nullable=False)
    total_price=Column(Integer,nullable=False)



class AccessoryOrder(Base):
    __tablename__="accessoryorders"
    user_id= Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),primary_key=True)
    user_name= Column(String,nullable=False)
    user_email= Column(String,nullable=False)
    user_address= Column(String,nullable=False)
    user_phone= Column(String,nullable=False)
    accessory_id=Column(Integer,ForeignKey("accessory.id",ondelete="CASCADE"),primary_key=True,nullable=False)
    accessory_name= Column(String,nullable=False)
    accessory_content= Column(String,nullable=False)
    accessory_image= Column(String,nullable=False)
    accessory_price= Column(Integer,nullable=False)
    count=Column(Integer,nullable=False)
    total_price=Column(Integer,nullable=False)


class TablesName(Base):
    __tablename__="tablesname"

    id=Column(Integer, primary_key=True,nullable=False)
    name= Column(String,nullable=False)
    image=Column(String,nullable=False)



class Admin(Base):
    __tablename__= "admins"
   # id = Column(Integer, primary_key=True,nullable=False)
    email= Column(String,ForeignKey("users.email",ondelete="CASCADE"),primary_key=True)
    image=Column(String,nullable=False)