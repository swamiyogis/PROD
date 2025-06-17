/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    // Remove x-robots-tag header in development
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'x-robots-tag',
              value: '', // empty value removes the header
            },
          ],
        },
      ];
    }

    // No change in production
    return [];
  },
};

export default nextConfig;
