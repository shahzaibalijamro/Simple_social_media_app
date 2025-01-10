"use client";
import Card from '@/components/Card';
import InputForm from '@/components/InputForm'
import React, { useEffect, useRef, useState } from 'react'
import axios from "@/config/axiosConfig"
const Home = () => {
  const [loading,setLoading] = useState(true)
  const [textInput, setTextInput] = useState("");
  const [posts, setPosts] = useState([]);
  const mediaRef = useRef<HTMLInputElement | null>(null);
  const getAllPosts = async () => {
    try {
      const {data} = await axios.get("/posts");
      setPosts(data)
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    (async()=>{
      await getAllPosts()
    })()
  },[])
  const addPost = async () => {
    console.log(mediaRef.current?.files?.[0]);
    console.log(textInput);
  }
  return (
    <>
      <div className='h-6 w-full'></div>
      <InputForm setTextInput={setTextInput} mediaRef={mediaRef} addPost={addPost} />
      <div className='h-6 w-full'></div>
      <div>
      {posts.length > 0 && !loading ? posts.map(item=>{
        return <Card username='Shahzaib' comments={200} image='https://images.pexels.com/photos/30095380/pexels-photo-30095380/free-photo-of-dynamic-portrait-with-vibrant-neon-lighting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' likes={500} time={22} />
      }) : posts.length === 0 && !loading ? <div className='w-full justify-center items-center mt-4 flex'><h1>No posts found!</h1></div> : posts.length === 0 && loading ? <div className='w-full justify-center items-center mt-4 flex'><h1>Loading...</h1></div> : <></>}
      </div>
      <div className='h-6 w-full'></div>
    </>
  )
}

export default Home