import { Outlet, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <div id='light'>
        <div className=' m-auto min-h-screen flex justify-center'>
          <div>
            <Outlet />
          </div>

          {/* Nav bar */}
          <div className='bg-slate-400 m-auto flex justify-center fixed bottom-0 w-full h-20'>
            <ul className='flex justify-center gap-10'>
              <li>
                <NavLink to={""}>Status</NavLink>
              </li>
              <li>
                <NavLink to={"/closures"}>Closures</NavLink>
              </li>
              <li>
                <NavLink to={"/about"}>About</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
