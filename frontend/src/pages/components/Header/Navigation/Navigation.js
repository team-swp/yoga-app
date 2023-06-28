import { Link } from "react-router-dom";
import logo from "../../../../Heartbeat.svg";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/selectors";

function Navigation() {
  const user = useSelector(userSelector)
  const token = localStorage.getItem("token");
  useEffect(() => {
    
  }, [user]);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <nav className="m-0 mx-20 flex justify-between items-center">
        <div className="flex ml-14 gap-4 justify-items-center items-center">
          <div style={{ transform: "scale(1.6)" }}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="flex gap-6 ml-8">
            <div>
              <Link to="/courses">
                <p className="text-xs uppercase">Courses</p>
              </Link>
            </div>
            <div>
              <Link to="/premium">
                <p className="text-xs uppercase">Premium</p>
              </Link>
            </div>
            <div>
              <Link to="/schedule">
                <p className="text-xs uppercase">Schedule</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center ml-auto">
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
      </nav>
    </header>
  );
}
export default Navigation;
