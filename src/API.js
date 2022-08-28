import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import fireDB from './fireConfig';

const addProductToCart = async (productInfo) => {
    const userId = JSON.parse(localStorage.getItem("user"))?.['uid'];
    const data = {
        userId: userId,
        product: productInfo
    }

    try {
        const result = await addDoc(collection(fireDB, "cart"), data);
        if (result) {
            alert("added to cart successfully");
        }
    } catch (error) {
        console.error(`Error in addProductToCart : ${error}`);
        alert("Failed to add to cart");
    }
}

const getProductsInCart = async () => {
    try {
        const products = [];
        const userId = JSON.parse(localStorage.getItem("user"))?.['uid'];

        const q = query(collection(fireDB, "cart"), where("userId", "==", userId));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            products.push({ ...doc.data()?.['product'], cartItemId: doc.id });
        });
        return products;
    } catch (error) {
        console.error(`Error in getProductsInCart : ${error}`);
        return [];
    }
}

const deleteProductFromCart = async (cartProductId) => {
    try {
        await deleteDoc(doc(fireDB, "cart", cartProductId));
    } catch (error) {
        console.error(`Error in deleteProductFromCart : ${error}`);
    }
}

const clearCart = async () => {
    try {

        const userId = JSON.parse(localStorage.getItem("user"))?.['uid'];

        const q = query(collection(fireDB, "cart"), where("userId", "==", userId));

        const querySnapshot = await getDocs(q);

        if(querySnapshot){
            querySnapshot.forEach(async (tempDoc) => {
                await deleteDoc(doc(fireDB, "cart", tempDoc.id));
            });
        }

    } catch (error) {
        console.error(`Error in clearCart : ${error}`);
    }
}

const placeOrder = async (orderInfo) => {
    try {
        const result = await addDoc(collection(fireDB, "orders"), orderInfo);
        if (result) {
            alert("Order placed successfully");
        }
    } catch (error) {
        console.error(`Error in placeOrder : ${error}`);
        alert("Failed to place order");
    }
}

const getOrders = async () => {
    try {
        const orders = [];
        const userId = JSON.parse(localStorage.getItem("user"))?.['uid'];

        const q = query(collection(fireDB, "orders"), where("userId", "==", userId));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            orders.push({ ...doc.data(), orderId: doc.id });
        });
        return orders;
    } catch (error) {
        console.error(`Error in getOrders : ${error}`);
        return [];
    }
}

export { addProductToCart, getProductsInCart, deleteProductFromCart, clearCart, placeOrder, getOrders, }