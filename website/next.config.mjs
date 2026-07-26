/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  // Canonical host is the apex (see SITE_URL). Permanently redirect www so the
  // two hostnames don't split ranking signal once DNS goes live.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.lastagencyhere.com' }],
        destination: 'https://lastagencyhere.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
