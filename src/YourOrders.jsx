import React, { useState, useContext, useEffect } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./yourorders.css"
import four from "./images/4.jpg"

function YourOrders() {
    let orders = ["apartmentorder", "bunchorder", "accessoryorder"]
    const [token, setToken,badge,setBadge] = useContext(UseContext);
    const [data1, setData1] = useState(null)
    const [data2, setData2] = useState(null)
    const [data3, setData3] = useState(null)
    const [load, setLoad] = useState(true)
    let total = 0
    let name = ""
    let cotegory_name = ""
    let category_id = 0
    let c_n_id = ""
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

    function openForm(n, id, cn, c_id) {
        console.log(n)
        name = n
        category_id = id
        cotegory_name = cn
        c_n_id = c_id
        document.getElementById("itemname").innerHTML = name
        document.getElementById("changeForm").style.display = "block";
    }

    function closeForm() {
        document.getElementById("changeForm").style.display = "none";
    }

    function saveChanges() {
        const newItemName = document.getElementById("countinput").value;
        console.log("New Item Name:", newItemName);
        console.log(category_id, cotegory_name, c_n_id)
        updateorder(category_id, cotegory_name, Number(newItemName), c_n_id)
        document.getElementById("countinput").value = ""
        closeForm();
    }
    const deleteorder = async (id, cn) => {
        const requests = {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token },
        };
        const response = await fetch(`http://127.0.0.1:8000/${cn}/${id}`, requests)
        //window.location.reload();
        setLoad(false)


    }
    const removeorder = (id, cn) => {
        console.log(id, cn)
        deleteorder(id, cn)
    }

    const updateorder = async (id, cn, co, cn_id) => {
        console.log(cn_id === "bunch_id")
        let requests
        if (cn_id === "bunch_id") {
            requests = {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
                body: JSON.stringify({
                    bunch_id: id,
                    "count": co
                }),

            };

        }
        else if (cn_id === "apartment_id") {
            requests = {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
                body: JSON.stringify({
                    apartment_id: id,
                    "count": co
                }),

            };

        }
        else {
            requests = {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
                body: JSON.stringify({
                    accessory_id: id,
                    "count": co
                }),

            };
        }

        const response = await fetch(`http://127.0.0.1:8000/${cn}/${id}`, requests)
        //window.location.reload();
        setLoad(false)


    }

    useEffect(() => {
        if(badge!=0){
            localStorage.setItem("badge",0)
        setBadge(0)
        }
        console.log(token)
        if (!token) {
            window.location.href = "/login"
        }
        console.log("in")
        const fetching = async () => {
            const requests = {
                method: "GET",
                headers: { Authorization: "Bearer " + token },
            };
            const [data1, data2, data3] = await Promise.all([
                fetch(`http://127.0.0.1:8000/apartmentorder/yourorder`, requests).then(response => response.json()),
                fetch(`http://127.0.0.1:8000/bunchorder/yourorder`, requests).then(response => response.json()),
                fetch(`http://127.0.0.1:8000/accessoryorder/yourorder`, requests).then(response => response.json())

            ])
            setData1(data1)
            setData2(data2)
            setData3(data3)
            setLoad(true)

        }
        if (data1 === null || data2 === null || data3 === null || load == false) {
            fetching()

        }

        console.log(data1)
        console.log(data2)
        console.log(data3)

    }, [token, data1, data2, data3, load])

    return (
        <div style={{ width: "100%", height: "100%" }}>

            <div id="mySidenav" class="sidenav">
                <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
                <a id="home" onClick={()=>window.location.href="/home/"}>Home</a>
                <a href="/contact">Contact</a>
                <a href="/categories">Categories</a>
            </div>

            <div id="main" style={{ backgroundColor: "#562646", width: "100%", justifyContent: "center", justifyItems: "center" }}>
                <span style={{ fontSize: "30px", cursor: "pointer", float: "left", color: "white" }} onClick={openNav}>&#9776;</span>
                <h2 style={{  color: "white" ,marginRight:"3rem",fontSize:"3rem"}}>My Orders</h2>
            </div>

            {data1 !== null && data1 !=0 && <div>{data1.map(d => {
                total += d.total_price
                return (
                    <div class="cart-item" >
                        <img src={d.apartment_image} alt="Item 1" class="item-image" />
                        <div class="item-details">
                            <h3 >{d.apartment_name}</h3>
                            <p style={{ marginTop: "1rem", fontSize: "20px" }}>Price: ${d.apartment_price}</p>
                            <p >count: {d.count}</p>
                        </div>
                        <div class="item-actions">
                            <button class="btn-change" onClick={() => openForm(d.apartment_name, d.apartment_id, "apartmentorder", "apartment_id")}>Edit</button>
                            <button onClick={() => removeorder(d.apartment_id, "apartmentorder")} class="btn-remove">Remove</button>
                        </div>
                    </div>

                )
            })}</div>}

            {data2 !== null && data2 !=0 && <div>{data2.map(d => {
                total += d.total_price
                return (
                    <div class="cart-item" >
                        <img src={d.bunch_image} alt="Item 1" class="item-image" />
                        <div class="item-details">
                            <h3 >{d.bunch_name}</h3>
                            <p style={{ marginTop: "1rem", fontSize: "20px" }}>Price: ${d.bunch_price}</p>
                            <p >count: {d.count}</p>
                        </div>
                        <div class="item-actions">
                            <button class="btn-change" onClick={() => openForm(d.bunch_name, d.bunch_id, "bunchorder", "bunch_id")}>Edit</button>
                            <button onClick={() => removeorder(d.bunch_id, "bunchorder")} class="btn-remove">Remove</button>
                        </div>
                    </div>

                )
            })}</div>}


            {data3 !== null && data3 !=0 && <div>{data3.map(d => {
                total += d.total_price
                return (
                    <div class="cart-item" >
                        <img src={d.accessory_image} alt="Item 1" class="item-image" />
                        <div class="item-details">
                            <h3 >{d.accessory_name}</h3>
                            <p style={{ marginTop: "1rem", fontSize: "20px" }}>Price: ${d.accessory_price}</p>
                            <p >count: {d.count}</p>
                        </div>
                        <div class="item-actions">
                            <button class="btn-change" onClick={() => openForm(d.accessory_name, d.accessory_id, "accessoryorder", "accessory_id")}>Edit</button>
                            <button onClick={() => removeorder(d.accessory_id, "accessoryorder")} class="btn-remove">Remove</button>
                        </div>
                    </div>

                )
            })}</div>}


            {(data1!=0 || data2!=0 || data3!=0) ? <button id="buybtn" type="button" class="btn" style={{ marginBottom: "2%", height: "2%", marginLeft: "10%", width: "80%" }}>BUY THEM:${total}</button>:<></>}

            <div class="form-popup" id="changeForm">
                <form class="form-container">
                    <h3 style={{ color: "#d3b2b2" }}>Edit Item</h3>
                    <i onClick={closeForm} id="closeedit" class="bi bi-x-lg fixed-top" style={{ marginLeft: "18rem", marginTop: "1rem", fontSize: "23px" }}></i>
                    <label id="itemname" className="mt-2 fs-4" for="newItemName" style={{ collor: "#562646" }}><b>{name}</b></label>
                    <div style={{ width: "100%" }}>
                        <p style={{ float: "left", width: "5rem", fontWeight: "bold", color: "#562646" }}>count:</p>
                        <input type="text" class="form-control" id="countinput" placeholder="count" aria-label="count"></input>
                    </div>


                    <button type="button" class="btn" id="savebtn" onClick={saveChanges}>Save Changes</button>
                </form>
            </div>


        </div>


    );
}

export default YourOrders;