"use client"

import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import Link from 'next/link'
import { useSelector } from 'react-redux'

interface State {
    token: {
        accessToken: string,
    }
}

const Header = () => {
    const name = "Shahzaib Ali";
    const accessToken = useSelector((state: State) => state.token.accessToken);
    console.log(accessToken);
    return (
        <div className='w-full bg-[#1e40af] flex justify-between px-2 py-2 sm:px-2 sm:py-3 md:px-3 md:py-3 items-center lg:py-3 lg:px-4 xl:px-5 xl:py-3'>
            <h1 className='text-xl text-white font-normal'>Social App</h1>
            <div className='flex justify-center items-center gap-x-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='focus-visible:outline-none'><Avatar className='w-9 h-9' >
                        <AvatarFallback className='font-medium text-xl'>{name[0]}</AvatarFallback>
                    </Avatar></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel className='cursor-pointer'>My Profile</DropdownMenuLabel>
                        <DropdownMenuItem className='cursor-pointer'>My posts</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/register">
                    <Button className='bg-white transition hover:translate-y-[2px] hover:text-black hover:bg-white text-black'>Signup</Button>
                </Link>
            </div>
        </div>
    )
}

export default Header