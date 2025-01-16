"use client";


import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react'
import axios from "@/config/axiosConfig"
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

interface userState {
    user: {
        user: {
            userName: string
        },
    }
}

interface tokenState {
    token: {
        accessToken: string,
    }
}

const Page = ({ params, }: { params: Promise<{ id: string }> }) => {
    const [id, setId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [loadingVal, setLoadingVal] = useState(33);
    const accessToken = useSelector((state: tokenState) => state.token.accessToken);
    const [posts, setPosts] = useState([]);
    const user = useSelector((state: userState) => state.user.user);
    useEffect(() => {
        const resolveParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };
        resolveParams();
    }, [params]);
    const authenticateUserState = async () => {
        setLoadingVal(90);
        try {
            const { data } = await axios.post("/api/v1/protected");
            console.log(data);
            setLoading(false);
        } catch (error: any) {
            console.log(error);
            const errorMsg = error.response?.data.message;
            if (errorMsg === "Refresh token is required! Please log in again.") {
                router.replace("/login");
            }
        }
    }
    useEffect(() => {
        if (!accessToken) {
            authenticateUserState();
        }
    }, []);
    const item = {
        userId: {
            userName: "Shahzaib"
        }
    }
    return (
        <>
            {loading ? <div className='max-w-[200px] h-[80vh] mx-auto px-4 justify-center items-center mt-4 flex'><Progress value={loadingVal} /></div> : <div className='max-w-[640px] w-full mx-auto md:mt-16 mt-10'>
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
                {user.userName.toString() === id?.toString() && <div className='mt-6 flex flex-col justify-center items-center'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className='bg-[#e40000] hover:bg-[#e4000096]'>
                                Delete account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button className='bg-[#1e40af] hover:bg-[#1e40afcc] mt-4'>Logout</Button>
                </div>}
                <div className='mt-10 text-center'>
                    <h1 className='text-[22px] font-medium'>My Posts</h1>
                    <Separator className='mt-6' />
                </div>
            </div>}
        </>
    )
}

export default Page