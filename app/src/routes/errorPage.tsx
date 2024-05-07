import { isRouteErrorResponse, useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error: unknown = useRouteError()
  console.error(error)

  if (!isRouteErrorResponse(error)) {
    return null
  }

  return (
    <div id="error-page" className="mt-[30vh]">
      <div className="lg:m-auto lg:max-w-[40%] m-[5%] mt-[30vh] ">
        <div className="border-0 my-5 p-5 rounded-[13px] bg-card dark:bg-card_d">
          <h1 className="mb-5 text-[32px] pt-1 font-title text-text dark:text-text2_d">
            Oops!
          </h1>
          <h2 className=" text-md text-text2 dark:text-text2_d">
            The page you are looking for cannot be found.
            <p>
              Error: <i>{error.statusText || error.data}</i>
            </p>
          </h2>
        </div>
      </div>
    </div>
  )
}
