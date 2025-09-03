import { chromium } from "playwright";
import fs from "fs";
import 'dotenv/config'; // works locally with .env

const BASE_URL = process.env.URL;

// ---- Holiday Check ----
const holidays = JSON.parse(fs.readFileSync("holidays.json")).holidays;

// Current date in IST (format YYYY-MM-DD)
const todayIST = new Date().toLocaleDateString("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "numeric", minute: "numeric", hour12: false
});

if (holidays.includes(todayIST)) {
    console.log("🎉 Holiday today:", todayIST, "— Skipping automation.");
    process.exit(0);
}

// ---- Read Action (signin / signout) ----
const action = process.argv[2];
if (!["signin", "signout"].includes(action)) {
    console.error("Please specify 'signin' or 'signout'");
    process.exit(1);
}

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // ---- Login ----
    await page.goto(BASE_URL, {
        waitUntil: "networkidle",
    });

    await page.fill("#username", process.env.USERNAME);
    await page.fill("#password", process.env.PASSWORD);

    await page.click('button[type="submit"]');
    await page.waitForLoadState("networkidle");

    // ---- Attendance Info ----
    await page.waitForSelector("gt-attendance-info gt-button");

    // Locate shadow-root button
    const button = page.locator("gt-attendance-info gt-button").locator('button[name="primary"]');
    const text = (await button.innerText()).trim();

    console.log("Button text:", text);

    if (action === "signin" && text === "Sign In") {
        await button.click();
        console.log("✅ Signed in successfully");
    } else if (action === "signout" && text === "Sign Out") {
        await button.click();
        console.log("✅ Signed out successfully");
    } else {
        console.log("ℹ️ No action needed. Expected:", action, "But found:", text);
    }
    await browser.close();
})();