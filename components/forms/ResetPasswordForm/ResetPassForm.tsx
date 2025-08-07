"use client"
import React, {useEffect, useState} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp"
import {useRouter} from "next/navigation";
import {Terminal} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";


const formSchema = z.object({

    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    code: z.string().min(6, {
        message: "Code must be at least 6 characters.",
    }),
    newPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .refine((val) => /[a-z]/.test(val), {
            message: "Password must contain at least one lowercase letter",
        })
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine((val) => /\d/.test(val), {
            message: "Password must contain at least one number",
        })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
            message: "Password must contain at least one special character",
        }),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export function ResetPassForm() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            code: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setMessage("");
        console.log(values)
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                body: JSON.stringify({ email: values.email, code: values.code, newPassword: values.newPassword }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            console.log(data)

            if (!res.ok) {
                setMessage(data.error || "Signup failed");
                return;
            }

            setMessage("Signup successful! You can now log in.");
            setTimeout(() => router.push("/auth/login"), 2000);
        } catch (error) {
            setMessage("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="relative overflow-hidden flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 pt-0">
            <Image
                src="/logo.svg"
                alt=""
                fill
                className="object-cover size-3 pointer-events-none -z-10 opacity-3 transform-3d blur-sm"
                priority
            />
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link
                    href="/"
                    className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 flex items-center gap-2 self-center"
                >
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
                <Card className="border-orange-300">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl text-orange-500">Confirm your email</CardTitle>
                        <CardDescription className="text-orange-400">
                            And let&apos;s go straight to sign in
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
                                                <Input
                                                    placeholder="example@gmail.com"
                                                    className="border-orange-300"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Reenter your email address
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500">Code</FormLabel>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} className="border-orange-300"/>
                                                    <InputOTPSlot index={1} className="border-orange-300" />
                                                </InputOTPGroup>
                                                <InputOTPSeparator/>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={2} className="border-orange-300" />
                                                    <InputOTPSlot index={3} className="border-orange-300" />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={4} className="border-orange-300" />
                                                    <InputOTPSlot index={5} className="border-orange-300" />
                                                </InputOTPGroup>
                                            </InputOTP>
                                            <FormDescription>
                                                Enter the confirmation code sent to your email
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500">New Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="example@gmail.com"
                                                    className="border-orange-300"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Define  your new Password
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-500"></FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="example@gmail.com"
                                                    className="border-orange-300"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Confirm your Password
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="w-full flex-col flex object-center justify-center">
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        className="text-orange-400 border-orange-300"
                                    >
                                        {isLoading ? "Confirming..." : "Confirm"}
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
        </div>
    )
}