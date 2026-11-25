import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'screenshots');
const base = 'http://localhost:3000/medical-krillion';

async function shotGame(page, name) {
  const box = page.locator('#med-play').first();
  await box.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await box.screenshot({
    path: path.join(outDir, `medical-${name}.png`),
    animations: 'disabled',
  });
  console.log('saved', name);
}

async function clickIf(page, text, timeout = 8000) {
  const btn = page.locator(`button:has-text("${text}")`).first();
  await btn.waitFor({ state: 'visible', timeout });
  await btn.click();
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForSelector('#med-play button:has-text("Play Now")');

  await page.locator('#med-play button:has-text("Play Now")').click();
  await page.waitForSelector('input[aria-label="Your answer"]');
  await page.waitForTimeout(700);
  await shotGame(page, 'prompt');

  await page.fill('input[aria-label="Your answer"]', 'pisiform');
  await clickIf(page, 'Submit Answer');
  await page.waitForSelector('button:has-text("Next Round")');
  await page.waitForTimeout(600);
  await shotGame(page, 'reveal');

  await clickIf(page, 'Next Round');
  await page.waitForSelector('input[aria-label="Your answer"]');
  await clickIf(page, 'Pass');
  await page.waitForSelector('button:has-text("Next Round")');
  await page.waitForTimeout(600);
  await shotGame(page, 'miss');

  for (let i = 0; i < 14; i++) {
    if (await page.locator('button:has-text("Play Again")').count()) break;
    if (await page.locator('button:has-text("See Results")').count()) {
      await clickIf(page, 'See Results');
      await page.waitForTimeout(600);
      break;
    }
    if (await page.locator('button:has-text("Next Round")').count()) {
      await clickIf(page, 'Next Round');
      await page.waitForTimeout(450);
      continue;
    }
    if (await page.locator('button:has-text("Pass"):not([disabled])').count()) {
      await clickIf(page, 'Pass');
      await page.waitForTimeout(800);
      continue;
    }
    await page.waitForTimeout(300);
  }

  await page.waitForSelector('button:has-text("Play Again")', { timeout: 15000 });
  await page.waitForTimeout(600);
  await shotGame(page, 'results');

  await browser.close();
  console.log('done');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
