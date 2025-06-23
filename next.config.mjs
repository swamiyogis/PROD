/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  

  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },

  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'x-robots-tag',
              value: '', // Removes x-robots-tag in dev
            },
          ],
        },
      ];
    }

    return [];
  },
};

export default nextConfig;
