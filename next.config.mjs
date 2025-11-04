/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'big-comfort-da5fef7983.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
