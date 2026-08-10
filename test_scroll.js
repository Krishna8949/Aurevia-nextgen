const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

(async () => {
  console.log("Starting browser check...");
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const screenshotsDir = path.join(__dirname, "screenshots");

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setCacheEnabled(false);

  const consoleLogs = [];
  page.on("console", (msg) => {
    consoleLogs.push(`[CONSOLE ${msg.type()}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => {
    consoleLogs.push(`[ERROR] ${err.toString()}`);
  });
  page.on("requestfailed", (request) => {
    consoleLogs.push(`[REQ_FAIL] ${request.url()} - ${request.failure()?.errorText || "failed"}`);
  });

  try {
    console.log("Navigating to http://localhost:3000...");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });

    // Wait a couple of seconds to make sure hydration is complete
    await new Promise((r) => setTimeout(r, 2000));

    const pageStats = await page.evaluate(() => {
      return {
        height: document.body.scrollHeight,
        windowHeight: window.innerHeight,
        runwayHeight: document.querySelector(".runway")?.clientHeight || 0,
        chaptersCount: document.querySelectorAll("[data-chapter-index]").length,
      };
    });
    console.log("Initial Page Stats:", pageStats);

    console.log("Page loaded. Taking screenshot of load state...");
    await page.screenshot({ path: path.join(screenshotsDir, "01_load.png") });

    const scrolls = [
      { name: "02_chapter2", px: 1300 },
      { name: "03_chapter3", px: 3200 },
      { name: "04_chapter5", px: 5500 },
      { name: "04_chapter5_real", px: 9500 },
      { name: "05_chapter8", px: 14000 },
      { name: "06_chapter11", px: 23000 },
      { name: "07_chapter30", px: 65000 },
    ];

    for (const sc of scrolls) {
      console.log(`Scrolling to ${sc.px}px (${sc.name})...`);
      
      const scrollResult = await page.evaluate((y) => {
        window.scrollTo(0, y);
        return {
          scrollY: window.scrollY,
          bodyHeight: document.body.scrollHeight,
        };
      }, sc.px);
      console.log(`Scroll result for ${sc.name}: scrollY=${scrollResult.scrollY}, bodyHeight=${scrollResult.bodyHeight}`);

      // Wait for scrub transition animation to settle
      await new Promise((r) => setTimeout(r, 1500));
      await page.screenshot({ path: path.join(screenshotsDir, `${sc.name}.png`) });
    }

    console.log("Scroll check complete. Writing logs...");
    fs.writeFileSync(path.join(__dirname, "browser_logs.txt"), consoleLogs.join("\n"));
    console.log("Success! Screenshots saved to screenshots/ directory.");

  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await browser.close();
  }
})();
