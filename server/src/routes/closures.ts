import express from "express"
const router = express.Router()

const puppeteer = require("puppeteer-core")
const chromium = require("@sparticuz/chromium-min")

export const dynamic = "force-dynamic"

let closures = null

async function scrapeClosures() {
  const endpoint =
    "https://seaway-greatlakes.com/bridgestatus/detailsnai?key=BridgeSCT"

  const browser = await puppeteer.launch({
    args: [
      ...chromium.args,
      "--hide-scrollbars",
      "--disable-web-security",
    ],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
    ),
    headless: chromium.headless,
    ignoreHttpsErrors: true,
  })

  async function getClosures(xpath: string) {
    try {
      const page = await browser.newPage()
      await page.goto(endpoint)

      const [el2] = await page.$x(xpath)
      const txt2 = await el2.getProperty("innerText")
      const rawTxt2 = await txt2.jsonValue()

      return rawTxt2
    } catch (e) {
      return null
    }
  }

  let closureList: {
    id: number
    bridge_id: number
    time_string: string
    closed_for: string
    purpose: string
  }[] = []

  let fetchClosures = true
  let i = 1

  while (fetchClosures) {
    let closure = await getClosures(
      `//*[@id="rcorners4"]/tbody/tr/td/div[${i}]`
    )

    if (closure != null) {
      const bridges: Record<string, number> = {
        "1": 1,
        "3A": 2,
        "4": 3,
        "5": 4,
        "11": 5,
        "19": 6,
        "19A": 7,
        "21": 8,
      }

      console.log(closure)

      let jsonData = {
        id: i + 200,
        bridge_id:
          bridges[closure.split("Bridge ")[1].split(" Closure. Effective")[0]],
        time_string: closure.split("Effective: ")[1].split(". Impact")[0],
        closed_for: closure.split("Impact: ")[1].split(". Reason:")[0],
        purpose: closure.split("Reason: ")[1].split(".")[0],
      }

      closureList.push(jsonData)
    } else {
      fetchClosures = false
    }
    i++
  }

  browser.close()

  console.log({ closures: closureList })
  closures = closureList
}

scrapeClosures()
setInterval(scrapeClosures, 600000)

router.get("/", (req, res) => {
  res.json(closures)
})

module.exports = router
