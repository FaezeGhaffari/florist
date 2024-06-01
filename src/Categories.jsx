import React, { useState, useContext, useEffect } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import four from "./images/4.jpg"
import "./categories.css"

function Categories() {
    const [token, setToken,badge,setBadge] = useContext(UseContext);
    const [data1, setData1] = useState(null)
    const [data2, setData2] = useState(null)
    const [data3, setData3] = useState(null)
    const [search, setSearch] = useState("")
    const [once, setOnce] = useState(true)
    ///////////
    let num = 1
    let name = ""
    let image = ""
    let price = 0
    let inventory = 0
    let content = ""
    let url = ""
    let id = 0
    const Add = () => {
        num = num + 1
        document.getElementById("count").innerHTML = num
    }
    const Mines = () => {
        if (num > 1) {
            num = num - 1
            document.getElementById("count").innerHTML = num
        }
    }

    function openForm(idc, ur, nm, im, inv, pr, co) {
        document.getElementById("count").innerHTML = 1
        id = idc
        url = ur
        name = nm
        image = im
        inventory = inv
        price = pr
        content = co
        console.log(id, url, name)
        document.getElementById("pimage").src = image
        document.getElementById("pname").innerHTML = name
        document.getElementById("pname").style.color = "#562646"
        document.getElementById("pcontent").innerHTML = content
        document.getElementById("pinventory").innerHTML = "inventory: " + inventory
        document.getElementById("pinventory").style.color = "#562646"
        document.getElementById("pprice").innerHTML = "Price: $" + price
        document.getElementById("pprice").style.color = "#562646"
        document.getElementById("productcard").style.display = "block";
        document.getElementById("product").style.backgroundColor = "#fcf5f5"
    }

    function closeForm() {
        num = 1
        document.getElementById("product").style.backgroundColor = "white"
        document.getElementById("productcard").style.display = "none";
    }

    async function addtocard() {
        if (!token) {
            window.location.href = "/login"
        }
        console.log(id, num)
        let requests;
        if (url === "bunch") {
            requests = {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
                body: JSON.stringify({
                    bunch_id: id,
                    "count": num
                }),

            };

        }
        else if (url === "apartment") {
            console.log(id, num)
            requests = {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
                body: JSON.stringify({
                    apartment_id: id,
                    "count": num
                }),

            };

        }
        else {
            requests = {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
                body: JSON.stringify({
                    accessory_id: id,
                    "count": num
                }),

            };
        }

        const response = await fetch(`http://127.0.0.1:8000/${url}order/`, requests)
        //window.location.reload();
        let b=Number(badge)+1
        console.log(localStorage.getItem("badge"))
      //  localStorage.removeItem("badge")
        localStorage.setItem("badge",b)
        setBadge(b)
        console.log(badge)
        closeForm();
    }
    //////////////
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


    useEffect(() => {
        console.log(badge,"badge")
        console.log(token)
        console.log(search)
        const fetching = async () => {
            const requests = {
                method: "GET",
            };
            const [data1, data2, data3] = await Promise.all([
                fetch(`http://127.0.0.1:8000/apartment/?search=${search.toUpperCase()}`, requests).then(response => response.json()),
                fetch(`http://127.0.0.1:8000/bunch/?search=${search.toUpperCase()}`, requests).then(response => response.json()),
                fetch(`http://127.0.0.1:8000/accessory/?search=${search.toUpperCase()}`, requests).then(response => response.json())

            ])
            setData1(data1)
            setData2(data2)
            setData3(data3)
            setOnce(false)



        }
        if ((data1 === null || data2 === null || data3 === null || search !== "") && once === true) {
            console.log(search)
            fetching()

        }
        if ((data1 !== null || data2 !== null || data3 !== null || search == "") && once === true) {
            console.log(search)
            fetching()

        }


        console.log(data1)
        console.log(data2)
        console.log(data3)

    }, [token, data1, data2, data3, search])

    return (
        <div id="product" style={{ width: "100%", height: "120vh" }}>

            <div id="mySidenav" class="sidenav">
                <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
                <a id="home" onClick={()=>window.location.href="/home/"}>Home</a>
                <a href="/yourorders">card</a>
                <a href="/login">Login</a>
                <a href="/contact">Contact</a>
            </div>

            <div id="main" style={{ backgroundColor: "#d7d8d0", width: "100%", justifyContent: "center", justifyItems: "center" }}>
                <span style={{ fontSize: "30px", cursor: "pointer", float: "left", color: "#562646" }} onClick={openNav}>&#9776;</span>
                <div class="container-fluid" style={{ width: "90%", color: "#562646" }}>
                    <form class="d-flex" style={{ width: "100%" }}>
                        <input id="inputsearch" class="form-control me-2" style={{ width: "750rem", color: "#562646", fontWeight: "bold" }} type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value); setOnce(true) }} />
                        <button id="searchbtn" class="btn btn-outline-success" style={{ width: "15rem" }} type="submit"><i class="bi bi-search" style={{ color: "562646" }}></i></button>
                    </form>
                </div>

            </div>

            <hr></hr>

            {data1 !== null && data1 !=0 && <div style={{ width: "100%", height: "100%" }}>
                <h3 style={{ paddingLeft: "4rem", paddingTop: "2rem", color: "#562646" }}>Apartment</h3>
                {data1.map(d => {
                    return (
                        <div onClick={() => { openForm(d.id, "apartment", d.name, d.image, d.inventory, d.price, d.content) }} class="card" style={{ width: "15rem", cursor: "pointer", height: "17rem", float: "left", marginLeft: "4rem", marginTop: "2rem" }}>
                            <img src={d.image} class="card-img-top image-fluid" alt="..." style={{ height: "11rem" }} />
                            <div class="card-body">
                                <h5 class="card-title" style={{ color: "#562646" }}>{d.name}</h5>
                                <p class="card-text" style={{ float: "left", color: "#562646", fontWeight: "bold" }}>${d.price}</p>
                                <a className="iconcategories" style={{ marginLeft: "9rem" }}><i class="bi bi-cart4"></i></a>
                            </div>
                        </div>
                    )
                })}
                <br></br>
            </div>}




            {data2 !== null && data2 !=0 && <div style={{ width: "100%", height: "100%" }}>
                <hr></hr>
                <h3 style={{ paddingLeft: "4rem", paddingTop: "2rem", color: "#562646" }}>Bunch</h3>
                {data2.map(d => {

                    return (
                        <div onClick={() => { openForm(d.id, "bunch", d.name, d.image, d.inventory, d.price, d.content) }} class="card" style={{ width: "15rem", cursor: "pointer", height: "17rem", float: "left", marginLeft: "4rem", marginTop: "2rem" }}>
                            <img src={d.image} class="card-img-top image-fluid" alt="..." style={{ height: "11rem" }} />
                            <div class="card-body">
                                <h5 class="card-title" style={{ color: "#562646" }}>{d.name}</h5>
                                <p class="card-text" style={{ float: "left", color: "#562646", fontWeight: "bold" }}>${d.price}</p>
                                <a className="iconcategories" style={{ marginLeft: "9rem" }}><i class="bi bi-cart4"></i></a>
                            </div>
                        </div>
                    )
                })}
                <br></br>
            </div>}


            {data3 !== null && data3 !=0 && <div style={{ width: "100%", height: "100%" }}>
                <hr></hr>
                <h3 style={{ paddingLeft: "4rem", paddingTop: "2rem", color: "#562646" }}>Accessory</h3>
                {data3.map(d => {

                    return (
                        <div onClick={() => { openForm(d.id, "accessory", d.name, d.image, d.inventory, d.price, d.content) }} class="card" style={{ width: "15rem", cursor: "pointer", height: "17rem", float: "left", marginLeft: "4rem", marginTop: "2rem" }}>
                            <img src={d.image} class="card-img-top image-fluid" alt="..." style={{ height: "11rem" }} />
                            <div class="card-body">
                                <h5 class="card-title" style={{ color: "#562646" }}>{d.name}</h5>
                                <p class="card-text" style={{ float: "left", color: "#562646", fontWeight: "bold" }}>${d.price}</p>
                                <a className="iconcategories" style={{ marginLeft: "9rem" }}><i class="bi bi-cart4"></i></a>
                            </div>
                        </div>
                    )
                })}
                <br></br>
            </div>}



            <div id="productcard" class="card mb-3" style={{ maxWidth: "850px", marginTop: "5rem", height: "75%", overflow: "hidden" }}>
                <div class="row g-0" style={{ height: "100%" }}>
                    <div class="col-md-4">
                        <img src={image} id="pimage"class="img-fluid rounded-start" alt="..." style={{ height: "100%" }} />
                    </div>
                    <div class="col-md-8" style={{ height: "100%", textAlign: "center" }}>
                        <i onClick={closeForm} id="closeedit" class="bi bi-x-lg fixed-top" style={{ marginLeft: "48rem", marginTop: "1rem", fontSize: "23px" }}></i>
                        <div class="card-body p-5" style={{ height: "83%" }}>
                            <h3 id="pname" class="card-title mt-4" ></h3>
                            <p id="pcontent" class="card-text mt-3" style={{ color: "#562646" }}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p id="pinventory" class="card-text" ><small class="text-muted">inventory: </small></p>
                            <p id="pprice" class="card-text"><small class="text-muted" style={{ color: "#562646" }}>Price: $</small></p>
                        </div>
                        <div style={{ width: "100%", textAlign: "center", justifyContent: "center", paddingLeft: "2rem" }}>
                            <p style={{ float: "left", width: "5rem", fontWeight: "bold" }}>count:</p>
                            <button onClick={Mines} className="negetive" style={{ float: "left", width: "2rem", marginLeft: "1rem" }}> - </button>
                            <div id="count" style={{ float: "left", width: "2rem", marginLeft: "6rem", fontWeight: "bold" }}>1</div>
                            <button onClick={Add} className="positive" style={{ width: "2rem", marginRight: "2rem" }}> + </button>
                        </div>
                        <button id="productbtn" onClick={addtocard} style={{ fontWeight: "bold", width: "85%", height: "2.3rem", borderColor: "gray", borderWidth: "0.1px", marginBottom: "2rem" }}>Add to cart</button>
                    </div>
                </div>
            </div>





        </div>
    );
}

export default Categories;