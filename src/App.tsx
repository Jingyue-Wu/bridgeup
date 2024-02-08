import { Outlet, NavLink } from "react-router-dom"

function App() {
  return (
    <>
      <div className="min-h-screen font-primary pt-[60px] bg-bg dark:bg-bg_d text-text dark:text-text-light pb-[93px] select-none	">
        <div>
          <Outlet />
        </div>

        {/* Nav bar */}

        <div className="backdrop-blur-md bg-opacity-70 text-text-light m-auto flex justify-center fixed bottom-0 w-full h-[88px] border-t-[0.5px] border-border_light dark:border-text text-[10px] bg-bg dark:bg-bg_d2 dark:bg-opacity-70">
          <ul className="flex justify-center gap-10 mt-[5px]">
            <li>
              <NavLink
                className={"flex flex-col items-center w-20 h-20"}
                style={({ isActive }) => ({
                  color: isActive ? "#00D208" : "#8C8C8C",
                  fill: isActive ? "#00D208" : "#8C8C8C",
                })}
                to={""}
              >
                <svg className={`w-8 h-8`} viewBox="0 0 512 512">
                  <path d="M475.224 275.202c-14.01-8.648-28.914-21.364-42.877-36.783-27.993-30.799-52.041-72.523-60.391-112.879l-3.491-16.7c-.935-4.446-4.453-7.585-8.506-7.585-4.046 0-7.571 3.138-8.499 7.585l-3.491 16.7c-6.296 30.256-21.323 61.32-40.328 87.922-15.616 21.934-33.91 40.694-51.641 53.912-17.73-13.217-36.024-31.978-51.64-53.912-19.005-26.603-34.032-57.666-40.328-87.922l-3.491-16.7c-.928-4.446-4.453-7.585-8.5-7.585-4.053 0-7.571 3.138-8.506 7.585l-3.49 16.7c-8.35 40.356-32.398 82.08-60.391 112.879-13.962 15.42-28.866 28.135-42.877 36.783C22.787 283.898 9.692 288.31 0 288.242V324.795h141.257v35.632h-7.11l-6.439 50.319h48.658l-6.439-50.319h-7.104v-35.632h186.351v35.632h-7.104l-6.439 50.319h48.658l-6.438-50.319h-7.11v-35.632H512V288.242c-9.692.068-22.787-4.344-36.776-13.04zM102.61 288.358H64.573c13.082-10.112 25.98-22.476 38.038-36.6v36.6zm38.647 0h-19.933v-61.021c7.245-10.465 13.976-21.506 19.933-33.022v94.043zm41.501 0h-19.934v-94.009c5.958 11.523 12.675 22.584 19.934 33.042v60.967zm43.866 0h-25.152V251.75c1.884 2.21 3.789 4.372 5.707 6.5 9.313 10.276 19.052 22.15 28.914 30.108-3.314 1.226-6.486-.617-9.469 0zm83.904 0h-25.152c-2.982-.616-6.154 1.227-9.469 0 9.862-7.958 19.602-19.832 28.914-30.108 1.918-2.128 3.823-4.29 5.707-6.5v36.608zm38.648 0h-19.934V227.39c7.259-10.458 13.976-21.519 19.934-33.042v94.01zm41.5 0h-19.933v-94.043c5.958 11.516 12.688 22.557 19.933 33.022v61.021zm18.714 0v-36.6c12.058 14.125 24.956 26.488 38.038 36.6H409.39z" />
                </svg>

                <h1 className="text-center">Status</h1>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={"flex flex-col items-center w-20 h-20"}
                style={({ isActive }) => ({
                  color: isActive ? "#00D208" : "#8C8C8C",
                  fill: isActive ? "#00D208" : "#8C8C8C",
                })}
                to={"closures"}
              >
                <svg className={`w-5 h-5 mb-2 mt-1 `} viewBox="0 0 20 20">
                  <path d="M17.4 18H20v2H0v-2h2.6L8 0h4l5.4 18zm-3.2-4H5.8l-1.2 4h10.8l-1.2-4zm-2.4-8H8.2L7 10h6l-1.2-4z" />
                </svg>

                <h1 className="text-center">Closures</h1>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={"flex flex-col items-center w-20 h-20"}
                style={({ isActive }) => ({
                  color: isActive ? "#00D208" : "#8C8C8C",
                  fill: isActive ? "#00D208" : "#8C8C8C",
                })}
                to={"about"}
              >
                <svg className={`w-6 h-6 mb-1 mt-1 `} viewBox="0 0 24 24">
                  <path d="M12 17.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75ZM12 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
                  <path d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12 17.937 22.75 12 22.75 1.25 17.937 1.25 12ZM12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5Z" />
                </svg>

                <h1 className="text-center">About</h1>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
