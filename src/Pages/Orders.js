import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus } from 'react-icons/fa';

import Layout from "../Components/Layout";

import { getOrders } from "../API";

const Orders = () => {
    const dispatch = useDispatch();

    const orders = useSelector(state => state.orderReducer.orders) ?? [];

    useEffect(() => {
        const fetchOrder = async () => {
            const orders = await getOrders();
            dispatch({ type: 'SET_ORDERS', payload: orders });
        }
        fetchOrder();
    }, []);

    return (
        <Layout>
            {
                orders.length ? <>{
                    orders.map((order, idx) => <>
                    <h3>Order {idx+1}</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price of the Product</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.['cartItems']?.map(item => {
                                return <tr key={item.id}>
                                    <td><img src={item.imageURL} height="80" widht="80" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <hr /></>)
                }</> : <><h1 style={{ textAlign: 'center' }} >You have not made any orders</h1></>
            }
        </Layout>
    )

}

export default Orders;