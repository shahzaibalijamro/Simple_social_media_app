import React, { useState } from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button';
import Like from "@/assets/like.png"
import Comment from "@/assets/chat.png"
import Image from 'next/image';
import BlueLike from "@/assets/like (1).png";
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { useSelector } from 'react-redux';
interface Card {
    item: {
        userId: {
            userName: string;
        };
        _id: string;
        content: string;
        createdAt: string;
        updatedAt: string;
        media: string;
        likes: any[];
        comments: any[];
        __v: number;
    }
    likePost: (id: string, index: number) => void,
    commentOnPost: (id: string, index: number) => void,
    setCommentText: (value: string) => void,
    index: number
}

interface userState {
    user: {
        user: {
            userName: string,
            _id: string
        },
    }
}

const Card = ({ item, index, likePost, commentOnPost, setCommentText }: Card) => {
    const user = useSelector((state: userState) => state.user.user);
    const [showModal, setShowModal] = useState(false);
    const calculateDays = () => {
        const createdDate = new Date(item.createdAt);
        const now = Date.now();
        const diffInMs = now - createdDate.getTime();
        if (diffInMs < 1000 * 60 * 60) {
            return "Just now!";
        }
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const calc = diffInHours / 24;
        const calc2 = calc.toString()[0];
        const calc3 = diffInHours - +calc2 * 24;
        if (diffInHours === 24) {
            return '1 day ago'
        }
        if (calc > 1) {
            if (calc2 === "1") {
                if (calc3 === 0) {
                    return `${calc2} day ago`;
                } else if (calc3 === 1) {
                    return `${calc2} day and ${calc3} hour ago`;
                } else {
                    return `${calc2} day and ${calc3} hours ago`;
                }
            } else {
                if (calc3 === 0) {
                    return `${calc2} days ago`;
                } else if (calc3 === 1) {
                    return `${calc2} days and ${calc3} hour ago`;
                } else {
                    return `${calc2} days and ${calc3} hours ago`;
                }
            }
        }
        return `${diffInHours} hrs ago`
    }
    const calculateCommentDays = (createdAt:string) => {
        const createdDate = new Date(createdAt);
        const now = Date.now();
        const diffInMs = now - createdDate.getTime();
        if (diffInMs < 1000 * 60 * 60) {
            return "Just now!";
        }
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const calc = diffInHours / 24;
        const calc2 = calc.toString()[0];
        const calc3 = diffInHours - +calc2 * 24;
        if (diffInHours === 24) {
            return '1 day ago'
        }
        if (calc > 1) {
            if (calc2 === "1") {
                if (calc3 === 0) {
                    return `${calc2} day ago`;
                } else if (calc3 === 1) {
                    return `${calc2} day ago`;
                } else {
                    return `${calc2} day ago`;
                }
            } else {
                if (calc3 === 0) {
                    return `${calc2} days ago`;
                } else if (calc3 === 1) {
                    return `${calc2} days ago`;
                } else {
                    return `${calc2} days ago`;
                }
            }
        }
        return `${diffInHours} hrs ago`
    }
    return (
        <div className='max-w-[640px] mb-4 bg-white rounded-[8px] border border-gray-300 p-3 mx-4 sm:mx-auto'>
            <div className='flex gap-x-3 mb-3 justify-start items-center'>
                <div>
                    <Avatar className='w-9 h-9'>
                        <AvatarFallback>{item.userId.userName[0] + item.userId.userName[1]}</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div><h1 className='font-medium'>{item.userId.userName}</h1></div>
                    <div><h1 className='text-sm text-gray-600 font-medium'>{calculateDays()}</h1></div>
                </div>
            </div>
            {item.content && <div className='text-start mb-2 px-1 text-gray-600'>
                <h1 className='text-[15px]'>{item.content}</h1>
            </div>}
            {item.media && <div className='w-full bg-gray-200 rounded-xl flex justify-center items-center mb-2'>
                <img src={item.media} alt="" />
            </div>}
            <div className='flex justify-between mb-2 items-center'>
                <div className='flex justify-start ps-2 gap-x-1 items-center'>
                    <Image src={BlueLike} width={19} alt='reaction' />
                    <h1 className='text-sm text-gray-600 font-medium'>{item.likes.length}</h1>
                </div>
                <div className='flex justify-center pe-2 gap-x-2 items-center'>
                    <h1 className='text-sm text-gray-600 font-medium'>{item.comments.length}</h1>
                    <h1 className='text-sm text-gray-600 font-medium'>Comments</h1>
                </div>
            </div>
            <div className='flex justify-center w-full gap-x-2 items-center'>
                {item.likes.includes(user?._id) ? <Button onClick={() => likePost(item._id, index)} className='bg-gray-200 hover:bg-gray-300 flex justify-center items-center flex-1  font-medium text-base text-[#1e40af]'>
                    <Image className='rotate-180' src={Like} width={20} alt='like' />
                    Unlike
                </Button> : <Button onClick={() => likePost(item._id, index)} className='bg-gray-200 hover:bg-gray-300 flex justify-center items-center flex-1  font-medium text-base text-[#1e40af]'>
                    <Image src={Like} width={20} alt='like' />
                    Like
                </Button>}
                <Button onClick={() => setShowModal(!showModal)} className='bg-gray-200 hover:bg-gray-300 flex justify-center items-center flex-1  font-medium text-base text-[#1e40af]'>
                    <Image src={Comment} width={20} alt='like' />
                    Comment
                </Button>
            </div>
            {showModal && <div>
                {item.comments.length > 0 && <ScrollArea className="h-[200px] mt-2 w-full rounded-md border p-4">
                    {item.comments.map((item) => {
                        return <div key={item._id} className=''>
                            <div className='flex gap-x-3 justify-start items-center'>
                                <div>
                                    <Avatar className='w-8 h-8'>
                                        <AvatarFallback>{item.userId.userName[0] + item.userId.userName[1]}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <div><h1 className='font-normal text-sm'>{item.userId.userName}</h1></div>
                                    <div><h1 className='text-[15px] text-gray-600 mt-[2px] font-medium'>{item.text}</h1></div>
                                </div>
                            </div>
                            <h1 className='text-gray-600 text-[12px] ms-[2px] mt-[4px]'>{calculateCommentDays(item.createdAt)}</h1>
                            <Separator className='my-[6px]' />
                        </div>
                    })}
                </ScrollArea>}
                <div className='flex mt-2 gap-x-1 items-center'>
                    <Input onChange={(e) => setCommentText(e.target.value)} className='bg-white h-11 focus-visible:outline-gray-400 focus-visible:outline-1 border focus:border-gray-300 rounded-[15px] border-gray-300' type='text' placeholder="Add comment" />
                    <Button onClick={() => commentOnPost(item._id, index)} className='bg-[#1e40af] hover:bg-[#3b5ecf] rounded-[15px] text-white'>Comment</Button>
                </div>
            </div>}
        </div>
    )
}

export default Card