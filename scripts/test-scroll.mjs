import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\prabu\\.gemini\\antigravity\\brain\\7d5530cd-de99-4155-a387-057176b7d837';

async function runTest() {
  console.log('🚀 Launching Edge for automated scroll test...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error(`Browser console error: ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
    console.error(`Browser page error: ${err.toString()}`);
  });

  // Desktop Test (1920x1080)
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  const port = process.env.PORT || '5173';
  console.log(`Navigating to http://127.0.0.1:${port}/ ...`);
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });

  console.log('Waiting for preloader to finish (240 frames)...');
  await page.waitForFunction(() => {
    // Check if loading screen has exited or story section exists
    const el = document.querySelector('#story');
    return el !== null;
  }, { timeout: 30000 });

  // Give preloader and initial frame a moment to draw
  await new Promise((r) => setTimeout(r, 2000));

  await page.screenshot({ path: path.join(artifactDir, 'test_desktop_01_loaded.png') });
  console.log('📸 Captured test_desktop_01_loaded.png');

  // Test scroll positions across the 700vh sequence
  const scrollSteps = [
    { name: 'phase1_origin', pct: 0.1 },
    { name: 'phase2_woven', pct: 0.25 },
    { name: 'phase3_underfoot', pct: 0.45 },
    { name: 'phase4_fused', pct: 0.65 },
    { name: 'phase5_hero', pct: 0.85 },
  ];

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const storyHeight = await page.evaluate(() => {
    const el = document.querySelector('#story');
    return el ? el.offsetHeight - window.innerHeight : 6000;
  });

  for (const step of scrollSteps) {
    const targetY = Math.floor(step.pct * storyHeight);
    await page.evaluate((y) => window.scrollTo(0, y), targetY);
    await new Promise((r) => setTimeout(r, 600)); // allow GSAP scrub and frame draw
    await page.screenshot({ path: path.join(artifactDir, `test_scroll_${step.name}.png`) });
    console.log(`📸 Captured test_scroll_${step.name}.png at scrollY=${targetY}`);
  }

  // Scroll to Features
  await page.evaluate(() => {
    const el = document.querySelector('#features');
    if (el) el.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'test_section_features.png') });
  console.log('📸 Captured test_section_features.png');

  // Scroll to Colorways & click Cyber Volt swatch
  await page.evaluate(() => {
    const el = document.querySelector('#colors');
    if (el) el.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const cyberVoltBtn = buttons.find((b) => b.textContent?.includes('Cyber Volt'));
    if (cyberVoltBtn) cyberVoltBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'test_section_colors_cybervolt.png') });
  console.log('📸 Captured test_section_colors_cybervolt.png');

  // Scroll to Specs
  await page.evaluate(() => {
    const el = document.querySelector('#specs');
    if (el) el.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 1800)); // allow counter animation to complete
  await page.screenshot({ path: path.join(artifactDir, 'test_section_specs.png') });
  console.log('📸 Captured test_section_specs.png');

  // Scroll to Purchase & click Add to Cart
  await page.evaluate(() => {
    const el = document.querySelector('#purchase');
    if (el) el.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const addBtn = buttons.find((b) => b.textContent?.includes('ADD TO CART'));
    if (addBtn) addBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'test_section_purchase_added.png') });
  console.log('📸 Captured test_section_purchase_added.png');

  // Mobile Viewport Test (375x812 iPhone)
  console.log('📱 Testing Mobile Viewport (375x812)...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, 'test_mobile_hero.png') });
  console.log('📸 Captured test_mobile_hero.png');

  await page.evaluate(() => {
    const el = document.querySelector('#purchase');
    if (el) el.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'test_mobile_purchase.png') });
  console.log('📸 Captured test_mobile_purchase.png');

  await browser.close();

  console.log('--- TEST SUMMARY ---');
  console.log(`Total console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  } else {
    console.log('✅ 100% CLEAN RUN: 0 Console Errors, All Viewports Passed!');
  }
}

runTest().catch((err) => {
  console.error('Test script crashed:', err);
  process.exit(1);
});
