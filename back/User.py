from fastapi import status,HTTPException,Depends,APIRouter
from sqlalchemy.orm import Session
import models,schemas,utils,oauth2
from database import get_db
from typing import List,Optional



router= APIRouter(
    tags=['Users']
)

@router.post("/users",status_code=status.HTTP_201_CREATED, response_model=schemas.Token)
def create_user(user: schemas.UserCreate, db :Session=Depends(get_db)):

    hashed_password= utils.hash(user.password)
    user.password=hashed_password

    new_user=models.User(**user.dict())

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token= oauth2.create_access_token(data={"user_id": new_user.id})

    return {"access_token": access_token, "token_type":"bearer"}

##############
@router.get("/users/you")
def get_you(db :Session=Depends(get_db),current_user =Depends(oauth2.get_current_user)):

    user=db.query(models.User).filter(models.User.id == current_user.id).first()
    return user


@router.get("/users/search")
def get_user(db :Session=Depends(get_db),current_user =Depends(oauth2.get_current_user),search: Optional[str]=""):

    user=db.query(models.User).filter(models.User.email.contains(search)).all()
    return user



@router.put("/{id}",response_model=schemas.UserOut)
def update_user(id:int,post: schemas.UserUpdate, db : Session= Depends(get_db),current_user =Depends(oauth2.get_current_user)):

    
    old_post= db.query(models.User).filter(id == models.User.id)
    new_post=old_post.first()
    
    
    if new_post== None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"User with id:{id} doesnt exist.")
    
    if current_user.id != id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"Not authorized to perform requested action")
    
    old_post.update(post.dict(),synchronize_session=False)
    db.commit()
    
    return new_post