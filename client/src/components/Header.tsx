import React from 'react'
import { Button } from './ui/button'

const Header = () => {
    return (
        <div className='w-full flex justify-between items-center px-5 py-3'>
            <h1>Social App</h1>
            <div className='flex justify-center items-center gap-x-2'>
                <Button>Hello</Button>
                <Button>Hello</Button>
            </div>
        </div>
    )
}

export default Header