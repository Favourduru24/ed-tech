/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'],
    remotePatterns: [{
      protocol: "https",
      hostname: "**",
    }],
  },
  // Critical for Vercel deployments:
  output: 'standalone', // Or remove if using static export
  trailingSlash: true, // Prevents 404s on URL navigation
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard', // Example: Redirect root to a valid page
        permanent: true,
      },
    ];
  },
};

export default nextConfig;