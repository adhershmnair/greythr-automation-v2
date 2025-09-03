# 🚀 Greythr Attendance Automation

This project automatically handles **Sign In** (8:00 AM IST) and **Sign Out** (6:00 PM IST) for your company’s attendance system using [Playwright](https://playwright.dev/).  
It runs on **GitHub Actions** every weekday, checks for holidays, and clicks the right attendance button so you don’t have to. 🎯

---

## ✨ Features

- ✅ Automates login and attendance button click (`Sign In` / `Sign Out`)
- ✅ Runs **headless** in the cloud (no manual browser required)
- ✅ Triggered by **GitHub Actions cron jobs** on weekdays
- ✅ Automatically skips custom holidays from `holidays.json`
- ✅ Allows **manual trigger** from the Actions tab
- ✅ Credentials and URLs secured with **GitHub Secrets**

---

## 📂 Project Structure

```text
.github/workflows/attendance.yml   # GitHub Actions workflow definition
greythr.js                         # Playwright automation script
holidays.json                      # Holiday list (YYYY-MM-DD format)
package.json                       # Project dependencies
```
---

## ⚙️ Local Setup (Testing)

1. Clone the repository

    ```bash
    git clone https://github.com/adhershmnair/greythr-automation-v2.git
    cd greythr-automation-v2
    ```

2. Install dependencies

    ```bash
    npm install
    npx playwright install --with-deps chromium
    ```

3. Create a `.env` file (for local runs only)
    ```bash
    URL=your_instance_url
    USERNAME=your_username
    PASSWORD=your_password
    ```

4. Add holidays in `holidays.json`
    ```json
    {
        "holidays": [
            "2025-01-26",
            "2025-08-15",
            "2025-10-02",
            "2025-12-25"
        ]
    }
    ```

5. Test locally
    ```bash
    node greythr.js signin
    node greythr.js signout
    ```
---

## 🔐 GitHub Secrets Setup

Go to your repository → Settings → Secrets and variables → Actions → Add:

```bash
GTRY_URL = https://yourcompany.greythr.com
GTRY_USERNAME = your_username
GTRY_PASSWORD = your_password
```
---

## 🎛️ GitHub Actions Scheduler

The workflow `.github/workflows/attendance.yml` is configured to:

- Run every weekday at:
    ⏰ 08:00 AM IST → `signin`
    ⏰ 06:00 PM IST → `signout`
- Skip on holidays (listed in `holidays.json`)
- Can also be triggered manually from the Actions tab

Cron expressions (UTC):
```
30 2 * * 1-5   # 08:00 AM IST (Mon-Fri)
30 12 * * 1-5  # 06:00 PM IST (Mon-Fri)
```

---

## 🧞 Holiday Handling

- Maintained in holidays.json as YYYY-MM-DD
- On holidays, the script exits gracefully ✅
```json
{
  "holidays": ["2025-08-15", "2025-10-02"]
}
```
---

## 📜 License
MIT License – free to use and modify.

---

## 👨‍💻 Author
Built with ❤️ by [adhershmnair](https://github.com/adhershmnair).
May your mornings be relaxed, and your evenings stress‑free ✨
