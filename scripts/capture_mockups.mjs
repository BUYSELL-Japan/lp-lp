import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'images');

const targets = [
  { url: 'https://demo-steak.global-reaches.com', file: 'ember_mockup.jpg' },
  { url: 'https://demo-yakiniku.global-reaches.com', file: 'blaze_mockup.jpg' },
  { url: 'https://demo-yakitori.global-reaches.com', file: 'char_mockup.jpg' },
  { url: 'https://demo-izakaya.global-reaches.com', file: 'warm_mockup.jpg' },
  { url: 'https://demo-kappo.global-reaches.com', file: 'kura_mockup.jpg' },
  { url: 'https://demo-cafe.global-reaches.com', file: 'shiro_mockup.jpg' },
  { url: 'https://demo-ramen.global-reaches.com', file: 'brush_mockup.jpg' },
  { url: 'https://demo-soba.global-reaches.com', file: 'mist_mockup.jpg' },
  { url: 'https://demo-sweets.global-reaches.com', file: 'pop_mockup.jpg' },
];

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  for (const { url, file } of targets) {
    const outPath = path.join(outDir, file);
    console.log(`Navigating to ${url} ...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    } catch (e) {
      console.warn(`  networkidle timed out for ${url}, falling back to load state: ${e.message}`);
      await page.goto(url, { waitUntil: 'load', timeout: 45000 });
    }
    await page.waitForTimeout(1500);
    await page.screenshot({ path: outPath, type: 'jpeg', quality: 85, clip: { x: 0, y: 0, width: 1280, height: 800 } });
    console.log(`  Saved ${outPath}`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
