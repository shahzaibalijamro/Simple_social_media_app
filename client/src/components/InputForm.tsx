import React from 'react'
import { Input } from "@/components/ui/input"
const InputForm = () => {
    return (
        <div className='max-w-[640px] p-4 rounded-[10px] bg-gray-200 border border-gray-400 mx-4 sm:mx-auto mt-4'>
            <Input className='bg-white h-11 border border-gray-300' type='text' placeholder="What's on your mind?"/>
        </div>
    )
}

export default InputForm