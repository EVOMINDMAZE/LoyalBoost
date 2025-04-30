/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add webpack configuration to handle cache issues
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable cache in development to prevent corruption
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;