/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: `http://localhost:8080/:path*`, // Proxy to Backend,
      },
    ];
  },
};

export default nextConfig;
