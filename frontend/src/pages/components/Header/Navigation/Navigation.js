import { Link } from "react-router-dom";
import logo from "../../../../Heartbeat.svg";
import Sidebar from "../Sidebar/Sidebar";
const pages = ["COURES", "OUR", "BOOKING", "PT"];

function Navigation() {
  const token = localStorage.getItem("token");

  return (
    <header class="sticky top-0 z-50 bg-white shadow-lg">
      <nav class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div class="flex">
            <Link to="/">
              <img class="w-100 h-100" src={logo} alt="logo" />
            </Link>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex">
              {pages.map((page) => (
                <Link
                  to="/courses"
                  class="inline-flex items-center px-4 pt-1 text-black text-sm font-medium leading-5 text-gray-900"
                  key={page}
                >
                  {page}
                </Link>
              ))}
            </div>
          </div>
          <div class="flex items-center mt-4 sm:mt-0">
            {token ? (
              <Sidebar />
            ) : (
              <>
                <Link to="/login">
                  <button class="bg-white text-black font-bold mr-8 py-2 px-4 rounded-full border border-black hover:bg-black hover:text-white focus:outline-none focus:border-black focus:shadow-outline-black transition duration-150 ease-in-out">
                    Log In
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Navigation;
