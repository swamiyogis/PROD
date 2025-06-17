// src/pages/sitemap.xml.js
export default function handler(req, res) {
  const hostname = 'https://swamiyogi.com';
  const staticPages = [
    '',
    'auth',
    'contact',
    'faqs',
    'refund',
    'terms',
    'workshops',
    'yoga-day-2025'
  ];

  const urls = staticPages.map((page) => {
    return `
  <url>
    <loc>${hostname}/${page}</loc>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
}
