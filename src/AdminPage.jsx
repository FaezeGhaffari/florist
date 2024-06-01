import React, { useContext,useState, createContext, useEffect } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./adminpage.css"
import mainlogo from "./images/mainlogo.png"

function AdminPage() {
    const [token, setToken] = useContext(UseContext);
    const [email,setEmail]=useState(null)
    const [category,setCategory]=useState(0)
    const [order,setOrder]=useState(0)
    const [Customer,setCustomer]=useState(0)
    const [admins,setAdmins]=useState(null)
    let count=0
    let custom=[]
    async function fetchOrder(){
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
        if(data1!=0){
            count+=data1.length
            
            console.log(data1)
            for(let i=0;i<data1.length;i+=1){
                let j=0
                let t=0
                if(custom.length==0){
                    custom.push(data1[0])
                    continue
                }
                for(let t=0;t<custom.length;t+=1){
                    if(custom[t].user_email===data1[i].user_email){
                        j=1
                    }
                }
                if(j==0){
                    custom.push(data1[i])
                }
            }
          
            

        }
        if(data2!=0){
            count+=data2.length
            for(let i=0;i<data2.length;i+=1){
                let j=0
                let t=0
                if(custom.length==0){
                    custom.push(data2[0])
                    continue
                }
                for(let t=0;t<custom.length;t+=1){
                    if(custom[t].user_email===data2[i].user_email){
                        j=1
                    }
                }
                if(j==0){
                    custom.push(data2[i])
                }
            }
            

            
           
        }
        if(data3!=0){
            count+=data3.length
           
            for(let i=0;i<data3.length;i+=1){
                let j=0
                let t=0
                if(custom.length==0){
                    custom.push(data3[0])
                    continue
                }
                for(let t=0;t<custom.length;t+=1){
                    if(custom[t].user_email===data3[i].user_email){
                        j=1
                    }
                }
                if(j==0){
                    custom.push(data3[i])
                }
            }
         

            
            
        }
        if(custom!=0){
            setCustomer(custom.length)
        }
        setOrder(count)
      
        
      }

    async function fetchCategory(){
        const requests = {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        };
        const response = await fetch(`http://127.0.0.1:8000/tablesname/`, requests)
        const data = await response.json()
        if(data!=0){
            setCategory(data.length)
        }
        
        //console.log(data.length)
        
        
      }
  async function fetchAdmin(){
    const requests = {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    };
    const response = await fetch(`http://127.0.0.1:8000/admin/you`, requests)
    const data = await response.json()
    
    setEmail(data.email)
    console.log(data)
    
  }

  async function fetchAdmins(){
    const requests = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      const response = await fetch(`http://127.0.0.1:8000/admin`, requests)
      const data = await response.json()
      setAdmins(data)
  }
  function openForm(){
    document.getElementById("changeForm").style.display = "block";
  }
  function closeForm() {
    document.getElementById("changeForm").style.display = "none";
}
  const logout=()=>{
    closeForm()
      localStorage.removeItem("token")
      window.location.href="/home"
  }
  useEffect(() => {
    console.log(token)
    if(token && email===null){
      fetchAdmin()
    }
    if(token && category===0){
        fetchCategory()
      }

    if(token && order===0){
        fetchOrder()
    }
    if(token && admins===null){
        fetchAdmins()
    }

},[email,category,order,Customer,admins]);
    return (
        <div className="admin">

            <div class="bodyadmin">

                <input type="checkbox" id="nav-toggle"/>
                <div class="sidebar">
                    <div class="sidebar-brand">
                        <h2><span class="las la-leaf"></span><span>SMPSM</span></h2>
                    </div>


                    <div class="sidebar-menu">
                        <ul style={{listStyle:"none"}}>
                            <li>
                                <a href="/adminpage" style={{ textDecoration: "none" }} class="active"><span class="las la-igloo"></span>
                                    <span>Dashboard</span></a>
                            </li>
                            <li>
                                <a href="/admincategory" id="categoriesLink" style={{textDecoration:"none"}}><span class="las la-list" ></span>
                                    <span>Categories</span></a>
                            </li>

                            <li>
                                <a href="/orders" style={{textDecoration:"none"}}><span class="las la-shopping-cart"></span>
                                    <span>Orders</span></a>
                            </li>
                            <li>
                                <a href="/customers" style={{textDecoration:"none"}}><span class="las la-users"></span>
                                    <span>Customers</span></a>
                            </li>
                            <li>
                                <a href="/myaccount" style={{textDecoration:"none"}}><span class="las la-user-circle"></span>
                                    <span>Accounts</span></a>
                            </li>
                            <li>
                                <a onClick={openForm} style={{textDecoration:"none"}}><span class="las la-sign-out-alt"></span>
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

                    <main class="adminmain">

                        <div class="cards" >

                            <div onClick={()=>window.location.href="/admincategory"} class="card-single">
                                <div>
                                    <h1>{category}</h1>
                                    <span>Categories</span>
                                </div>
                                <div>
                                    <span class="las la-seedling"></span>
                                </div>
                            </div>

                            <div onClick={()=>window.location.href="/orders"} class="card-single">
                                <div>
                                    <h1>{order}</h1>
                                    <span>Orders</span>
                                </div>
                                <div>
                                    <span class="las la-shopping-cart"></span>
                                </div>
                            </div>

                            <div onClick={()=>window.location.href="/customers"} class="card-single">
                                <div>
                                    <h1>{Customer}</h1>
                                    <span>Customers</span>
                                </div>
                                <div>
                                    <span class="las la-users"></span>
                                </div>
                            </div>

                            <div class="card-single">
                                <div>
                                    <h1>$100</h1>
                                    <span>Income</span>
                                </div>
                                <div>
                                    <span class="las la-money-bill"></span>
                                </div>
                            </div>

                            <div class="card-single" onClick={()=>window.location.href="/admins"}>
                                <div>
                                    <h1>{admins && admins.length}</h1>
                                    <span>Admins</span>
                                </div>
                                <div>
                                    <span class="las la-money-bill"></span>
                                </div>
                            </div>

                            

                        </div>


                    </main>
                </div>


            </div>



            <div class="form-popup" id="changeForm" style={{width:"25rem"}}>
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


    );
}

export default AdminPage;