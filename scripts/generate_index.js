const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname,'../articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.html')).sort().reverse();

let cards = '';
files.forEach(file => {
  const content = fs.readFileSync(path.join(articlesDir,file),'utf8');
  const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
  const pMatch = content.match(/<p>(.*?)<\/p>/);
  const title = titleMatch ? titleMatch[1] : 'タイトル未取得';
  const preview = pMatch ? (pMatch[1].slice(0,80)+(pMatch[1].length>80?'...':'')) : '';
  cards += `<div class="article-card"><h2><a href="articles/${file}">${title}</a></h2><p>${preview}</p></div>\n`;
});

let indexHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TrendFlash | 最新ニュースまとめ</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="hero">
<h1>TrendFlash</h1>
<div class="date" id="currentDate"></div>
</div>
<div class="container">
${cards}
</div>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname,'../index.html'), indexHtml);