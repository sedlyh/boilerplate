// components/Footer.js
import Link from 'next/link';
import {Button} from "@/components/ui/button";
import Image from 'next/image';
import {footerLinks} from "@/constants";

export default function Footer() {
    return (
        <footer className="relative px-6 pt-16 pb-8 bg-gradient-to-t from-orange-600 via-orange-400 to-orange-300 text-orange-100 shadow-xl overflow-hidden">
            {/* Decorative Blob */}
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-orange-500/30 blur-3xl rounded-full pointer-events-none animate-pulse"></div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
                {/* Logo & Social */}
                <div className="flex-1">
                    <Link href="/" className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
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
                    <p className="mt-4 max-w-xs text-orange-200 text-sm">
                        Crafting clean interfaces & code. Built for the future, designed for now.
                    </p>

                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col sm:flex-row gap-8 text-sm mt-8 md:mt-0">


                    {footerLinks.map(section => (
                        <div key={section.title}>
                            <h4 className="font-bold text-orange-900 uppercase mb-3 tracking-wider">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map(link => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-orange-200 hover:text-orange-900 transition">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </nav>


            </div>
            <div className="mt-14 border-t border-orange-700/50 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-orange-400">
                <span>&copy; {new Date().getFullYear()} Sedly. All rights reserved.</span>
                <span className="mt-2 md:mt-0">
          Made with <span className="text-orange-400">♥</span> by Sedly
        </span>
            </div>
        </footer>
    );
}
