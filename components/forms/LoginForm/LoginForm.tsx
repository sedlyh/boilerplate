import React, {useState} from 'react'
import Image from "next/image";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Terminal} from "lucide-react";
import {User} from "@/models/User";
import {NextResponse} from "next/server";

const LoginForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const formSchema = z.object({

        email: z.string().email({
            message: "Please enter a valid email address.",
        }),
        password: z.string().min(8, {
            message: "Enter a valid password",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit( values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setMessage("");
        try {
            const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email : values.email, password : values.password }),
            headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (!res.ok) return setMessage(data.error);
            setMessage("Login successful. Redirecting...");
            setTimeout(() => router.replace("/push/welcome"), 2000);}
        catch (error) {
        setMessage("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className=" relative overflow-hidden flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 pt-0 ">
            <Image
                src="/logo.svg"        // replace with your asset
                alt=""
                fill                     // stretches edge-to-edge
                className="object-cover size-3 pointer-events-none -z-10 opacity-3 transform-3d blur-sm"  // stay behind + ignore clicks
                priority                 // optional: avoids flicker
            />
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href="/"
                      className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 flex items-center gap-2 self-center">
                    <span className="sr-only">Home</span>
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="inline align-middle mr-2"
                        priority
                    />
                    UX
                </Link>
                <Card className="border-orange-300" >
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl text-orange-500">Welcome Back!</CardTitle>
                        <CardDescription className="text-orange-400">
                            Login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500">Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="exmaple@gmail.com" className="border-orange-300" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500">Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Dummy123*" className="border-orange-300" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            <Link href="/auth/forgot" className="text-orange-500 text-sm">
                                                Forgot password ?
                                            </Link>
                                        </FormItem>
                                    )}
                                />
                                <div className="w-full flex-col flex object-center justify-center">
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        className="text-orange-400 border-orange-300"
                                    >
                                        {isLoading ? "Logging in..." : "Login"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                {message && (
                    <Alert variant="default" className="border-orange-300">
                        <Terminal />
                        <AlertTitle className="text-orange-500">Heads up!</AlertTitle>
                        <AlertDescription>
                            {message}
                        </AlertDescription>
                    </Alert>
                )}

            </div>
            <Link href="/auth/signup" className="text-orange-500 text-sm">
                Create an Account
            </Link>


        </div>
    )
}
export default LoginForm
