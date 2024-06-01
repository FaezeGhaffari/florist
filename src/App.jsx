import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from "./Home";
import Load from "./load";
import Login from "./Login";
import Categories from "./Categories";
import Product from "./Product";
import RegisterPage from "./RegisterPage";
import YourOrders from "./YourOrders";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import AdminCategory from "./AdminCategory";
import Orders from "./Orders";
import AddAdmin from "./AddAdmin";
import CustomersPage from "./CustomersPage"
import Contact from "./Contact";

export const UseContext = createContext();

const App = () => {
  localStorage.setItem("categorysearch","")
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [badge, setBadge] = useState(localStorage.getItem("badge"));
  const [load, setLoad] = useState(false)
  let T;
  const perform = window.performance.getEntriesByType("navigation")[0].type;

  if (window.location.href !== "http://localhost:3000/") {
    T = setTimeout(() => { setLoad(true) }, 500)
    console.log("....")

  }

  useEffect(() => {
    console.log(token)
    console.log(window.location.href)
    console.log(load)
    
    if (perform) {
      if (token && perform === "navigate" && window.location.href === "http://localhost:3000/") {
        localStorage.removeItem("token");
        localStorage.removeItem("badge");
        window.location.reload();
      }
      if(perform !== "navigate"){
        setLoad(true)
      }
    }
    if (window.location.href !== "http://localhost:3000/home") {
      console.log(load)
      setLoad(true)
    }

    if (load && window.location.href === "http://localhost:3000/") {
      console.log("hi")
      clearTimeout(T)
      window.location.href = "/home"
    }

  }, [load])

  //   <Route path="/product/:name/:id" element={<ApartmentProduct />} />
  //<Route path="/myaccount" element={<UserPage />} />

  return (

    <UseContext.Provider value={[token, setToken,badge,setBadge]}>
      <Router>
        {!load && <Load></Load>}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
       
          <Route path="/registerpage" element={<RegisterPage />} />
          <Route path="/yourorders" element={<YourOrders />} />
          <Route path="/myaccount" element={<UserPage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/admincategory" element={<AdminCategory />} />
          <Route path="/product/:category" element={<Product />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admins" element={<AddAdmin />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/contact" element={<Contact />} />


        </Routes>

      </Router>
    </UseContext.Provider>

  );
}

export default App;
