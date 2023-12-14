/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    compiler: {
        removeConsole: {
            exclude: ['error'],
        },
    },
    experimental: {
        swcTraceProfiling: true,
    },
}

module.exports = nextConfig
