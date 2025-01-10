import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Register() {
    return (
        <div className="w-full h-[90vh] flex justify-center items-center">
        <Card className="mx-auto w-full max-w-[640px]">
            <CardHeader>
                <CardTitle className="text-3xl text-[#1e40af]">Register</CardTitle>
                <CardDescription>Enter your information to create an account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="full-name">Username</Label>
                    <Input id="full-name" placeholder="shahzaibali" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="shahzaib@example.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="password" type="password" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" placeholder="confirm password"  type="password" required />
                </div>
                <Button className="w-full hover:bg-[#3655bd] bg-[#1e40af]">Register</Button>
                <div className="flex w-full justify-center gap-x-2 items-center">
                        <h1>New here?</h1>
                        <Link href={'/login'}>
                        <h1 className="cursor-pointer underline text-blue-700">Register now!</h1>
                        </Link>
                    </div>
            </CardContent>
        </Card>
        </div>
    )
}