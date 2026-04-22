const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.BACKEND_PATH + "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
