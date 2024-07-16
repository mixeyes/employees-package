/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
    },
    redirects: async () => {
        return [
            {
                source: "/api",
                destination: "/home",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
