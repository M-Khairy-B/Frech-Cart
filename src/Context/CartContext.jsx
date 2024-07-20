import { createContext, useState } from 'react';
import axios from 'axios';

export let create = createContext();

export default function CartContextProvider({children}) {
    const [cartData, setCartData] = useState(null);
    const [cartCount, setCartCount] = useState(0); // حالة لتخزين عدد المنتجات في السلة
    const [cartCountNumber, setCartCountNumber] = useState(0); // حالة لتخزين عدد المنتجات في السلة
    let headers = {
        token: localStorage.getItem("userToken")
    }

    
    function addCart(productId) {
        const token = localStorage.getItem("userToken");
        if (!token) {
            return Promise.reject(new Error("You are not logged in. Please login to get access"));
        }
    
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers: { token } })
            .then((response) => {
                setCartData(response?.data);
                setCartCount(response?.data?.numOfCartItems); // تحديث عدد المنتجات في السلة
                setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
                return response;
            })
            .catch((error) => {
                console.error("Error adding to cart:", error?.message);
                throw error;
            });
    }

    function getItem() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((response) => {
                setCartData(response?.data)
                setCartCount(response?.data?.numOfCartItems); // تحديث عدد المنتجات في السلة
                setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
                return response;
            })
            .catch((error) => error);
    }

    function deleteItem() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((response) => {
                setCartData(response?.data)
                setCartCount(response?.data?.numOfCartItems); // تحديث عدد المنتجات في السلة
                setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
                setCartCount(0); 
                return response;
            })
            .catch((error) => error);
    }

    function removeItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then((response) => {
                setCartData(response?.data)
                setCartCount(response?.data?.numOfCartItems); // تحديث عدد المنتجات في السلة
                setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
                return response;
            })
            .catch((error) => error);
    }

    function updataItem(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
            .then((response) => {
                setCartData(response?.data)
                setCartCount(response?.data?.numOfCartItems); // تحديث عدد المنتجات في السلة
                setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
                return response;
            })
            .catch((error) => error);
    }

    

    return (
        <create.Provider value={{ cartData, setCartData, addCart, getItem, removeItem, updataItem, cartCount, deleteItem, cartCountNumber }}>
            {children}
        </create.Provider>
    );
}