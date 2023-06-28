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
              <Link to="/weather">
                <Typography>Weather</Typography>
              </Link>
            </div>
            <div>
              <Link to="/">
                <Typography>Time Table</Typography>
              </Link>
            </div>
          </div>
          <div
            className="flex items-center mt-4 sm:mt-0"
            style={{ marginRight:'-20px',width: "fit-content" }}
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