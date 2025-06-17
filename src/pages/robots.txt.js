// src/pages/robots.txt.js
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /mysessions

Sitemap: https://swamiyogi.com/sitemap.xml`);
}
