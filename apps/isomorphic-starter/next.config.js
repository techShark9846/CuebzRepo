/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "isomorphic-furyroad.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Add Cloudinary domain
      },
      {
        protocol: "https",
        hostname: "asset.cloudinary.com", // Add Cloudinary domain
      },
    ],
  },
  transpilePackages: ["core"],
};

// async rewrites() {
//   return [
//     {
//       source: "/api/:path*",
//       destination: "https://admin-assistance-api.onrender.com/:path*", // API URL without `/api`
//     },
//   ];
// },
