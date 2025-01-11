import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button';
import Like from "@/assets/like.png"
import Comment from "@/assets/chat.png"
import Image from 'next/image';
import BlueLike from "@/assets/like (1).png";
interface Card {
    username: string,
    image: string,
    likes: number,
    comments: number,
    time: string,
    text: string
}
const Card = ({ username, image, likes, comments, time, text }: Card) => {
    const createdDate = new Date(time);
    const now = Date.now();
    const diffInMs = now - createdDate.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const calculateDays = (diffInHours: number) => {
        const calc = diffInHours / 24;
        const calc2 = calc.toString()[0];
        const calc3 = diffInHours - +calc2 * 24;
        if (diffInHours === 24) {
            return '1 day'
        }
        if (calc > 1) {
            if (calc2 === "1") {
                if (calc3 === 0) {
                    return `${calc2} day`;
                } else if (calc3 === 1) {
                    return `${calc2} day and ${calc3} hour`;
                } else {
                    return `${calc2} day and ${calc3} hours`;
                }
            } else {
                if (calc3 === 0) {
                    return `${calc2} days`;
                } else if (calc3 === 1) {
                    return `${calc2} days and ${calc3} hour`;
                } else {
                    return `${calc2} days and ${calc3} hours`;
                }
            }
        }
        return `${diffInHours} hrs`
    }
    return (
        <div className='max-w-[640px] mb-4 bg-white rounded-[8px] border border-gray-300 p-3 mx-4 sm:mx-auto'>
            <div className='flex gap-x-3 justify-start items-center'>
                <div>
                    <Avatar className='w-9 h-9'>
                        <AvatarFallback>{username[0] + username[1]}</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div><h1 className='font-medium'>{username}</h1></div>
                    <div><h1 className='text-sm text-gray-600 font-medium'>{calculateDays(diffInHours)} ago</h1></div>
                </div>
            </div>
            {text && <div className='text-start mt-3 px-1 text-gray-600'>
                <h1 className='text-[15px]'>{text}</h1>
            </div>}
            {image && <div className='w-full bg-gray-200 rounded-xl flex justify-center items-center mt-3 mb-2'>
                <img src={image} alt="" />
            </div>}
            <div className='flex justify-between mb-2 items-center'>
                <div className='flex justify-start ps-2 gap-x-1 items-center'>
                    <Image src={BlueLike} width={19} alt='reaction' />
                    <h1 className='text-sm text-gray-600 font-medium'>{likes}</h1>
                </div>
                <div className='flex justify-center pe-2 gap-x-2 items-center'>
                    <h1 className='text-sm text-gray-600 font-medium'>{comments}</h1>
                    <h1 className='text-sm text-gray-600 font-medium'>Comments</h1>
                </div>
            </div>
            <div className='flex justify-center w-full gap-x-2 items-center'>
                <Button className='bg-gray-200 hover:bg-gray-300 flex justify-center items-center flex-1  font-medium text-base text-[#1e40af]'>
                    <Image src={Like} width={20} alt='like' />
                    Like
                </Button>
                <Button className='bg-gray-200 hover:bg-gray-300 flex justify-center items-center flex-1  font-medium text-base text-[#1e40af]'>
                    <Image src={Comment} width={20} alt='like' />
                    Comment
                </Button>
            </div>
        </div>
    )
}

export default Card