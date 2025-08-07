"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signupFormSchema } from "@/components/forms/SignupForm/schema"
import {useState} from "react";
import {useRouter} from "next/navigation";
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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Terminal} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


const ProfileForm = () =>  {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })


    async function onSubmit( values: z.infer<typeof signupFormSchema>) {
        setIsLoading(true);
        setMessage("");
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({ email: values.email, password: values.password, username : values.username }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            console.log(data)

            if (!res.ok) {
                setMessage(data.error || "Signup failed");
                return;
            }

            setMessage("Signup successful! You can now log in.");
            setTimeout(() => router.push("/auth/confirm"), 2000);
        } catch (error) {
            setMessage("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className=" relative overflow-hidden flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 pt-0">
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
                <Card className="border-orange-300">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl text-orange-500">Welcome new Guy!</CardTitle>
                        <CardDescription className="text-orange-400">
                            Create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    disabled={isLoading}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-600">Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="johndoe_06" className="border-orange-300"  {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This will be your public display name
                                            </FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    disabled={isLoading}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-600">Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="example@gmail.com" {...field} className="border-orange-300" />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    disabled={isLoading}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-600">Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="MySecurePass123!" className="border-orange-300" {...field} />
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    disabled={isLoading}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-600">Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="MySecurePass123!" className="border-orange-300" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <div className="w-full flex-col flex object-center justify-center ">
                                    <ul className="text-muted-foreground text-sm space-y-2 pb-5">
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-500">✓</span>
                                            <span>At least 8 characters long</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-500">✓</span>
                                            <span>Contains one number</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-500">✓</span>
                                            <span>Contains one uppercase letter</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-500">✓</span>
                                            <span>Contains one lowercase letter</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-500">✓</span>
                                            <span>Contains one special character</span>
                                        </li>
                                    </ul>
                                    <Button type="submit" variant={"outline"} className="text-orange-400 border-orange-300">{isLoading ? "Creating account..." : " Create account"}</Button>
                                </div>
                            </form>
                        </Form>

                    </CardContent>
                </Card>
                {message == "User with this email already exists" && (
                    <Alert variant="default" className="border-orange-300">
                    <Terminal />
                    <AlertTitle className="text-orange-500">Heads up!</AlertTitle>
                    <AlertDescription>
                        {message} <a href="/auth/login" className="text-orange-400"> Login</a>
                    </AlertDescription>

                </Alert> ) }
            </div>

        </div>

    )
}

export default ProfileForm