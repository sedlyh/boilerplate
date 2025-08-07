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
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Terminal} from "lucide-react";


const formSchema = z.object({

    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    code: z.string().min(6, {
        message: "Code must be at least 6 characters.",
    }),
})




export function ConfirmSignupForm() {
    const [disabled, setDisabled] = useState(true);
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const timer = setTimeout(() => {
            setDisabled(false)
        }, 60000)

        return () => clearTimeout(timer) // Cleanup the timer
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            code: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setMessage("");
        try {
            const res = await fetch("/api/auth/confirm", {
                        method: "POST",
                        body: JSON.stringify({ email: values.email, code: values.code }),
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
            {disabled ? (
                // Render as a disabled-looking element
                <span className="text-muted-foreground text-sm">
                  Resend Confirmation code in 60s
                </span>
            ) : (
                <Link href="/auth/resend" className="text-orange-500 text-sm">
                    Resend Code
                </Link>
            )}
        </div>
    )
}