import React, { useState, useContext, useEffect } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import "./addadmin.css"
import mainlogo from "./images/mainlogo.png"


const AddAdmin = () => {
    const [email, setEmail] = useState(null);
    const [token, setToken] = useContext(UseContext);
    const [admins, setAdmins] = useState(null)
    const [again, setAgain] = useState(false)
    let adminemail = ""

    function openForm() {

        document.getElementById("emailinput").value = ""
        document.getElementById("changeForm").style.display = "block";
    }

    function closeForm() {
        document.getElementById("changeForm").style.display = "none";
    }
    async function fetchAddAdmin() {
        adminemail = document.getElementById("emailinput").value
        console.log(adminemail)
        const requests = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
            body: JSON.stringify({
                "email": adminemail
            })
        };
        const response = await fetch(`http://127.0.0.1:8000/admin`, requests)
        setAgain(true)
        closeForm()
    }
    const addAdmin = () => {
        fetchAddAdmin()
    }

    async function fetchDeleteAdmin(adem) {
        const requests = {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token },

        };
        const response = await fetch(`http://127.0.0.1:8000/admin/${adem}`, requests)
        setAgain(true)

    }
    const deleteAdmin = (adem) => {
        fetchDeleteAdmin(adem)
    }
    async function fetchAdmin() {
        const requests = {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        };
        const response = await fetch(`http://127.0.0.1:8000/admin/you`, requests)
        const data = await response.json()

        setEmail(data.email)
        console.log(data)

    }

    async function fetchAdmins() {
        const requests = {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        };
        const response = await fetch(`http://127.0.0.1:8000/admin`, requests)
        const data = await response.json()
        setAdmins(data)
        setAgain(false)
    }
    function openFormp(){
        document.getElementById("changeFormp").style.display = "block";
      }
      function closeFormp() {
        document.getElementById("changeFormp").style.display = "none";
    }
      const logout=()=>{
        closeForm()
          localStorage.removeItem("token")
          window.location.href="/home"
      }

    useEffect(() => {
        if (token && email === null) {
            fetchAdmin()
        }
        if (token && admins === null) {
            fetchAdmins()
        }
        if (again == true) {
            fetchAdmins()
        }
    }, [email, admins, again])
    return (
            <div class="bodyadmin">

                <input type="checkbox" id="nav-toggle" />
                <div class="sidebar">
                    <div class="sidebar-brand">
                        <h2><span class="las la-leaf"></span><span>SMPSM</span></h2>
                    </div>


                    <div class="sidebar-menu">
                        <ul style={{ listStyle: "none" }}>
                            <li>
                                <a href="/adminpage" style={{ textDecoration: "none" }} class="active"><span class="las la-igloo"></span>
                                    <span>Dashboard</span></a>
                            </li>
                            <li>
                                <a href="/admincategory" id="categoriesLink" style={{ textDecoration: "none" }}><span class="las la-list" ></span>
                                    <span>Categories</span></a>
                            </li>

                            <li>
                                <a href="/orders" style={{ textDecoration: "none" }}><span class="las la-shopping-cart"></span>
                                    <span>Orders</span></a>
                            </li>
                            <li>
                                <a href="/customers" style={{ textDecoration: "none" }}><span class="las la-users"></span>
                                    <span>Customers</span></a>
                            </li>
                            <li>
                                <a href="/myaccount" style={{ textDecoration: "none" }}><span class="las la-user-circle"></span>
                                    <span>Accounts</span></a>
                            </li>
                            <li>
                                <a onClick={openFormp} style={{ textDecoration: "none" }}><span class="las la-sign-out-alt"></span>
                                    <span>Logout</span></a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="main-content">
                    <header class="headeradmin">
                        <h2>
                            <label for="nav-toggle">
                                <span class="las la-bars"></span>
                            </label>

                            Dashboard
                        </h2>

                        <div class="search-wrapper">
                            <span class="las la-search"></span>
                            <input type="search" placeholder="Search..." />
                        </div>

                        <div class="user-wrapper">
                            <img src={mainlogo} width="40px" height="40px" alt="user" />
                            <div>
                                <h4>smpsm group</h4>
                                <small>Admin</small>
                            </div>
                        </div>
                    </header>
                    <div className="addadminbody" style={{ width: "100%", height: "700px", justifyContent: "center", alignItems: "center",marginTop:"6rem"}}>
                    <div>
                        <h3 style={{ float: "left", width: "30px", marginLeft: "32rem" }}>Admins</h3>
                        <button onClick={() => openForm()} className="addadmin" style={{ width: "6rem", marginLeft: "5rem", borderRadius: "5rem" }}>Add Admin</button>
                    </div>

                    {admins != null && admins != 0 && <div className="admins" style={{ borderRadius: "2rem", width: "40%", height: "65%", marginLeft: "22rem", marginTop: "1rem", overflowY: "scroll" }}>{admins.map((a) => {
                        if (a.email != email) {
                            return (
                                <div className="adminrow" style={{ borderRadius: "0.5rem", marginTop: "0.5rem", width: "90%", height: "20%", marginLeft: "1.7rem", borderBottomStyle: "solid" }}>
                                    <div className="adminpro" style={{ marginLeft: "0.5rem", marginTop: "0.5rem", width: "20%", height: "80%", borderRightStyle: "solid", float: "left" }}><img style={{ borderRadius: "8rem", width: "80%", height: "100%" }} src={a.image} /></div>
                                    <div style={{ paddingTop: "2rem", width: "55%", marginLeft: "25%" }}>{a.email}</div>

                                    <button onClick={() => deleteAdmin(a.email)} className="deleteadmin" style={{ width: "4.5rem", marginLeft: "21rem", borderRadius: "7rem", paddingBottom: "0.3rem",paddingTop: "0.1rem" }}>Delete</button>
                                </div>
                            )
                        }
                    })}</div>}
                    </div>

                </div>
              

                <div class="form-popup" id="changeForm">
                    <form class="form-container">
                        <h3 style={{ color: "#d3b2b2" }}>Add</h3>
                        <i onClick={closeForm} id="closeedit" class="bi bi-x-lg fixed-top" style={{ marginLeft: "18rem", marginTop: "1rem", fontSize: "23px" }}></i>
                        <div style={{ width: "100%" }}>
                            <p style={{ float: "left", width: "5rem", fontWeight: "bold", color: "#562646" }}>Email:</p>
                            <input type="text" class="form-control" id="emailinput" placeholder="email" aria-label="email"></input>
                        </div>


                        <button type="button" class="btn" id="savebtn" onClick={addAdmin} >Add Admin</button>
                    </form>
                </div>

              

                <div class="form-popup" id="changeFormp" style={{width:"25rem"}}>
                <form class="form-container">
                    <h3 style={{ color: "#d3b2b2" }}>Logout</h3>
                    <i onClick={closeFormp} id="closeedit" class="bi bi-x-lg fixed-top" style={{ marginLeft: "22rem", marginTop: "1rem", fontSize: "23px" }}></i>
                    <div style={{ width: "100%" }}>
                    
                        <label id="itemlog" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Are you sure?</b></label>
                        
                   </div>


                    <button onClick={logout} type="button" class="btn" id="savebtn" >Yes</button>
                </form>
            </div>

            </div>

            );


};

            export default AddAdmin;