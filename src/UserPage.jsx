import React, { useState, useContext, useEffect, useRef } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./userpage.css"
import userpro from "./images/userprofile.PNG"

function UserPage() {
 
  const inputprofile = useRef(null)
  const [token, setToken] = useContext(UseContext);
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [image,setImage]=useState("")
  const [admin,setAdmin]=useState(false)


  function updateProfilePicture(event) {
    inputprofile.current.click()
    console.log("edit")
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result)
        console.log(e.target.result)
        document.getElementById("profilePicture").src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  // onClick={document.getElementById('profilePictureInput').click()}
  async function saveFetching() {
    const requests = {
      method: "PUT",
      headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token },
      body: JSON.stringify({
        profile: image,
        "username": username,
        "email": email,
        "address": address,
        "phone_number": phone
      }),
    };
    const response = await fetch(`http://127.0.0.1:8000/${user.id}`, requests)
    const data = await response.json()
    setUser(data)
    setUsername(data.username)
    setEmail(data.email)
    setAddress(data.address)
    setPhone(data.phone_number)

  }
  const saveProfile = () => {
    console.log(username, email, address)
    saveFetching()
  }

  async function fetchAdmin(){
    const requests = {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    };
    const response = await fetch(`http://127.0.0.1:8000/admin`, requests)
    const data = await response.json()
    if(data!=0){
      for(let i=0;i<data.length;i+=1){
        if(data[i].email===email){
          setAdmin(true)
        }
      }
    }
    
   
  }
  async function fetching() {
    const requests = {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    };
    const response = await fetch(`http://127.0.0.1:8000/users/you`, requests)
    const data = await response.json()
    setUser(data)
    setUsername(data.username)
    setEmail(data.email)
    setAddress(data.address)
    setPhone(data.phone_number)
    setImage(data.profile)
    console.log(data)

  }
  useEffect(() => {
    if (user === null) {
      fetching()
    }
    if(admin==false){
      fetchAdmin()
    }
    
  }, [user,admin])
  return (
    <div id="accountbody">

<div class="title" style={{top: "0",position: "fixed",backgroundcolor: "#ffe4e4",height: "30px",width: "100%",textalign: "center",justifyContent: "center",color: "#562646"}}>
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


      <div class="container-fluid main" style={{ padding: "2rem" }}>
        <div class="d-block d-md-none menu">
          <div class="bar"></div>
        </div>

        <div class="col-md-9" style={{ height: "80vh" }}>
          <h2 class="mt-5 mb-5" style={{ marginLeft: "20rem" }}>Profile Settings</h2>
          <div class="container">
            <div id="row" class="row">
              <div class="col-md-3">

                <div href="#" class="d-inline">

                  <input
                    type="file"
                    id="profilePictureInput"
                    style={{ display: "none" }}
                    ref={inputprofile}
                    accept="image/*"
                    onChange={(e) => updateProfilePicture(e)}
                  />
                  <div class="grid1">
                    {image!=="" ?<img
                      id="profilePicture"
                      src={image}
                      width="130px"

                    /> :<img
                      id="profilePicture"
                      src={userpro}
                      width="130px"

                    />}
                    <br />

                    <button onClick={(e) => updateProfilePicture(e)} type="button" class="editpro" style={{ height: "3rem", width: "200px", marginTop: "2rem", marginLeft: "1.5rem", borderRadius: "5rem" }}>
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
              <div class="grid2">
                <div class="col-md-9">
                  <div class="container" style={{ width: "60%" }}>
                    <form id="userform">
                      {admin && <div class="form-group">
                        <label id="label" for="fullName">ADMIN</label>
                      </div>}
                      <div class="form-group">
                        <label id="label" for="fullName">Full Name</label>
                        <input type="text" class="form-control input" id="fullName" value={username} onChange={(e) => setUsername(e.target.value)} />
                      </div>
                      <div class="form-group">
                        <label id="label" for="email">Email</label>
                        <input type="email" class="form-control input" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      {!admin && <div class="form-group">
                        <label id="label" for="Address">Address</label>
                        <input type="text" class="form-control input" id="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                      </div>}
                      <div class="form-group">
                        <label id="label" for="phoneNumber">Phone Number</label>
                        <input type="number" class="form-control input" id="phoneNo" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>

                      <div class="form-group"></div>

                      <div  class="row mt-5" id="rb">
                        <div class="col">
                          <button type="button" class="btn btn-primary btn-block" onClick={saveProfile} style={{ float: "left" }}>
                            Save Changes
                          </button>
                        </div>

                        <div class="col">
                          <button type="button" class="cancelBtn btn-default btn-block" style={{ width: "100%" }}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>


  );
}

export default UserPage;