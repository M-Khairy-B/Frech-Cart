import axios from 'axios';
import  { createContext, useEffect, useState } from 'react';

export const ListContext = createContext();

const ListContextProvider = ({children}) => {
    const [cartCountList, setCartCountList] = useState(0);
    const [list, setList] = useState([]);
    let headers = {
        token: localStorage.getItem("userToken")
    }

    const addList = async (productId) => {
        try {
            const token = localStorage.getItem("userToken");
            if (!token) {
                throw new Error("You are not logged in. Please login to get access");
            }
    
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, { headers: { token } });
    
            setList(response?.data);
            setCartCountList(response?.data?.count);
            return response;
        } catch (error) {
            console.error("Error adding to wishlist:", error.message);
            throw error;
        }
    }
    

    const getItemList = async () => {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
            setList(response?.data);
            setCartCountList(response?.data?.count);
            return response;
        } catch (error) {
            console.error("Error fetching wishlist items:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    const removeItemList = async (productId) => {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            if (response?.data?.status === 'success') {
                return response?.data;
            }
            throw new Error('Failed to remove product');
        }
         catch (error) {
//
        }
    }

    useEffect(() => {
        setList()
        setCartCountList
    }, []);

    return (
        <ListContext.Provider value={{ list, addList, removeItemList, getItemList, setList, cartCountList }}>
            {children}
        </ListContext.Provider>
    );
};

export default ListContextProvider;
