const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    qualities: [75, 85, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      /* Instagram CDN patterns */
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-*.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "*.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "instagram.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "test.com", // ✅ ADD THIS LINE
      },
    ],
  },
};

export default nextConfig;