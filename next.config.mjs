/** @type {import('next').NextConfig} */
const nextConfig = {
  // Local preview address used through the development network.
  allowedDevOrigins: ['172.30.244.151', 'localhost', '127.0.0.1'],
  // Screenshots are pre-encoded WebP. Vercel Image Optimization is an extra
  // cross-border hop from mainland China, and `fill` without sizes requests 3840px.
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/latest.json",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
