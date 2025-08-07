'use client'

import React, { useRef, useState, useEffect } from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import Link from "next/link";
import {menuItems} from "@/constants";
import { Button } from "@/components/ui/button"
import {cn} from "@/lib/utils";


export function ListItem({ href, title, children }: { href: string, title: string, children: React.ReactNode }) {
    return (
        <a href={href} className="block space-y-1 rounded-md p-3 hover:bg-orange-100">
            <div className="text-sm font-medium">{title}</div>
            <p className="text-sm text-gray-500">{children}</p>
        </a>
    )
}

const NavBar = () => {
    const [show, setShow] = useState(true);
    const lastY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;

            // scroll down  ➜ hide  (wait until we’ve left the very top)
            if (y > lastY.current && y > 80) setShow(false);

            // scroll up    ➜ show  (small buffer prevents jitter)
            if (y < lastY.current - 5) setShow(true);

            lastY.current = y;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full bg-transparent backdrop-blur-md  dark:border-neutral-800",
                "transition-transform duration-300 ease-out",
                show ? "translate-y-0" : "-translate-y-full"
            )}
        >
            <div className="mx-auto flex items-center max-w-7xl px-4 sm:px-6 lg:px-8 h-16 pt-4">
                {/* Logo */}
                {/*Logo color: #FC5800*/}
                <Link href="/public" className="flex-shrink-0">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={50}
                        height={50}
                        priority

                    />
                </Link>
                {/* Nav */}
                <div className="justify-center flex items-center w-full">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {menuItems.map((item, i) => (
                                <NavigationMenuItem  key={i}>
                                    <NavigationMenuTrigger className="text-orange-400 bg-transparent hover:bg-orange-200">{item.title}</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <li className="row-span-3 bg-orange-500 rounded-md">
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                        href="/"
                                                    >
                                                        <div className="mt-4 mb-2 text-lg font-bold " >
                                                            ND UX
                                                        </div>
                                                        <p className="text-muted-foreground text-sm leading-tight">
                                                            Beautifully designed components built with Tailwind CSS.
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            {item.sublinks.map((sublink, j) => (
                                                <ListItem href={sublink.href} title={sublink.title} key={j}>
                                                    {sublink.description || "No description available."}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/*WIP wire up user*/}
                <Button asChild variant="outline" className='bg-orange-500 text-white ml-auto rounded-full '>
                    <Link href={false ? '/welcome' : "/auth/login"}>
                        {false ? "Dashboard" : "Sign In"}
                    </Link>
                </Button>
                </div>
        </nav>



    )


}
export default NavBar
