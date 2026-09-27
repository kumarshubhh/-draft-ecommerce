import { chromium } from "playwright";
const shotDir = "C:\\Users\\karth\\AppData\\Local\\Temp\\claude\\d--Ecommerce\\306bd9d5-7e2c-4a3a-b068-718fffd8e142\\scratchpad";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto("http://localhost:3000", { waitUntil: "load" });
await page.waitForTimeout(1000);
const el = page.getByText("Collections & Curated Edits", { exact: true }).first();
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.screenshot({ path: `${shotDir}/edits-swapped.png` });

console.log("errors:", JSON.stringify(errors));
await browser.close();
