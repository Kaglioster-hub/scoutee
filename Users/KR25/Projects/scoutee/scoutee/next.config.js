/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true // solo se usi le nuove API
  }
};

module.exports = nextConfig;
