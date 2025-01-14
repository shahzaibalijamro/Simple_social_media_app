"use client";
import Card from '@/components/Card';
import InputForm from '@/components/InputForm'
import React, { useEffect, useRef, useState } from 'react'
import axios from "@/config/axiosConfig"
import { Progress } from '@/components/ui/progress';
import Head from 'next/head';
import { toast, Toaster } from 'sonner';
import { useSelector } from 'react-redux';

interface tokenState {
  token: {
    accessToken: string,
  }
}

interface singlePost {
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

interface userState {
  user: {
      user: {
          userName: string
      },
  }
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [posts, setPosts] = useState<singlePost[]>([]);
  const user = useSelector((state: userState) => state.user.user);
  const [loadingVal, setLoadingVal] = useState(33);
  const accessToken = useSelector((state: tokenState) => state.token.accessToken);
  const mediaRef = useRef<HTMLInputElement | null>(null);
  const getAllPosts = async () => {
    setLoadingVal(80);
    try {
      const { data } = await axios.get("/api/v1/posts");
      setLoadingVal(90);
      console.log(data);
      setPosts(data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    (async () => {
      await getAllPosts()
    })()
  }, [])
  const addPost = async () => {
    if (!accessToken) {
      return toast("Unauthorized!", {
        description: `You need to log in to add a post. Please log in and try again.`,
        action: {
          label: "OK",
          onClick: () => console.log("ok"),
        },
      })
    }
    if (mediaRef.current?.files?.[0] === undefined && (!textInput || textInput.trim() === "")) {
      return toast("Error!", {
        description: `Please provide either a file or some text content before submitting.`,
        action: {
          label: "OK",
          onClick: () => console.log("ok"),
        },
      })
    };
    const formData = new FormData();
    if (mediaRef.current?.files?.[0] !== undefined) {
      formData.append("file", mediaRef.current?.files?.[0])
    }
    if (!(!textInput || textInput.trim() === "")) {
      formData.append("content", textInput)
    }
    try {
      const { data } = await axios.post("/api/v1/post", formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      const { post } = data;
      post.userId = {
        userName: user.userName,
      }
      setPosts([...posts, post]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Head>
        <title>Home - My App</title>
      </Head>
      <Toaster />
      <div className='h-6 w-full'></div>
      <InputForm setTextInput={setTextInput} mediaRef={mediaRef} addPost={addPost} />
      <div className='h-6 w-full'></div>
      <div>
        {posts.length > 0 && !loading ? posts.map((item: singlePost) => {
          return <Card username={item.userId.userName} comments={item.comments.length} image={item.media} likes={item.likes.length} time={item.createdAt} text={item.content} />
        }) : posts.length === 0 && !loading ? <div className='w-full justify-center items-center mt-4 flex'><h1>No posts found!</h1></div> : posts.length === 0 && loading ? <div className='max-w-[200px] mx-auto px-4 justify-center items-center mt-4 flex'><Progress value={loadingVal} /></div> : <></>}
      </div>
      <div className='h-6 w-full'></div>
    </>
  )
}

export default Home