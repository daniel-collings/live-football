/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                pathname: "**",
                hostname:"media.api-sports.io",
                port: "",
                protocol: "https"
            }
        ]
    }
};

export default nextConfig;
