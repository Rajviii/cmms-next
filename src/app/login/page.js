'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleLogin = async () => {
        try{
            const response = await axios.post('api/login', {
                email, password
            });

            if(response.data.success){
                router.push('/work-orders');
            }
            else{
                setError('Invalid Credetials')
            }

        }
        catch(err){
            setError('Some error occurred');
        }
    }
    
    return(
        <div className="flex items-center justify-center bg-grey-100 min-h-screen">
            <div className="bg-white rounded w-full max-w-sm shadow-md p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">CMMS Login</h2>

                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    className="w-full border border-grey-300 rounded focus:outline-none focus:ring focus:border-blue-400 mb-3"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className="w-full border border-grey-300 rounded focus:outline-none focus:ring focus:border-blue-400 mb-4"
                />

                <button onClick={handleLogin}
                    className="w-full bg-blue-500 rounded text-white hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </div>
        </div>
    )
}