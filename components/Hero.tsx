"use client";
import { useScroll, useTransform } from "motion/react";
import React from "react";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";

const Hero = () => {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.0, 1.2]);
    const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.0, 1.2]);
    const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.0, 1.2]);
    const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.0, 1.2]);
    const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

    return (
        <div
            className="h-[300vh] bg-transparent w-full dark:border dark:border-white/[0.1] rounded-md relative pb-150 pt-50 overflow-clip"
            ref={ref}
        >
            <GoogleGeminiEffect
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                description="Sed do eiusmod tempor incididunt ut labore et dolore magnostrud exercitation ullamco laborisequat."
                pathLengths={[
                    pathLengthFirst,
                    pathLengthSecond,
                    pathLengthThird,
                    pathLengthFourth,
                    pathLengthFifth,
                ]}
            />
        </div>
    );
}
export default Hero;