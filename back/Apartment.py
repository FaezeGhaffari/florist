from fastapi import FastAPI,Response,status,HTTPException,Depends,APIRouter,UploadFile,File
from sqlalchemy.orm import Session
from typing import List,Optional
from sqlalchemy import func

import models,schemas,oauth2
from database import get_db
#from ..database import get_db






router = APIRouter(
    prefix="/apartment",
    tags=['Apartment']
)

@router.get("/",response_model=List[schemas.ApartmentOut])
def get_apartment(db: Session= Depends(get_db),limit: int =10, skip: int =0, search: Optional[str]=""):


    #results=db.query(models.Post).filter(models.Post.title.contains(search)).limit(limit).offset(skip).all()

    results= db.query(models.Apartment).filter(models.Apartment.name.contains(search)).all()

   # results= db.query(models.Post, (models.User.id).label("user_id")).join(models.User,models.User.id == models.Post.id, isouter=True).all()
    
    #results= db.query(models.Post).all()
    
    return results

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.ApartmentOut)
def create_apartment(post: schemas.ApartmentCreate, db : Session= Depends(get_db),current_user =Depends(oauth2.get_current_user)):

    old_admin= db.query(models.Admin).filter(current_user.email == models.Admin.email).first()

    if not old_admin==None:
        new_post= models.Apartment(**post.dict())
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
  
        return new_post
    
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"Not authorized to perform requested action")
    





#################
@router.get("/{id}",response_model=schemas.ApartmentOut)
def get_apartment_id( id:int, db: Session= Depends(get_db),limit: int =10, skip: int =0, search: Optional[str]=""):

    results= db.query(models.Apartment).filter(id == models.Apartment.id).first()
    
    return results



@router.put("/{id}",response_model=schemas.ApartmentOut)
def update_apartment(id:int,post: schemas.ApartmentCreate, db : Session= Depends(get_db),current_user =Depends(oauth2.get_current_user)):

    
    old_post= db.query(models.Apartment).filter(id == models.Apartment.id)
    new_post=old_post.first()

    
    if new_post== None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"product with id:{id} doesnt exist.")
    
    if current_user.email != "mohaddeseghaffari80@gmail.com":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"Not authorized to perform requested action")
    
    old_post.update(post.dict(),synchronize_session=False)
    db.commit()
    
    return new_post


@router.delete("/{id}")
def delete_apartment(id:int, db : Session= Depends(get_db),current_user =Depends(oauth2.get_current_user)):

    
    old_post= db.query(models.Apartment).filter(id == models.Apartment.id)
    new_post=old_post.first()

    
    if new_post== None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"product with id:{id} doesnt exist.")
    
    if current_user.email != "mohaddeseghaffari80@gmail.com":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"Not authorized to perform requested action")
    
    old_post.delete(synchronize_session=False)
    db.commit()
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)