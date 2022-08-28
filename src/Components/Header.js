import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {FaCartPlus} from 'react-icons/fa';

import { getProductsInCart } from "../API";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.authReducer.user);
    const {cartItems} = useSelector(state=>state.cartReducer);

    useEffect(() => {
        const fetchCartItems = async () => {
            const productsInCart = await getProductsInCart();
            dispatch({type: 'SET_CART_ITEMS', payload: productsInCart});
        }
        fetchCartItems();
    }, []);

    const logout = async () => {
        try {
            // const auth = getAuth();
            // await signOut(auth);
            // dispatch({type: 'LOGOUT'});
            // navigate('/login');

            localStorage.removeItem('user');
            window.location.reload();
        } catch (error) {
            console.log(`Error in logout : ${error}`);
        }
    }

    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Ecommerce</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">{user?.['email']?.split('@')?.[0] ?? ''}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">orders</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={logout} style={{
                                        border: "none",
                                        backgroundColor: "transparent",
                                        fontSize: "1rem",
                                        fontWeight: "400",
                                        lineHeight: "1.5",
                                }} >logout</button>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart"><FaCartPlus/> {cartItems.length} </Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header

