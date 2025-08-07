"use client"
import React, { useState } from "react"
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
import {useRouter} from "next/navigation";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Terminal} from "lucide-react";


const resendFormSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})




export function ForgotPassForm() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof resendFormSchema>>({
        resolver: zodResolver(resendFormSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof resendFormSchema>) {
        setIsLoading(true);
        setMessage("");
        console.log(values)
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email: values.email }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            console.log(data)

            if (!res.ok) {
                setMessage(data.error || "Signup failed");
                return;
            }

            setMessage("Signup successful! You can now log in.");
            setTimeout(() => router.push("/auth/reset"), 2000);
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
                        <CardTitle className="text-xl text-orange-500">Forgot yout password ? </CardTitle>
                        <CardDescription className="text-orange-400">
                            Don't worry we got u
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

                                <div className="w-full flex-col flex object-center justify-center">
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        className="text-orange-400 border-orange-300"
                                    >
                                        {isLoading ? "Sending..." : "Send Code"}
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