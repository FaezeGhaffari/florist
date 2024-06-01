import React from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function Nav() {
  return (
   <div className="m-2">
    <Link className="btn btn-primary btn-lg ms-2" to="/createAccount">Create User</Link>
    
    <Link className="btn btn-secondary btn-lg ms-2"to="/login">Login</Link>
    <hr/>
   </div>
  );
}

export default Nav;