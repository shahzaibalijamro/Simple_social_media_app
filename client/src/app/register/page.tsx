"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from "@/config/axiosConfig"
interface tokenState {
    token: {
        accessToken: string,
    }
}

const page = () => {
    const accessToken = useSelector((state: tokenState) => state.token.accessToken);
    const authenticateUserState = async () =>{
        try {
            const {data} = await axios.post("/protected");
            console.log(data);
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        authenticateUserState();
    },[])
    console.log(accessToken);
    return (
        <div>
            <h1>{accessToken && accessToken}</h1>
            <h1>Checking</h1>
        </div>
    )
}

export default page