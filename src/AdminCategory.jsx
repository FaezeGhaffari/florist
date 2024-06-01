import React, { useContext, useState, createContext, useEffect } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./admincategory.css"
import mainlogo from "./images/mainlogo.png"
import four from "./images/4.jpg"
import Load from "./load";


function AdminCategory() {
    const [token, setToken] = useContext(UseContext);
    const [category, setCategory] = useState(null);
    const [load,setLoad]=useState(0)

    const [image,setImage]=useState("")
 
    function closeForm() {
        document.getElementById("nameinput").value=""
      //  document.getElementById("fileinput").files=""
        document.getElementById("changeForm").style.display = "none";
    }

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
    
    async function fetchAdd(name) {
        const requests = {
            method: "POST",
            headers: { 'Content-Type': 'application/json',Authorization: "Bearer " + token },
            body: JSON.stringify({
                "name": name,
                "image": image
            }),
        };
        const response = await fetch(`http://127.0.0.1:8000/tablesname/`, requests)
        closeForm()
        setLoad(1)

    }
    function savechange(){
        let name=document.getElementById("nameinput").value
        console.log(name)
        fetchAdd(name)
    }
    const addCategory=()=>{
        document.getElementById("changeForm").style.display = "block";
    }

    async function fetchDelete(id) {
        const requests = {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token },
        };
        const response = await fetch(`http://127.0.0.1:8000/tablesname/${id}`, requests)
        
        setLoad(1)

    }
    const deletecategory=(id)=>{
        console.log(id)
        fetchDelete(id)
    }

    async function fetchCategory() {
        const requests = {
            method: "GET",

        };
        const response = await fetch(`http://127.0.0.1:8000/tablesname/`, requests)
        const data = await response.json()
        
        setCategory(data)
        setLoad(0)
        console.log(data)

    }
    useEffect(() => {

        if (token && category === null) {
            fetchCategory()
        }
        if(load ===1){
            fetchCategory()
        }

    }, [category,load]);

    // <button className="updatecategory" style={{ float: "left", marginLeft: "1rem", borderRadius: "1rem" }}>Update</button>

    return (
        <div className="admincategorybody" style={{width:"100%",height:"auto"}}>
            <div class="add-category-container">

                <div>
                    <h1>Manage Category</h1>
                    <button class="add-category" onClick={addCategory}>Add Category</button>
                </div>
            </div>

            <div class="containerr" style={{width:"100%",padding:"2rem"}}>

                {category !== null && category != 0 && <div class="products-container" style={{width:"100%"}}>{category.map((c) => {
                    return(
          <div class="product" data-name="p-1" style={{width:"23rem",float:"left",height:"37rem"}}>
         <img src={c.image} alt="" onClick={()=>window.location.href=`/product/${c.name}`} style={{width:"16rem"}}/>
         <h3>{c.name}</h3>
         <div>
            <button onClick={()=>deletecategory(c.id)} class="delete-flower">Delete Category</button>
            </div>
      </div>
        )
      })}</div>}








            </div>


            <div class="form-popup" id="changeForm">
                <form class="form-container">
                    <h3 style={{ color: "#d3b2b2" }}>Add Category</h3>
                    <i onClick={closeForm} id="closeedit" class="bi bi-x-lg fixed-top" style={{ marginLeft: "22rem", marginTop: "1rem", fontSize: "23px" }}></i>
                    <label id="itemname" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Name</b></label>
                    <div style={{ width: "100%" }}>
                        
                        <input type="text" class="form-control" id="nameinput" placeholder="name" aria-label="name"></input>
                        <label id="itemname" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Image</b></label>
                        <input  onChange={(e) => updateProfilePicture(e)} type="file" class="form-control" id="fileinput"  aria-label="file"></input>
                   </div>


                    <button onClick={savechange} type="button" class="btn" id="savebtn" >Save Changes</button>
                </form>
            </div>


        </div>


    );
}

export default AdminCategory;