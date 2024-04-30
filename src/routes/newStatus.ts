import express from "express"
const router = express.Router()

const puppeteer = require("puppeteer-core")
const chromium = require("@sparticuz/chromium-min")

export const dynamic = "force-dynamic"

let status = {
  updated_at: getTime(),
  bridges: [],
}

// let status = null

function getTime() {
  let now = new Date()
  let year = now.getFullYear()
  let month = ("0" + (now.getMonth() + 1)).slice(-2)
  let day = ("0" + now.getDate()).slice(-2)
  let hours = ("0" + now.getHours()).slice(-2)
  let minutes = ("0" + now.getMinutes()).slice(-2)
  let seconds = ("0" + now.getSeconds()).slice(-2)
  let offset = -now.getTimezoneOffset()
  let offsetHours = ("0" + offset / 60).slice(-2)
  let offsetMinutes = ("0" + (offset % 60)).slice(-2)
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetHours}:${offsetMinutes}`
}

async function scrapeStatus() {
  const endpoint1 =
    "https://seaway-greatlakes.com/bridgestatus/detailsnai?key=BridgeSCT"

  const endpoint2 =
    "https://seaway-greatlakes.com/bridgestatus/detailsnai?key=BridgePC"

  const browser = await puppeteer.launch({
    args: [
      ...chromium.args,
      "--hide-scrollbars",
      "--disable-web-security",
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
    ),
    headless: chromium.headless,
    // headless: 'new',
    ignoreHttpsErrors: true,
  })

  async function getStatus(xpath: string, index: number) {
    try {
      const page = await browser.newPage()

      if (index > 5) {
        // south bridges
        await page.goto(endpoint2)
      } else {
        // north bridges
        await page.goto(endpoint1)
      }

      const [el] = await page.$x(xpath)
      const txt = await el.getProperty("innerText")
      const rawTxt = await txt.jsonValue()

      return rawTxt
    } catch (e) {
      return null
    }
  }

  let statusList: {
    id: number
    name: string
    location: string
    status: string
  }[] = []

  let fetchStatus = true
  let i = 1
  while (fetchStatus) {
    let statusValue = await getStatus(
      `/html/body/div/table/tbody/tr[${
        i + 1
      }]/td/table/tbody/tr/td[2]/p[2]/span`,
      i
    )

    if (statusValue != null || i < 9) {
      const bridgeNames: Record<number, string> = {
        1: "1",
        2: "3A",
        3: "4",
        4: "5",
        5: "11",
        6: "19",
        7: "19A",
        8: "21",
      }

      const locations: Record<number, string> = {
        1: "Lakeshore Rd.",
        2: "Carlton St.",
        3: "Queenston St.",
        4: "Glendale Ave.",
        5: "Highway 20",
        6: "Main St.",
        7: "Mellanby Ave.",
        8: "Clarence St.",
      }

      console.log(status)

      let jsonData = {
        id: i,
        name: `Bridge ${bridgeNames[i]}`,
        location: locations[i],
        status: statusValue,
      }

      statusList.push(jsonData)
    } else {
      fetchStatus = false
    }
    i++
  }

  browser.close()

  console.log({ statuses: statusList })
  //   status.bridges = statusList
  status.bridges = statusList
}

scrapeStatus()

setInterval(scrapeStatus, 60000)

router.get("/", (req, res) => {
  res.json(status)
})

module.exports = router
