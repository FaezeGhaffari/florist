import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Users = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState("");
    const [token, setToken] = useContext(UseContext);
    const [errormessage, setErrorMessage] = useState("");
    
    const result = async () => {
        const requests = {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        };
        const response = await fetch(`http://127.0.0.1:8000/users/search?search=${search}`, requests);
        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            //localStorage.setItem("token",data.access_token);
            console.log("in")
            //console.log(data)
           
            setUsers([data]);
            //window.location.href="/home"


        }
    }
    const goToPage=(e)=>{
        const email=e.innerHTML
        window.location.href=`/${email}`
        console.log(email)
    }
    useEffect(()=>{
        if(search !== ""){
           result();
           console.log(users[0])
        }
        result()
        console.log(users[0])
    },[search])

    return (

        <div > 
            <div className="input-group mt-5 fixed-top form-control">
                
                <input type="search" className="form-control" aria-label="Search" aria-describedby="search" value={search} onChange={(e) => { setSearch(e.target.value) }} style={{ backgroundColor: "#C0C6CB" }} />
                
                <div class="input-group-prepend">
                    <span class="input-group-text" id="search"><i className="bi bi-search p-1"></i></span>
                </div>
            </div>
            

            <div className="mt-5">
            {(search && users) ?<ul class="list-group">{users[0].map((user)=>{
                return(
                    <div>
                         <li className="list-group-item border-secondry" ><i className="bi bi-person-square ps-2 pe-2" onClick={(e)=>{goToPage(e.target)}}> {user.email}</i></li>
                    </div>
                )
            })}</ul>:<p>nothing</p>}
          
            </div>

            <div className="fixed-bottom text-center" style={{backgroundColor:"#6E7D8D"}}>
               <span className="border border-white" onClick={()=>{window.location.href="/post"}}><i class="bi bi-person"></i></span>
            </div>

        </div>

    );

}
export default Users;