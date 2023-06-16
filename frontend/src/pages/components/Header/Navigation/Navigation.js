import { Link } from "react-router-dom";
import logo from "../../../../Heartbeat.svg";
import Sidebar from "../Sidebar/Sidebar";

function Navigation() {
  const token = localStorage.getItem("token");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <nav className="mx-20">
        <div className="flex justify-between items-center">
          <div className="flex">
            <Link to="/">
              <img className="w-100 h-100" src={logo} alt="logo" />
            </Link>
          </div>
          <div
            className="flex items-center mt-4 sm:mt-0"
            style={{ width: "fit-content" }}
          >
            {token ? (
              <Sidebar />
            ) : (
              <>
                <Link to="/login">
                  <button className="bg-white text-black font-bold mr-8 py-2 px-4 rounded-full border border-black hover:bg-black hover:text-white focus:outline-none focus:border-black focus:shadow-outline-black transition duration-150 ease-in-out">
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
