from fastapi import FastAPI,Response,status,HTTPException,Depends,APIRouter,UploadFile,File
from sqlalchemy.orm import Session
from typing import List,Optional
from sqlalchemy import func

import models,schemas,oauth2
from database import get_db
#from ..database import get_db






router = APIRouter(
    prefix="/tablesname",
    tags=['TablesName']
)

@router.get("/",response_model=List[schemas.TablesNameOut])
def get_table(db: Session= Depends(get_db),limit: int =10, skip: int =0, search: Optional[str]=""):


    #results=db.query(models.Post).filter(models.Post.title.contains(search)).limit(limit).offset(skip).all()

    results= db.query(models.TablesName).filter(models.TablesName.name.contains(search)).all()

   # results= db.query(models.Post, (models.User.id).label("user_id")).join(models.User,models.User.id == models.Post.id, isouter=True).all()
    
    #results= db.query(models.Post).all()
    
    return results

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.TablesNameOut)
def create_table(post: schemas.TablesNameCreate, db : Session= Depends(get_db),current_user =Depends(oauth2.get_current_user)):

    
    new_post= models.TablesName(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
  
    return new_post





#################
#@router.get("/{id}",response_model=List[schemas.BunchOut])
#def get_bunch_id( id:int, db: Session= Depends(get_db),limit: int =10, skip: int =0, search: Optional[str]=""):

#    results= db.query(models.Bunch).filter(id == models.Bunch.id).all()
    
#    return results


@router.delete("/{id}")
def delete_tablesname(id:int, db : Session= Depends(get_db),current_user =Depends(oauth2.get_current_user)):

    
    old_post= db.query(models.TablesName).filter(id == models.TablesName.id)
    new_post=old_post.first()

    
    if new_post== None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"Table with id:{id} doesnt exist.")
    
    if current_user.email != "mohaddeseghaffari80@gmail.com":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"Not authorized to perform requested action")
    
    old_post.delete(synchronize_session=False)
    db.commit()
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)