import React, { useState, useContext, useEffect } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./yourorders.css"
import four from "./images/4.jpg"

function Contact() {
   
    const [token, setToken] = useContext(UseContext);
    const [admins, setAdmins] = useState(null)

    const openNav = () => {
        console.log("hi")
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        // document.body.style.backgroundColor = "#818181";
    }

    const closeNav = () => {
        console.log("close")
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        //document.body.style.backgroundColor = "white";
    }

    async function fetchAdmins() {
        const requests = {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        };
        const response = await fetch(`http://127.0.0.1:8000/admin`, requests)
        const data = await response.json()
        setAdmins(data)
      
    }
    useEffect(() => {
        console.log(admins)
        if (token && admins === null) {
            fetchAdmins()
        }

    }, [admins])

    return (
        <div style={{ width: "100%", height: "100%" }}>

            <div id="mySidenav" class="sidenav">
                <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
                <a id="home" onClick={()=>window.location.href="/home/"}>Home</a>
                <a href="/categories">Categories</a>
            </div>

            <div id="main" style={{ backgroundColor: "#562646", width: "100%", justifyContent: "center", justifyItems: "center" }}>
                <span style={{ fontSize: "30px", cursor: "pointer", float: "left", color: "white" }} onClick={openNav}>&#9776;</span>
                <h2 style={{  color: "white" ,marginRight:"6rem",fontSize:"3rem"}}>Contact</h2>
            </div>

            
            {admins!=null && admins !=0 && <div style={{width:"100%",height:"auto"}}>{admins.map((a)=>{
                return(
                    <div class="cart-item" style={{width:"23rem",borderRadius:"10rem",float:"left",marginLeft:"12rem"}}>
            <div className="adminpro" style={{ marginLeft: "0.5rem", marginTop: "0.5rem", width: "5rem", height: "5rem", float: "left" }}><img style={{ borderRadius: "10rem", width: "90%", height: "90%" }} src={a.image} /></div>

                        <div class="item-details" style={{width:"20rem"}}>
                            <h5 style={{fontSize:"15px"}}>{a.email}</h5>
                        </div>
            </div>
                )
            })}</div>}
            
            
        

        </div>


    );
}

export default Contact;