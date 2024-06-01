import React, { useState, useContext, useEffect, useRef } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./customerpage.css"
import curomerimg from "./images/customer.png"
import mainlogo from "./images/mainlogo.png"

function UserPage() {
    const [token, setToken] = useContext(UseContext);
    const [Customer, setCustomer] = useState(null)
    const [users, setUsers] = useState(null)

    let count = 0
    let custom = []
    let user = []
    async function fetchOrder() {
        const requests = {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        };
        const [data1, data2, data3] = await Promise.all([
            fetch(`http://127.0.0.1:8000/apartmentorder/`, requests).then(response => response.json()),
            fetch(`http://127.0.0.1:8000/bunchorder/`, requests).then(response => response.json()),
            fetch(`http://127.0.0.1:8000/accessoryorder/`, requests).then(response => response.json())

        ])
        console.log(data1.length)
        console.log(data2.length)
        console.log(data3.length)
        if (data1 != 0) {
            count += data1.length

            console.log(data1)
            for (let i = 0; i < data1.length; i += 1) {
                let j = 0
                let t = 0
                if (custom.length == 0) {
                    custom.push(data1[0])
                    continue
                }
                for (let t = 0; t < custom.length; t += 1) {
                    if (custom[t].user_email === data1[i].user_email) {
                        j = 1
                    }
                }
                if (j == 0) {
                    custom.push(data1[i])
                }
            }

        }
        if (data2 != 0) {
            count += data2.length
            for (let i = 0; i < data2.length; i += 1) {
                let j = 0
                let t = 0
                if (custom.length == 0) {
                    custom.push(data2[0])
                    continue
                }
                for (let t = 0; t < custom.length; t += 1) {
                    if (custom[t].user_email === data2[i].user_email) {
                        j = 1
                    }
                }
                if (j == 0) {
                    custom.push(data2[i])
                }
            }


        }
        if (data3 != 0) {
            count += data3.length

            for (let i = 0; i < data3.length; i += 1) {
                let j = 0
                let t = 0
                if (custom.length == 0) {
                    custom.push(data3[0])
                    continue
                }
                for (let t = 0; t < custom.length; t += 1) {
                    if (custom[t].user_email === data3[i].user_email) {
                        j = 1
                    }
                }
                if (j == 0) {
                    custom.push(data3[i])
                }
            }




        }
        if (custom != 0) {

            setCustomer(custom)
        }

    }
    async function fetchUser() {
        const requests = {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        };

        for (let c of Customer) {
            let response = await fetch(`http://127.0.0.1:8000/users/search?search=${c.user_email}`, requests)
            let data = await response.json()
            if (data != 0) {
                console.log(data[0])
                user.push(data[0])

            }
        }
        setUsers(user)
        console.log(users)
    }

    function openForm() {
        document.getElementById("changeForm").style.display = "block";
    }
    function closeForm() {
        document.getElementById("changeForm").style.display = "none";
    }
    const logout = () => {
        closeForm()
        localStorage.removeItem("token")
        window.location.href = "/home"
    }

    useEffect(() => {
        console.log(token)
        console.log(Customer)
        console.log(users, "users")
        if (token && Customer === null) {
            fetchOrder()
        }
        if (token && Customer !== null && Customer != 0 && users === null) {
            fetchUser()
        }


    }, [Customer, users]);

    return (
        <div className="admin" style={{ width: "100%", height: "100vh" }}>
            <div className="bodyadmin">
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
                                <a onClick={openForm} style={{ textDecoration: "none" }}><span class="las la-sign-out-alt"></span>
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

                    <div style={{ width: "900px", height: "600px", marginLeft: "15rem", paddingTop: "8rem" }}>
                        <h5 id="fscustomer" style={{ marginBottom: "2rem", marginLeft: "19rem" }}>Customers</h5>
                        <div class="users">
                            <section id="customer-flower">

                                <div class="customer-flower">
                                    <img src={curomerimg} alt="Customer" />

                                </div>
                            </section>

                            {users != null && users != 0 && <section id="customer-info">{users.map((u) => {
                                return (
                                    <div class="customer-info">
                                        <div class="customers">
                                            <img src={u.profile} alt="Customer 1" />
                                            <blockquote>
                                                <cite>{u.username} <br />{u.email} </cite>
                                            </blockquote>
                                        </div>
                                    </div>
                                )
                            })} </section>}



                        </div>


                    </div>
                    </div>

                    <div class="form-popup" id="changeForm" style={{ width: "25rem" }}>
                        <form class="form-container">
                            <h3 style={{ color: "#d3b2b2" }}>Logout</h3>
                            <i onClick={closeForm} id="closeedit" class="bi bi-x-lg fixed-top" style={{ marginLeft: "22rem", marginTop: "1rem", fontSize: "23px" }}></i>
                            <div style={{ width: "100%" }}>

                                <label id="itemlog" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>Are you sure?</b></label>

                            </div>


                            <button onClick={logout} type="button" class="btn" id="savebtn" >Yes</button>
                        </form>
                    </div>




                </div>

            </div>


            );
}

            export default UserPage;