import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true, // ✅ this is the key
    },
};

export default nextConfig;
