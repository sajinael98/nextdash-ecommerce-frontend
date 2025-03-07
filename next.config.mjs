/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: `http://localhost:8080/:path*`, // Proxy to Backend,
      },
      {
        source: "/free-api/:path*",
        destination: `http://localhost:8080/:path*`, // Proxy to Backend,
      },
    ];
  },
};

export default nextConfig;
