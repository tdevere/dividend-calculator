/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */

    // Disable standalone output for initial Azure deployment
    // output: "standalone",

    // Optimize for production deployment
    poweredByHeader: false,
    compress: true,

    // Image optimization settings for Azure
    images: {
        domains: ["localhost", "via.placeholder.com"],
        unoptimized: process.env.NODE_ENV === "production",
    },

    // Environment variables
    env: {
        CUSTOM_KEY: process.env.CUSTOM_KEY,
    },

    // Security headers
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                ],
            },
        ];
    },

    // Webpack configuration for Azure compatibility
    webpack: (config, { isServer }) => {
        // Add path aliases for Azure build compatibility
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': require('path').join(__dirname, 'src'),
        };
        
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            };
        }
        return config;
    },

    // Enable experimental features for better performance
    experimental: {
        optimizeCss: true,
    },
};

module.exports = nextConfig;
