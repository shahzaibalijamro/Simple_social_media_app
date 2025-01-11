"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

interface tokenState {
    token: {
        accessToken: string,
    }
}

const page = () => {
    const accessToken = useSelector((state: tokenState) => state.token.accessToken);
    useEffect(()=>{
        const token = localStorage.getItem("accessToken");
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