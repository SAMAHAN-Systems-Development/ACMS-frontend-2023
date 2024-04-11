/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '54321',
        pathname: '/storage/v1/object/public/payment/*',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '54321',
        pathname: '/storage/v1/object/public/valid_id/*',
      },
      {
        protocol: 'https',
        hostname: 'fjqloxpyknqccretzoyt.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/payment/*',
      },
      {
        protocol: 'https',
        hostname: 'fjqloxpyknqccretzoyt.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/valid_id/*',
      },
    ],
  },
};

module.exports = nextConfig;
