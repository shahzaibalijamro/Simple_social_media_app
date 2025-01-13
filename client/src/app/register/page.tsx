"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from "@/config/axiosConfig";
import { useRouter } from 'next/navigation';
import Register from '../register';
import { Progress } from '@/components/ui/progress';

interface tokenState {
    token: {
        accessToken: string,
    }
}

const register = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingVal, setLoadingVal] = useState(33);
    const accessToken = useSelector((state: tokenState) => state.token.accessToken);
    const authenticateUserState = async () => {
        setLoadingVal(90);
        try {
            const { data } = await axios.post("/api/v1/protected");
            console.log(data);
            router.replace("/");
        } catch (error: any) {
            console.log(error);
            const errorMsg = error.response?.data.message;
            if (errorMsg === "Access token and refresh token are required! Please log in again.") {
                setLoading(true)
            }
        }
    }
    useEffect(() => {
        authenticateUserState();
    }, [])
    console.log(accessToken);
    return (
        <div>
            {loading ? <Register /> : <div className='w-full h-[90vh] flex justify-center items-center max-w-[200px] mx-auto px-4'><Progress value={loadingVal} /></div>}
        </div>
    )
}

export default register