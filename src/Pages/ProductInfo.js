import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDB from '../fireConfig';
import { useParams } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";    

import { addProductToCart, getProductsInCart } from "../API";

function ProductInfo() {
    const dispatch = useDispatch();
    const [product, setProduct] = useState([]);
    const params = useParams();

    const {cartItems} = useSelector(state=>state.cartReducer);
    
    useEffect(() => {
        getData()
    }, [])

    const addToCart = async(product) => {
        await addProductToCart(product);
        const productsInCart = await getProductsInCart();
        dispatch({type: 'SET_CART_ITEMS', payload: productsInCart});
    }

    async function getData() {
        try {
            const product = await getDoc(
                doc(fireDB, "products", params.productid));
            console.log(product.data());    
            setProduct(product.data());
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            {product && (<div>
                <p><b>{product.name}</b></p>
                <img src={product.imageURL} alt="" className="product-info-Img"></img>
                <hr />
                <p>{product.description}</p>
                <p><b>${product.price}</b></p>
                <div className="d-flex justify-content-end mt-3">
                    <button onClick={() => addToCart(product)}>Add to cart</button>
                </div>
            </div>)}
        </Layout>
    )
}

export default ProductInfo

