import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ufs.sh',
      },
    ],
  },
  transpilePackages: ['@fontsource/special-gothic-expanded-one'],
};

export default withContentlayer(nextConfig);


