import React, { useState, useContext, useEffect } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import "./registerpage.css"

//import background from "./images/background.jpg"


const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useContext(UseContext);
    const [errormessage, setErrorMessage] = useState("");


    function checkPassword() {
        var password = document.getElementById("password").value;
        var capital = document.getElementById("capital");
        var specialChar = document.getElementById("special-char");
        var number = document.getElementById("number");
        var moreThan8 = document.getElementById("more-than-8");
        let yes=0
        // Check for capital letters
        if (/[A-Z]/.test(password)) {
            capital.style.color = "green";
            yes+=1
        } else {
            capital.style.color = "red";
        }
    
        // Check for special characters
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
            specialChar.style.color = "green";
            yes+=1
        } else {
            specialChar.style.color = "red";
        }
    
        // Check for numbers
        if (/\d/.test(password)) {
            number.style.color = "green";
            yes+=1
        } else {
            number.style.color = "red";
        }
    
        // Check for length more than 8 characters
        if (password.length > 8) {
            moreThan8.style.color = "green";
            yes+=1
        } else {
            moreThan8.style.color = "red";
        }

        if(yes===4){
            submitLogin()
        }
    }

    const submitLogin = async () => {
        const requests = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "profile":"",
                "username":username,
                "email":email,
                "address":address,
                "phone_number":phone,
                "password":password
            }),
        };
        const response = await fetch("http://127.0.0.1:8000/users", requests);
        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            localStorage.setItem("badge",0)
            localStorage.removeItem("token")
            localStorage.setItem("token", data.access_token);
            setToken(data.access_token);
            console.log(token);
            if(document.referrer ==="http://localhost:3000/login"){
                //window.history.back(3)
                window.location.href="http://localhost:3000/home/"
            }
            else if(document.referrer ==="http://localhost:3000/home" || document.referrer ==="http://localhost:3000/home/"){
                window.location.href="http://localhost:3000/home/"
            }

        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkPassword()
        //submitLogin();
    }
    useEffect(() => {
        console.log(token)
        console.log(email, password)
        console.log(window.performance.getEntriesByType("navigation")[0].type);
        

    }, [email, password]);
    //value={email} onChange={(e)=>{setEmail(e.target.value)}}
    //onClick={handleSubmit}
    return (
        <div className="registerbody">
            <header className="headerregister">
                <nav class="navigation-register">
                    <a id="Home" onClick={()=>window.location.href="http://localhost:3000/home/"}>Home</a>
                    <a href="#">Contact</a>

                </nav>
            </header>
            <div class="wrapper-register">
                <span class="icon-close"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg></span>
                <div class="form-box-register">
                    <h2>Registration</h2>

                    <form action="#">
                        <div class="input-box-register">
                            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg></span>

                            <input type="text"  value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                            <label>Username</label>

                        </div>
                        <div class="input-box-register">
                            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                            </svg></span>

                            <input type="email"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            <label>Email</label>

                        </div>
                        <div class="input-box-register">
                            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                            </svg></span>

                            <input type="text"  value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                            <label>Address</label>

                        </div>
                        <div class="input-box-register">
                            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                            </svg></span>

                            <input type="tel" value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                            <label>Phone</label>
                            <div class="input-box-register">
                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                                    </svg>
                                </span>
                                <input type="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                                <label>Password</label>
                                <div class="password-validation">
                                    <p id="capital">*Uppercase</p>
                                    <p id="special-char">*Special Character</p>
                                    <p id="number">*Number</p>
                                    <p id="more-than-8">*More than 8 characters</p>
                                </div>
                            </div>
                            <button type="submit" id="registerbtn" class="btn" onClick={handleSubmit}>Register</button>
                            <div class="login-register">
                                <p>Already have an account?<a href="/login" class="login-link">Login</a></p>
                            </div>

                        </div>

                    </form>
                </div>
            </div>

        </div>

    );


};

export default RegisterPage;