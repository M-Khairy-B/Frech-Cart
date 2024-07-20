
import { createContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

export let UserContext = createContext();

export default function UserContextProvider({children}) {
    const [userLogin, setUserLogin] = useState(null);

    const decodeToken = () => {
        try {
            const token = localStorage.getItem("userToken");
            if (token) {
                const decoded = jwtDecode(token);
                setUserLogin(decoded);
            } else {
                setUserLogin(null);
            }
        } catch (error) {
            setUserLogin(null);
            localStorage.removeItem("userToken");
        }
    };

    useEffect(() => {
        decodeToken();

        window.addEventListener("storage", decodeToken);

        return () => {
            window.removeEventListener("storage", decodeToken);
        };
    }, []);

    useEffect(() => {
        localStorage
    }, []);

    return (
        <UserContext.Provider value={{ userLogin, setUserLogin }}>
            {children}
        </UserContext.Provider>
    );
}

