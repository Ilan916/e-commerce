const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

const DOWNLOAD_FOLDER = path.join(__dirname, 'images');
const MAX_IMAGES = 2000;
const DELAY_BETWEEN_REQUESTS = 3000;
const SHOW_BROWSER = true;

async function scrapeImages() {
  const browser = await puppeteer.launch({
    headless: !SHOW_BROWSER,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
  // ICI changer le lien par le lien d'extraction des imagegs de Auchan : exemple : https://www.auchan.fr/oeufs-produits-laitiers/cremerie-oeufs-laits/ca-n0101
  await page.goto('https://www.auchan.fr/', { waitUntil: 'networkidle2' });
  
  try {
    await page.waitForTimeout(3000);
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button'))
        .find(el => el.innerText && el.innerText.toLowerCase().includes('accepter'));
      if (btn) btn.click();
    });
    console.log('✅ Popup détecté et cliqué (Accepter)');
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (error) {
    console.log('⚠️ Aucun popup de cookies détecté');
  }
  
  let previousHeight = 0;
  let imageUrls = new Set();
  
  try {
    while (imageUrls.size < MAX_IMAGES) {
      let newImageUrls = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => {
          if (img.src && img.src.startsWith('https://')) return img.src;
          else if (img.dataset && img.dataset.src) return img.dataset.src;
          return null;
        }).filter(Boolean);
      });
      newImageUrls.forEach(url => imageUrls.add(url));
      
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollBy(0, window.innerHeight)');
      await new Promise(resolve => setTimeout(resolve, 2000));
      let newHeight = await page.evaluate('document.body.scrollHeight');
      if (newHeight === previousHeight) break;
    }
  } catch (error) {
    console.log('❌ Erreur pendant le défilement ou la collecte des images :', error);
  }
  
  console.log(`🔍 Trouvé ${imageUrls.size} images.`);
  console.log('🛑 Le navigateur reste ouvert. Fermez-le manuellement lorsque vous avez terminé.');
  return Array.from(imageUrls).slice(0, MAX_IMAGES);
}

async function downloadImages(imageUrls) {
  await fs.ensureDir(DOWNLOAD_FOLDER);
  for (let [index, url] of imageUrls.entries()) {
    if (index >= MAX_IMAGES) break;
    const filePath = path.join(DOWNLOAD_FOLDER, `image_${index + 1}.jpg`);
    try {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_REQUESTS));
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      await fs.writeFile(filePath, response.data);
      console.log(`✅ Image téléchargée : ${filePath}`);
    } catch (error) {
      console.log(`❌ Erreur téléchargement : ${url}`);
    }
  }
}

(async () => {
  console.log('🚀 Démarrage du scraping d’images sur Auchan.fr...');
  const imageUrls = await scrapeImages();
  if (imageUrls.length > 0) {
    console.log('📥 Téléchargement des images...');
    await downloadImages(imageUrls);
    console.log('🎉 Téléchargement terminé !');
  } else {
    console.log('❌ Aucune image trouvée. Vérifiez la structure du site Auchan.');
  }
})();
