import React, { useContext, useState, createContext, useEffect } from "react";
import { UseContext } from "./App";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import four from "./images/4.jpg"
import "./orders.css"

function Orders() {
    const [token, setToken] = useContext(UseContext);
    const [data1, setData1] = useState(null)
    const [data2, setData2] = useState(null)
    const [data3, setData3] = useState(null)

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
        console.log(data1)
        console.log(data2)
        console.log(data3)
        setData1(data1)
        setData2(data2)
        setData3(data3)

    }
    useEffect(() => {
        if (token && data1 === null && data2 === null && data3 === null) {
            fetchOrder()
        }

    }, [data1, data2, data3]);

    return (
        <div className="orderbody" style={{ textAlign: "cnter", with: "100%", height: "300vh" }}>


            <h1 style={{ marginLeft: "32rem" }}>Manage Order</h1>
            <br /><br />

            <table class="table-full text-center">
                <tr>
                    <th>S.N</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty.</th>
                    <th>Total</th>

                    <th>Customer Name</th>
                    <th>Customer Contact</th>
                    <th>Email</th>
                    <th>Address</th>
                </tr>
                {data1 !== null && data1 != 0 && <>{data1.map((d) => {
                    return (
                        <tr>
                            <td>{d.user_id}</td>
                            <td>{d.apartment_name}</td>
                            <td>${d.apartment_price}</td>
                            <td>{d.count}</td>
                            <td>${d.total_price}</td>

                            <td>{d.user_name}</td>
                            <td>{d.user_phone}</td>
                            <td>{d.user_email}</td>
                            <td>{d.user_address}</td>
                        </tr>
                    )
                })}</>}

                {data2 !== null && data2 != 0 && <>{data2.map((d) => {
                    return (
                        <tr>
                            <td>{d.user_id}</td>
                            <td>{d.bunch_name}</td>
                            <td>${d.bunch_price}</td>
                            <td>{d.count}</td>
                            <td>${d.total_price}</td>

                            <td>{d.user_name}</td>
                            <td>{d.user_phone}</td>
                            <td>{d.user_email}</td>
                            <td>{d.user_address}</td>
                        </tr>
                    )
                })}</>}


                {data3 !== null && data3 != 0 && <>{data3.map((d) => {
                    return (
                        <tr>
                            <td>{d.user_id}</td>
                            <td>{d.accessory_name}</td>
                            <td>${d.accessory_price}</td>
                            <td>{d.count}</td>
                            <td>${d.total_price}</td>

                            <td>{d.user_name}</td>
                            <td>{d.user_phone}</td>
                            <td>{d.user_email}</td>
                            <td>{d.user_address}</td>
                        </tr>
                    )
                })}</>}



            </table>
        </div>

    );
}

export default Orders;