"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FormEvent, useState } from "react"

export default function Register() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com)$/;
    const [userName,setUserName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [confirmPassword,setConfirmPassword] = useState<string>("");
    const registerUser = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!emailRegex.test(email)) {
            return alert("Email format is incorrect!")
        }
        console.log(userName);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        console.log(123);
    }
    return (
        <div className="w-full h-[90vh] flex justify-center items-center">
            <Card className="mx-auto w-full max-w-[640px]">
                <CardHeader>
                    <CardTitle className="text-3xl text-[#1e40af]">Register</CardTitle>
                    <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>
                <form onSubmit={registerUser}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input onChange={(e) => setUserName(e.target.value)} id="username" placeholder="shahzaibali" required minLength={3}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="shahzaib@example.com" required minLength={"@gmail.com".length}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input onChange={(e) => setPassword(e.target.value)} id="password" placeholder="password" type="password" required minLength={8}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input onChange={(e) => setConfirmPassword(e.target.value)} id="confirm-password" placeholder="confirm password" type="password" required minLength={8} />
                        </div>
                        <Button type="submit" className="w-full hover:bg-[#3655bd] bg-[#1e40af]">Register</Button>
                        <div className="flex w-full justify-center gap-x-2 items-center">
                            <h1>Already own an account?</h1>
                            <Link href={'/login'}>
                                <h1 className="cursor-pointer underline text-blue-700">Login now!</h1>
                            </Link>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    )
}