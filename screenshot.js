const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });
  
  console.log("Navigating to http://localhost:3000 ...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const dir = path.join(__dirname, 'public', 'screenshots');
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  const elements = await page.$$('section, footer');
  console.log(`Found ${elements.length} sections/footer elements.`);

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000); // wait for animations
    
    let name = await el.evaluate(e => e.id) || `section_${i}`;
    if (await el.evaluate(e => e.tagName.toLowerCase()) === 'footer') {
      name = 'footer';
    }
    
    const filePath = path.join(dir, `${i.toString().padStart(2, '0')}_${name}.jpg`);
    
    try {
      await el.screenshot({ path: filePath, type: 'jpeg', quality: 90 });
      console.log(`Saved screenshot: ${filePath}`);
    } catch (err) {
      console.log(`Could not screenshot ${name}: ${err.message}`);
    }
  }

  await browser.close();
  console.log("Done!");
})();
