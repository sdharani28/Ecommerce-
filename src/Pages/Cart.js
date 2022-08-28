import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

import { deleteProductFromCart, getProductsInCart, placeOrder, clearCart } from "../API";

import Layout from "../Components/Layout";
import OrderModal from "../Components/OrderModal";

import "../Stylesheets/cart.css"

function Cart() {
    const navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cartReducer)

    const [totalAmount, setTotalAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const removeAllCart = async () => {
            await clearCart();
        }
        removeAllCart()
    });

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((cartItems) => {
            temp = temp + cartItems.price
        })
        setTotalAmount(temp)
    }, [cartItems])

    useEffect(() => {
        // localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems])

    const deleteFromCart = async (product) => {
        // dispatch({ type: 'DELETE_FROM_CART', payload: product });
        await deleteProductFromCart(product?.['cartItemId']);
        const productsInCart = await getProductsInCart();
        dispatch({ type: 'SET_CART_ITEMS', payload: productsInCart });
    }

    const handlePlaceOrder = async (addressInfo) => {
        const orderInfo = {
            cartItems,
            addressInfo,
            email: JSON.parse(localStorage.getItem("user"))?.['email'],
            userId: JSON.parse(localStorage.getItem("user"))?.['uid'],
        }

        try {
            await placeOrder(orderInfo);
            await clearCart();
            const productsInCart = await getProductsInCart();
            dispatch({ type: 'SET_CART_ITEMS', payload: productsInCart });

            navigate('/orders');

        } catch (error) {
            console.error(`Error in handlePlaceOrder : ${error}`);
            alert("Failed to place order");
        }
    }

    return (
        <Layout>
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price of the Product</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => {
                        return <tr key={item.id}>
                            <td><img src={item.imageURL} height="80" widht="80" /></td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><FaTrash onClick={() => deleteFromCart(item)} /></td>
                        </tr>
                    })}
                </tbody>
            </table>

            {cartItems.length ? <><div className="d-flex justify-content-end">
                <h1 className="totalAmount">Total Amount: $ {totalAmount}</h1>
            </div>
                <div className="d-flex justify-content-end mt-3">
                    <button onClick={() => setShowModal(true)}>Place Order</button>
                </div></> : <><h1 style={{ textAlign: 'center' }} >Cart is empty</h1></>}

            {showModal ? <OrderModal showModal={showModal} setShowModal={setShowModal} placeOrder={handlePlaceOrder} /> : <></>}
        </Layout>
    )
}

export default Cart

