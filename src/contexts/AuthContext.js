'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
        if(!token){
            router.push('/login');
        }
    }, []);

    const login = async (email, password) => {
        try{
            const response = await axios.post('api/login', {
                email, password
            });
            if(response.data.success){
                localStorage.setItem('authToken', response.data.token);
                setIsAuthenticated(true);
                router.push('/dashboard');
            }
        }
        catch(error){
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        router.push('/login');
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);