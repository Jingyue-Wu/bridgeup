export default function About() {
  return (
    <>
      <div className="lg:m-auto lg:max-w-[40%] m-[5%]">
        <h1 className="text-[32px] pt-1 my-5 font-title">About</h1>

        <div className="border-0 my-5 p-5 rounded-[13px] bg-card dark:bg-card_d">
          <h2 className="text-sm font-thin text-text2 dark:text-text2_d mb-5">
            BridgeUp is a free app that provides the most accurate information
            on the Welland Canal bridges.
          </h2>

          <h2 className="text-sm font-thin text-text2 dark:text-text2_d">
            The app is designed to help you efficiently plan your route and
            avoid those long delays at the canal.
          </h2>
        </div>

        <div className="border-0 my-5 p-5 rounded-[13px] bg-card dark:bg-card_d">
          <h1 className="text-xl mb-5">Download on iOS and Android</h1>

          <h2 className="text-sm font-thin mb-5 text-text2 dark:text-text2_d">
            <a href="https://play.google.com/store/apps/details?id=localhost_5173.twa&hl=en&gl=US">
              <div className="border-0 p-3 rounded-[10px] dark:bg-text2 bg-bg text-center">
                <h1 className="text-md">
                  Available on the Google Play Store for Android
                </h1>
              </div>
            </a>
          </h2>

          <h2 className="text-sm font-thin mb-5 text-text2 dark:text-text2_d">
            <span className="font-title">To install from Safari:</span> Tap the
            share icon, scroll down, and tap "Add to Home Screen".
          </h2>

          <h2 className="text-sm font-thin mb-5 text-text2 dark:text-text2_d">
            <span className="font-title">To install from Chrome:</span> Tap the
            three dots in the top-right of the screen, then tap "Add to Home
            Screen".
          </h2>

          <h2 className="text-sm font-thin text-text2 dark:text-text2_d">
            {" "}
            The progressive web app will automatically download to your home
            screen from your browser.
          </h2>
        </div>

        <div className="border-0 my-5 p-5 rounded-[13px] bg-card dark:bg-card_d">
          <h1 className="text-xl mb-5">Data</h1>
          <h2 className="text-sm font-thin mb-5 text-text2 dark:text-text2_d">
            The data is provided by the St. Lawrence Seaway Management
            Corporation.
          </h2>

          <h2 className="text-sm font-thin mb-5 text-text2 dark:text-text2_d">
            Bridge status data is updated every 60 seconds, and closures are
            updated every 10 minutes.
          </h2>

          <h2 className="text-sm font-thin text-text2 dark:text-text2_d">
            Time estimates are calculated based on available public data.
            Estimates are not guaranteed to be accurate.
          </h2>
        </div>

        <div className="border-0 my-5 p-5 rounded-[13px] bg-card dark:bg-card_d">
          <h1 className="text-xl mb-5">Privacy Policy</h1>
          <h2 className="text-sm font-thin text-text2 dark:text-text2_d">
            BridgeUp does not collect or store any of your data, or track your
            usage.
          </h2>
        </div>
      </div>
    </>
  )
}
