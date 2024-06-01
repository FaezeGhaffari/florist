from fastapi import status,HTTPException,Depends,APIRouter,Response
from sqlalchemy.orm import Session
import models,schemas,utils,oauth2
from database import get_db
from typing import List,Optional



router= APIRouter(
    tags=['Admins']
)

@router.post("/admin",status_code=status.HTTP_201_CREATED, response_model=schemas.AdminOut)
def create_admin(user: schemas.AdminCreate, db :Session=Depends(get_db),current_user =Depends(oauth2.get_current_user)):

    
    old_post= db.query(models.Admin).filter(current_user.email == models.Admin.email).first()
    old_user=db.query(models.User).filter(user.email == models.User.email).first()
    if not (old_post==None and old_user==None):
        new_user=models.Admin(**user.dict(),image=old_user.profile)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    
        return new_user
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"Not authorized to perform requested action")

    

##############
@router.get("/admin/you")
def get_you(db :Session=Depends(get_db),current_user =Depends(oauth2.get_current_user)):

    user=db.query(models.Admin).filter(models.Admin.email == current_user.email).first()
    if user:
        return user
    else:
        return []



@router.get("/admin")
def get_admin(db :Session=Depends(get_db),current_user =Depends(oauth2.get_current_user),search: Optional[str]=""):

    user=db.query(models.Admin).filter(models.Admin.email.contains(search)).all()
    return user



@router.put("/admin/{email}",response_model=schemas.AdminOut)
def update_admin(email:str,post: schemas.AdminCreate, db : Session= Depends(get_db),current_user =Depends(oauth2.get_current_user)):

    
    old_post= db.query(models.Admin).filter(email == models.Admin.email)
    new_post=old_post.first()
    
    old_admin= db.query(models.Admin).filter(current_user.email == models.Admin.email).first()
    
    if new_post== None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"User with email:{email} doesnt exist.")
    
    if old_admin==None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"Not authorized to perform requested action")
    
    old_post.update(post.dict(),synchronize_session=False)
    db.commit()
    
    return new_post



@router.delete("/admin/{email}")
def delete_admin(email:str, db : Session= Depends(get_db),current_user =Depends(oauth2.get_current_user)):

    
    old_post= db.query(models.Admin).filter(email == models.Admin.email)
    new_post=old_post.first()

    
    if new_post== None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"product with email:{email} doesnt exist.")
    
    if current_user.email != "mohaddeseghaffari80@gmail.com":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"Not authorized to perform requested action")
    
    old_post.delete(synchronize_session=False)
    db.commit()
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)