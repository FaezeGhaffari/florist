import React, { useState, useContext, useEffect } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import "./loginpage.css"
//import background from "./images/background.jpg"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useContext(UseContext);
    const [errormessage, setErrorMessage] = useState("");

    const submitLogin = async () => {
        const requests = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify(`grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`),
        };
        const response = await fetch("http://127.0.0.1:8000/login", requests);
        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.detail);
            console.log(data.detail)
            myFunction("Faild required")
        } else {
            localStorage.setItem("badge",0)
            localStorage.removeItem("token")
            localStorage.setItem("token", data.access_token);
            setToken(data.access_token);
            console.log(token);
            if(document.referrer ==="http://localhost:3000/registerpage"){
                //window.history.back(2)
                window.location.href="http://localhost:3000/home/"
            }
            else if(document.referrer ==="http://localhost:3000/categories"){
                window.location.href="http://localhost:3000/categories"
            }
            else if(document.referrer ==="http://localhost:3000/home" || document.referrer ==="http://localhost:3000/home/"){
                window.location.href="http://localhost:3000/home/"
            }
            
            else if (document.referrer ==="http://localhost:3000/yourorders"){
                window.location.href="http://localhost:3000/yourorders"

            }
           


        }

    };
    function myFunction(message) {
        var x = document.getElementById("snackbarlogin");
        x.innerHTML=message
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    }
    useEffect(() => {
        console.log(document.referrer,"referrer")
        console.log(token)
        console.log(window.performance.getEntriesByType("navigation")[0].type);
        

    }, [email,password]);
    //value={email} onChange={(e)=>{setEmail(e.target.value)}}
    //onClick={handleSubmit}
    return (
        <div className="body">
            <header className="headerlogin">
                <nav class="navigation" style={{paddingTop:"5%"}}>
                    <a id="Home" onClick={()=>window.location.href="http://localhost:3000/home/"}>Home</a>
                    <a href="#">Contact</a>
                </nav>
            </header>

            <div class="wrapper">
                <span class="icon-close"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg></span>
                <div class="form-box">
                    <h2>Login</h2>
                    <form action="#">
                        <div class="input-box">
                            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                            </svg></span>

                            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                            <label>Email</label>

                        </div>

                        <div class="input-box">
                            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                            </svg></span>

                            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                            <label>Password</label>

                        </div>
                        <div class="remember-forgot">
                            <label><input type="checkbox" />Remember me</label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" class="btn" onClick={handleSubmit}>Login</button>
                        <div class="login-register">
                            <p>Don't have an account?<a href="/registerpage" class="register-link">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
            <div id="snackbarlogin">success</div>

        </div>

    );


};

export default Login;