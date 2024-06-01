from fastapi import FastAPI, Response,status,HTTPException,Depends,APIRouter
from sqlalchemy.orm import Session
from typing import List,Optional

import schemas,database,models,oauth2

router= APIRouter(
    prefix="/apartmentorder",
    tags=['ApartmentOrder']
)

@router.post("/",status_code=status.HTTP_201_CREATED)
def cteate_order(vote: schemas.ApartmentOrderCreate, db: Session= Depends(database.get_db),current_user =Depends(oauth2.get_current_user)):


    post= db.query(models.Apartment).filter(models.Apartment.id == vote.apartment_id).first()

    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id: {vote.apartment_id} doesnt exist")

    vote_query= db.query(models.ApartmentOrder).filter(models.ApartmentOrder.apartment_id == vote.apartment_id, models.ApartmentOrder.user_id == current_user.id)
    found_vote= vote_query.first()

    
    if found_vote:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"user {current_user.id} has already order on product {vote.apartment_id}")

    new_vote= models.ApartmentOrder(apartment_price=post.price,total_price=vote.count*post.price,apartment_id=vote.apartment_id, user_id=current_user.id,user_name=current_user.username,user_email=current_user.email,user_address=current_user.address,user_phone=current_user.phone_number,apartment_name=post.name,apartment_content=post.content,apartment_image=post.image,count=vote.count)
    db.add(new_vote)
    db.commit()
    return {"message":"successfully commit order"}
    
    

@router.get("/",response_model=List[schemas.ApartmentOrderOut])
def get_apartmentorder(db: Session= Depends(database.get_db),limit: int =10, skip: int =0, search: Optional[str]="",current_user =Depends(oauth2.get_current_user)):


    #results=db.query(models.Post).filter(models.Post.title.contains(search)).limit(limit).offset(skip).all()
    old_admin= db.query(models.Admin).filter(current_user.email == models.Admin.email).first()
    if not old_admin==None:
        results= db.query(models.ApartmentOrder).all()
        return results
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"Not authorized to perform requested action")
   # results= db.query(models.Post, (models.User.id).label("user_id")).join(models.User,models.User.id == models.Post.id, isouter=True).all()
    
    #results= db.query(models.Post).all()
    
    

@router.get("/yourorder",response_model=List[schemas.ApartmentOrderOut])
def get_order(db: Session= Depends(database.get_db),current_user =Depends(oauth2.get_current_user)):

    votes= db.query(models.ApartmentOrder).filter(models.ApartmentOrder.user_id == current_user.id).all()
    return votes



@router.put("/{id}",response_model=schemas.ApartmentOrderOut)
def update_apartment(id:int,post: schemas.ApartmentOrderCreate, db : Session= Depends(database.get_db),current_user =Depends(oauth2.get_current_user)):

    
    old_post= db.query(models.ApartmentOrder).filter(id == models.ApartmentOrder.apartment_id,current_user.id==models.ApartmentOrder.user_id)
    new_post=old_post.first()
    
    post=post.dict()
    post["total_price"]=post["count"]*new_post.apartment_price
    
    if new_post== None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"order with id:{id} doesnt exist.")
    
    if current_user.id != new_post.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"Not authorized to perform requested action")
    
    old_post.update(post,synchronize_session=False)
    db.commit()
    
    return new_post


@router.delete("/{id}")
def delete_apartment(id:int, db : Session= Depends(database.get_db),current_user =Depends(oauth2.get_current_user)):

    
    old_post= db.query(models.ApartmentOrder).filter(id == models.ApartmentOrder.apartment_id,current_user.id==models.ApartmentOrder.user_id)
    new_post=old_post.first()

    
    if new_post== None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"order with id:{id} doesnt exist.")
    
    if current_user.id != new_post.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"Not authorized to perform requested action")
    
    old_post.delete(synchronize_session=False)
    db.commit()
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)