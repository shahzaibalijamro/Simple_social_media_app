"use client";
import Card from '@/components/Card';
import InputForm from '@/components/InputForm'
import React, { useEffect, useRef, useState } from 'react'
import axios from "@/config/axiosConfig"
import { Progress } from '@/components/ui/progress';
import Head from 'next/head';
interface Item {
  userId: {
    userName: string; // The username of the post creator
  };
  comments: {
    length: number; // The number of comments
  };
  media: string; // The URL or path to the media (image/video)
  likes: {
    length: number; // The number of likes
  };
  createdAt: string; // The creation date of the post in ISO string format
  content: string; // The content or text of the post
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [loadingVal, setLoadingVal] = useState(33);
  const mediaRef = useRef<HTMLInputElement | null>(null);
  const getAllPosts = async () => {
    setLoadingVal(80);
    try {
      const { data } = await axios.get("/posts");
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
    console.log(mediaRef.current?.files?.[0]);
    console.log(textInput);
  }
  return (
    <>
      <Head>
        <title>Home - My App</title>
      </Head>
      <div className='h-6 w-full'></div>
      <InputForm setTextInput={setTextInput} mediaRef={mediaRef} addPost={addPost} />
      <div className='h-6 w-full'></div>
      <div>
        {posts.length > 0 && !loading ? posts.map((item: Item) => {
          return <Card username={item.userId.userName} comments={item.comments.length} image={item.media} likes={item.likes.length} time={item.createdAt} text={item.content} />
        }) : posts.length === 0 && !loading ? <div className='w-full justify-center items-center mt-4 flex'><h1>No posts found!</h1></div> : posts.length === 0 && loading ? <div className='max-w-[200px] mx-auto px-4 justify-center items-center mt-4 flex'><Progress value={loadingVal} /></div> : <></>}
      </div>
      <div className='h-6 w-full'></div>
    </>
  )
}

export default Home