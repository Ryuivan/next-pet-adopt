/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nazdilhaaxpsmyrfyhjf.supabase.co",
      },
    ],
  },
};

export default nextConfig;
