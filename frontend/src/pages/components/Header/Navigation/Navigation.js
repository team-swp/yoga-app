import { Link } from "react-router-dom";
import logo from "../../../../Heartbeat.svg";
import Sidebar from "../Sidebar/Sidebar";
<<<<<<< HEAD
=======
import { useEffect } from "react";
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
import { Typography } from "@mui/material";

function Navigation() {
  const token = localStorage.getItem("token");
  useEffect(() => {}, []);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
<<<<<<< HEAD
      <nav className="mx-20 flex justify-between items-center">
        <div className="flex gap-16 justify-items-center items-center">
          <div>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
=======
      <nav className="mx-20">
        <div className="flex justify-between items-center">
          <div className="flex gap-16 justify-items-center items-center">
            <div style={{transform:'scale(1.6)'}}>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div>
              <Link to="/courses">
                <Typography style={{fontWeight:400}}>Courses</Typography>
              </Link>
            </div>
            <div>
              <Link to="/premium">
                <Typography>Premium</Typography>
              </Link>
            </div>
            <div>
              <Link to="/">
                <Typography>Time Table</Typography>
              </Link>
            </div>
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
          </div>
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
            <Link to="/timetable">
              <p className="text-xs uppercase">Schedule</p>
            </Link>
          </div>
        </div>
        <div className="flex items-center">
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