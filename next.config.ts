import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'achat-bucket.s3.eu-north-1.amazonaws.com',
    ],
  },
};

export default nextConfig;
