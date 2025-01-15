import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React from 'react'

const page = async ({params,}: {params: Promise<{ id: string }>}) => {
    const id = (await params).id;
    const item = {
        userId: {
            userName: "Shahzaib"
        }
    }
    return (
        <div className='max-w-[640px] w-full mx-auto md:mt-16 mt-10'>
            <div className='flex gap-x-3 mb-3 justify-center items-center'>
                <div>
                    <Avatar className='w-20 h-20 bg-gray-300'>
                        <AvatarFallback className='bg-gray-300 text-[1.5rem]'>{item.userId.userName[0] + item.userId.userName[1]}</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div><h1 className='text-[1.4rem] font-medium'>{item.userId.userName}</h1></div>
                    <div><h1 className='text-md text-gray-600 font-medium'>Joined 13 days ago</h1></div>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default page