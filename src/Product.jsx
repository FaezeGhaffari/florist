import React, { useContext, useState, createContext, useEffect } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import four from "./images/4.jpg"
import "./product.css"

function Product() {
    const [token, setToken] = useContext(UseContext);
    const [load,setLoad]=useState(0)
    const [image,setImage]=useState("")
    const [loc,setLoc]=useState("")
    const [data,setData]=useState(null)
    
    let pro_id=0
    let img=""
    let photo=""
    let pname=""
    let inventory=0
    let price=0
    let content=""

  function updateProfilePicture(event) {
    console.log("edit")
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result)
        console.log(e.target.result)
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  function closeForm() {
    document.getElementById("nameinput").value=""
    document.getElementById("contentinput").value=""
    document.getElementById("inventoryinput").value=""
    document.getElementById("priceinput").value=""
  //  document.getElementById("fileinput").files=""
    document.getElementById("changeForm").style.display = "none";
}

  async function fetchAdd(){
    let name=document.getElementById("nameinput").value
    let content=document.getElementById("contentinput").value
    let inventory=document.getElementById("inventoryinput").value
    let price=document.getElementById("priceinput").value
    const requests = {
      method: "POST",
      headers: {'Content-Type': 'application/json', Authorization: "Bearer " + token },
      body: JSON.stringify({
        "name":name,
        "content":content,
        "inventory":Number(inventory),
        "price":Number(price),
        "image":image
      })
  };
  const response = await fetch(`http://127.0.0.1:8000/${loc.toLowerCase()}/`, requests)
  setLoad(1)
  closeForm()
  }
  const addflower=()=>{
    document.getElementById("changeForm").style.display = "block";
  }

  const saveAdd =()=>{
    fetchAdd()
  }

  async function fetchdata(){
    const requests = {
      method: "GET",
  };
    const response=await fetch(`http://127.0.0.1:8000/${loc.toLowerCase()}/`,requests)
    const dt=await response.json()
    console.log(dt)
    setData(dt)
    setLoad(0)
   
  }
  async function fetchDelete(id){
    const requests = {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
  };
    const response=await fetch(`http://127.0.0.1:8000/${loc.toLowerCase()}/${id}`,requests)
    setLoad(1)
   
  }

  const deleteFlower=(id)=>{
       fetchDelete(id)
  }

  function closeFormu() {
    pro_id=0
    photo=""
    img=""
    document.getElementById("changeForm1").style.display = "none";
}

function updatePro(event) {
  console.log("edit")
  const input = event.target;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photo=e.target.result
      console.log(e.target.result)
    };
    reader.readAsDataURL(input.files[0]);
  }
}
async function fetchUpdate(){
    let name=document.getElementById("unameinput").value
    let content=document.getElementById("ucontentinput").value
    let inventory=document.getElementById("uinventoryinput").value
    let price=document.getElementById("upriceinput").value
    let Image=photo
    if(photo==""){
      console.log(img,"iiimmmg")
      Image=img
    }
    console.log(pro_id,Image,"uuuuu")
    const requests = {
      method: "PUT",
      headers: {'Content-Type': 'application/json', Authorization: "Bearer " + token },
      body: JSON.stringify({
        "name":name,
        "content":content,
        "inventory":Number(inventory),
        "price":Number(price),
        "image":Image
      })
  };
  const response = await fetch(`http://127.0.0.1:8000/${loc.toLowerCase()}/${pro_id}`, requests)
  console.log("yeeesss")
  setLoad(1)
  closeFormu()
}
 const saveUpdate=()=>{
     fetchUpdate()
 }
  
  const updateFlower=(id,name,content,inventory,price,im)=>{
    pro_id=id
    img=im
    document.getElementById("unameinput").value=name
    document.getElementById("ucontentinput").value=content
    document.getElementById("uinventoryinput").value=inventory
    document.getElementById("upriceinput").value=price
    document.getElementById("changeForm1").style.display = "block";

  }


  function openForm(idc, nm, im, inv, pr, co) {
   
    pro_id = idc
    pname = nm
    img = im
    inventory = inv
    price = pr
    content = co
    console.log(img)
    document.getElementById("pimage").src=img
    document.getElementById("pname").innerHTML = pname
    document.getElementById("pname").style.color = "#562646"
    document.getElementById("pcontent").innerHTML = content
    document.getElementById("pinventory").innerHTML = "inventory: " + inventory
    document.getElementById("pinventory").style.color = "#562646"
    document.getElementById("pprice").innerHTML = "Price: $" + price
    document.getElementById("pprice").style.color = "#562646"
    document.getElementById("productcard").style.display = "block";
}

function closeFormP() {

    document.getElementById("productcard").style.display = "none";
}



   useEffect(()=>{
    
    if(loc===""){
      let l=window.location.href.split("/")
      console.log(l[l.length-1])
      setLoc(l[l.length-1])
    }
    if(data===null && loc!==""){
        fetchdata()
    }
    if(load ===1){
      fetchdata()
  }

    
   },[loc,data,load])
    return (
        <div className="productbody"style={{width:"100%"}}>
           <div class="add-flower-container" style={{paddingTop:"2rem"}}>
      
      <div class="add-category-container">
         <h1>{loc}</h1>
         <button onClick={addflower} class="update-flower">Add Flower</button>
      </div>
      </div>
  
<div class="containerr" style={{width:"100%",padding:"2rem"}}>

   
 

   

      {data!==null && data!=0 && <div class="products-container" style={{width:"100%"}}>{data.map((d)=>{
        return(
          <div class="product" data-name="p-1" style={{width:"23rem",float:"left",height:"37rem"}}>
         <img src={d.image} alt="" onClick={()=>openForm(d.id, d.name, d.image, d.inventory, d.price, d.content)} style={{width:"16rem"}}/>
         <h3>{d.name}</h3>
         <div>
           <button onClick={()=>updateFlower(d.id,d.name,d.content,d.inventory,d.price,d.image)} class="update-flower">update flower</button>
            <button onClick={()=>deleteFlower(d.id)} class="delete-flower">Delete flower</button>
            </div>
      </div>
        )
      })}</div>}
      

   

</div>


<div class="form-popup" id="changeForm" style={{height:"36rem"}}>
                <form class="form-container">
                    <h3 style={{ color: "#d3b2b2" }}>Add Product</h3>
                    <i onClick={closeForm} id="closeedit" class="bi bi-x-lg fixed-top" style={{ marginLeft: "22rem", marginTop: "1rem", fontSize: "23px" }}></i>
                    <div style={{ width: "100%" }}>
                    <label id="itemname" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Name</b></label>
                        <input type="text" class="form-control" id="nameinput" placeholder="name" aria-label="name"></input>

                        <label id="itemcontent" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Content</b></label> 
                        <input type="text" class="form-control" id="contentinput" placeholder="content" aria-label="content"></input>

                        <label id="iteminventory" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Inventory</b></label>
                        <input type="text" class="form-control" id="inventoryinput" placeholder="inventory" aria-label="inventory"></input>

                        <label id="itemprice" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Price</b></label>
                        <input type="text" class="form-control" id="priceinput" placeholder="price:$" aria-label="price"></input>

                        <label id="itemimage" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Image</b></label>
                        <input  onChange={(e) => updateProfilePicture(e)} type="file" class="form-control" id="fileinput"  aria-label="file"></input>
                   </div>


                    <button onClick={saveAdd} type="button" class="btn" id="savebtn" >Add Product</button>
                </form>
            </div>


            <div class="form-popup" id="changeForm1" style={{height:"36rem"}}>
                <form class="form-container">
                    <h3 style={{ color: "#d3b2b2" }}>Update Product</h3>
                    <i onClick={closeFormu} id="closeedit" class="bi bi-x-lg fixed-top" style={{ marginLeft: "22rem", marginTop: "1rem", fontSize: "23px" }}></i>
                    <div style={{ width: "100%" }}>
                    <label id="itemname" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Name</b></label>
                        <input type="text" class="form-control" id="unameinput" placeholder="name" aria-label="name"></input>

                        <label id="itemcontent" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Content</b></label> 
                        <input type="text" class="form-control" id="ucontentinput" placeholder="content" aria-label="content"></input>

                        <label id="iteminventory" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Inventory</b></label>
                        <input type="text" class="form-control" id="uinventoryinput" placeholder="inventory" aria-label="inventory"></input>

                        <label id="itemprice" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Price</b></label>
                        <input type="text" class="form-control" id="upriceinput" placeholder="price:$" aria-label="price"></input>

                        <label id="itemimage" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Image</b></label>
                        <input  onChange={(e) => updatePro(e)} type="file" class="form-control" id="fileinput"  aria-label="file"></input>
                   </div>


                    <button onClick={saveUpdate} type="button" class="btn" id="savebtn" >Update Product</button>
                </form>
            </div>

            <div id="productcard" class="card mb-3" style={{ maxWidth: "550px", marginTop: "5rem", height: "55%", overflow: "hidden" }}>
                <div class="row g-0" style={{ height: "100%" }}>
                    <div class="col-md-4">
                        <img id="pimage" src={img} class="img-fluid rounded-start" alt="..." style={{ height: "90%" }} />
                    </div>
                    <div class="col-md-8" style={{ height: "100%", textAlign: "center" }}>
                        <i onClick={closeFormP} id="closeedit" class="bi bi-x-lg fixed-top" style={{ marginLeft: "30rem", marginTop: "1rem", fontSize: "23px" }}></i>
                        <div class="card-body p-5" style={{ height: "83%" }}>
                            <h3 id="pname" class="card-title mt-4" style={{fontWeight:"bold"}}></h3>
                            <p id="pcontent" class="card-text mt-3" style={{fontWeight:"bold"}}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p id="pinventory" class="card-text" style={{fontWeight:"bold"}}><small class="text-muted">inventory: </small></p>
                            <p id="pprice" class="card-text" style={{fontWeight:"bold"}}><small class="text-muted" style={{ color: "$562646" }}>Price: $</small></p>
                        </div>
                       
                    </div>
                </div>
            </div>
            

        </div>
    );
}

export default Product;