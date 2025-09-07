/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
          // HSTS solo su HTTPS (Vercel sì): max-age 6 mesi
          { key: "Strict-Transport-Security", value: "max-age=15552000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
