/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            }
        ]
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
