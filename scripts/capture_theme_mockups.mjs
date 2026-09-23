import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'images');

const targets = [
  { url: 'https://demo-standard.global-reaches.com', file: 'standard_mockup.jpg' },
  { url: 'https://demo-modern.global-reaches.com', file: 'modern_mockup.jpg' },
  { url: 'https://demo-elegant.global-reaches.com', file: 'elegant_mockup.jpg' },
  { url: 'https://demo-tropical.global-reaches.com', file: 'tropical_mockup.jpg' },
  { url: 'https://demo-dining.global-reaches.com', file: 'dining_mockup.jpg' },
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
