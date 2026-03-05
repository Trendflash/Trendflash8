const fs = require('fs');
const path = require('path');

const baseUrl = 'https://trendflash.github.io/Trendflash8/';
const articlesDir = path.join(__dirname,'../articles');
const files = fs.readdirSync(articlesDir).filter(f=>f.endsWith('.html'));

let urls = files.map(f => `
  <url>
    <loc>${baseUrl}articles/${f}</loc>
  </url>
`).join('\n');

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
  </url>
${urls}
</urlset>`;

fs.writeFileSync(path.join(__dirname,'../sitemap.xml'), sitemap);