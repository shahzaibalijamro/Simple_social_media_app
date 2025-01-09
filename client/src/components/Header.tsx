import React from 'react'
import { Button } from './ui/button'

const Header = () => {
    return (
        <div className='w-full bg-[#1e40af] flex justify-between px-2 py-2 sm:px-2 sm:py-3 md:px-3 md:py-3 items-center lg:py-3 lg:px-4 xl:px-5 xl:py-3'>
            <h1 className='text-xl text-white font-normal'>Social App</h1>
            <div className='flex justify-center items-center gap-x-2'>
                <Button className='bg-white transition hover:translate-y-[2px] hover:text-black hover:bg-white text-black'>Login</Button>
                <Button className='bg-white transition hover:translate-y-[2px] hover:text-black hover:bg-white text-black'>Signup</Button>
            </div>
        </div>
    )
}

export default Header