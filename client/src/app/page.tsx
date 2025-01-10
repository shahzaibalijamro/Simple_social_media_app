"use client";
import Card from '@/components/Card';
import InputForm from '@/components/InputForm'
import React, { useEffect, useRef, useState } from 'react'
import axios from "@/config/axiosConfig"
const Home = () => {
  const [textInput, setTextInput] = useState("");
  const [posts, setPosts] = useState(null);
  const mediaRef = useRef<HTMLInputElement | null>(null);
  const getAllPosts = async () => {
    const {data} = await axios.get("/posts");
    setPosts(data)
  }
  useEffect(() => {
    (async()=>{
      await getAllPosts()
    })()
  },[])
  console.log(posts);
  
  const addPost = async () => {
    console.log(mediaRef.current?.files?.[0]);
    console.log(textInput);
  }
  return (
    <>
      <InputForm setTextInput={setTextInput} mediaRef={mediaRef} addPost={addPost} />
      <div className='h-6 w-full'></div>
      <Card username='Shahzaib' comments={200} image='https://images.pexels.com/photos/30095380/pexels-photo-30095380/free-photo-of-dynamic-portrait-with-vibrant-neon-lighting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' likes={500} time={22} />
      <Card username='Umer' comments={50} image='https://images.pexels.com/photos/29532721/pexels-photo-29532721/free-photo-of-modern-interior-of-oculus-world-trade-center.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' likes={2000} time={23} />
      <Card username='Raza' comments={10} image='https://images.pexels.com/photos/30079555/pexels-photo-30079555/free-photo-of-crescent-moon-over-silhouetted-branches-at-twilight.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' likes={100} time={27} />
      <Card username='Usman' comments={10} image='https://images.pexels.com/photos/29721117/pexels-photo-29721117/free-photo-of-moody-black-and-white-lighthouse-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' likes={150} time={85} />
      <Card username='Ali' comments={1000} image='https://images.pexels.com/photos/30124864/pexels-photo-30124864/free-photo-of-scenic-south-sinai-mountains-and-coastline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' likes={10} time={41} />
      <div className='h-6 w-full'></div>
    </>
  )
}

export default Home