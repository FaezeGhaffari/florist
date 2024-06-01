import React, { useContext,useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UseContext } from "./App";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./home.css"
import seven from "./images/7.png"
import one from "./images/1.jpg"
import two from "./images/2.jpg"
import three from "./images/3.jpg"
import four from "./images/4.jpg"
import merged2 from "./images/merged2.png"
import facebook from "./images/facebook.png"
import instagram from "./images/instagram.png"
import youtube from "./images/youtube.png"
import mainlogo from "./images/mainlogo.png"

const Home = () => {
  const [token, setToken,badge,setBadge] = useContext(UseContext);
  
  const [email,setEmail]=useState(null)
  const [re,setRe]=useState(0)
  
  
  
  async function fetchAdmin(){
    const requests = {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    };
    const response = await fetch(`http://127.0.0.1:8000/admin/you`, requests)
    const data = await response.json()
    console.log(data)
    setEmail(data.email)
    console.log(data.email)
    console.log(data.email === undefined,"nulll")
   
    
   
  }
  useEffect(() => {
    console.log(badge,"badge")
    console.log(token,"token")
    console.log(document.referrer,"sayyyy")
    console.log(window.location.href)
    console.log(window.performance.getEntriesByType("navigation")[0].type);
    const perform = window.performance.getEntriesByType("navigation")[0].type;
    if (perform) {
        if (token && perform === "navigate" && window.location.href!=="http://localhost:3000/home/") {
            localStorage.removeItem("token");
            localStorage.removeItem("badge");
            window.location.reload();

        }
    }
    if(token && email===null){
      fetchAdmin()
    }

    //if(perform==="back_forward"){
     // console.log("looooooo")
    //  setRe(1)
   //   window.location.reload()
    
   // }
   if(badge==null){
    localStorage.setItem("badge",0)
    setBadge(0)
   }
   
   

},[email,re,badge]);
  return (

    <div>
     
      <header className="header">
        <div class="main-div">
          <div class="title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-flower3"
              viewBox="0 0 16 16"
            >
            </svg>
            smpsm flower shop

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-flower3"
              viewBox="0 0 16 16"
            >
            </svg>
          </div>

          <div class="logo">
            <div class="inter" style={{ paddingTop: "50px" }}>
            {token && email!==0 && email!==undefined && <a href="http://localhost:3000/adminpage" class="login1">Admin</a>}
            {token && email===undefined && <a href="http://localhost:3000/myaccount" class="login1">My Account</a>}
              <a href="http://localhost:3000/login" class="login1">Login</a>
              <a href="http://localhost:3000/registerpage" class="login1">Signup</a>
              <a href="http://localhost:3000/yourorders" class="login1 position-relative"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
              </svg><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {badge}
    <span class="visually-hidden">unread messages</span>
  </span></a>
            </div>
            <div class="pdiv" style={{ width: "100%", textAlign: "center" }}>
              <p class="welcome">Welcome to our florist...</p>
            </div>
          </div>

          <div class="sec-nav">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item active">
                    <a class="nav-link" href="#"
                    >Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/categories">Categories</a>
                  </li>
                  
                  <li class="nav-item">
                    <a class="nav-link" href="/contact">Contact</a>
                  </li>
                 
                </ul>
              </div>
            </nav>
          </div>
          <div class="mainImg">
            <img class="mainphoto" src={seven} alt="mainphotoFlower" />
          </div>
          <div class="featuresClass">
            <span>featured products</span>
          </div>
          <div class="flexPhotoes">
            <img class="fpdoimg" src={one} alt="" />
            <img class="fpdoimg" src={two} alt="" />
            <img class="fpdoimg" src={three} alt="" />
            <img class="fpdoimg" src={four} alt="" />
          </div>
        </div>
        <div class="middlePc">
          <img src={merged2} alt="" />
        </div>
      </header>


      <footer class="footer">
        <div class="footer1">
          <p class="happySpan">Happy to see you...</p>
          <div class="join">
            <p class="joinp">join us on </p>
            <ul class="icons">
              <li class="icon-items"><abbr title="facebook"><img src={facebook} width="46" height="46"></img></abbr></li>
              <li class="icon-items"><abbr title="instagram"><img src={instagram} width="46" height="46" /></abbr></li>
              <li class="icon-items"><abbr title="youtube"><img src={youtube} width="46" height="46" /></abbr></li>
            </ul>
          </div>
        </div>
        <div class="footerlogo">
          <img class="footimg" src={mainlogo} alt="smpsm" />
          <div class="quote">
            <p >Every time you look at these flowers know that someone far away is thinking of you.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;