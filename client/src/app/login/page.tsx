"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import axios from "@/config/axiosConfig"
export default function Login() {
    const [userNameOrEmail,setUserNameOrEmail] = useState("");
    const [password,setPassword] = useState("");
    const loginUser = async () => {
        const {data} = await axios.post("/login",{
            userNameOrEmail,
            password
        })
    }
    return (
        <div className="w-full px-3 h-[90vh] flex justify-center items-center">
            <Card className="mx-auto w-full max-w-[640px]">
                <CardHeader>
                    <CardTitle className="text-3xl text-[#1e40af]">Login</CardTitle>
                    <CardDescription>Enter your information to Login</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username-or-email">Username or Email</Label>
                        <Input id="username-or-email" onChange={(e) => setUserNameOrEmail(e.target.value)} placeholder="shahzaibali" required minLength={3}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" required minLength={8}/>
                    </div>
                    <Button className="w-full hover:bg-[#3655bd] bg-[#1e40af]">Login</Button>
                    <div className="flex w-full justify-center gap-x-2 items-center">
                        <h1>New here?</h1>
                        <Link href={'/register'}>
                        <h1 className="cursor-pointer underline text-blue-700">Register now!</h1>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}