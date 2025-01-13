"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import axios from "@/config/axiosConfig"
import { setAccessToken } from '@/config/redux/reducers/tokenSlice'
import { setUser } from '@/config/redux/reducers/userSlice'

interface tokenState {
    token: {
        accessToken: string,
    }
}

interface userState {
    user: {
        user: {
            userName: string
        },
    }
}

const Header = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state: tokenState) => state.token.accessToken);
    const [dropdownOpen, setDropDownOpen] = useState(false)
    console.log(accessToken, "accessToken Before");
    const user = useSelector((state: userState) => state.user.user);
    console.log(user);
    document.body.removeAttribute('data-scroll-locked');
    document.body.style.pointerEvents = '';
    const getTokens = async () => {
        try {
            const { data } = await axios.post("/api/v1/auth");
            console.log(data);
            dispatch(setAccessToken({ token: data.accessToken }));
            dispatch(setUser({ user: data.user }));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (!accessToken) {
            getTokens();
        }
    }, [])
    const toggleScrollLock = (isLocked: boolean) => {
        const body = document.querySelector('body');
        if (isLocked) {
            body?.setAttribute('data-scroll-locked', 'true');
        } else {
            body?.removeAttribute('data-scroll-locked');
        }
    };
    useEffect(() => {
        toggleScrollLock(dropdownOpen);
    }, [dropdownOpen]);
    return (
        <div className='w-full bg-[#1e40af] flex justify-between px-2 py-2 sm:px-2 sm:py-3 md:px-3 md:py-3 items-center lg:py-3 lg:px-4 xl:px-5 xl:py-3'>
            <h1 className='text-xl text-white font-normal'>Social App</h1>
            <div className='flex justify-center items-center gap-x-2'>
                {accessToken && user ? <DropdownMenu>
                    <DropdownMenuTrigger className='focus-visible:outline-none'><Avatar className='w-9 h-9' >
                        <AvatarFallback className='font-medium text-xl'>{user.userName[0]}</AvatarFallback>
                    </Avatar></DropdownMenuTrigger>
                    <DropdownMenuContent className='z-50' onClick={() => setDropDownOpen(!dropdownOpen)}>
                        <DropdownMenuLabel className='cursor-pointer'>My Profile</DropdownMenuLabel>
                        <DropdownMenuItem className='cursor-pointer'>My posts</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> : <Link href="/register">
                    <Button className='bg-white transition hover:translate-y-[2px] hover:text-black hover:bg-white text-black'>Signup</Button>
                </Link>}
            </div>
        </div>
    )
}

export default Header