/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vacina-one-bkend.page.gd',
      },
    ],
  },
};

module.exports = nextConfig;
