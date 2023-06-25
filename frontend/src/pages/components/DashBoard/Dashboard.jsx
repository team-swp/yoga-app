import React, { useEffect } from "react";
import styles from "./dashboard.module.css";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import {UserAuth} from '../../../context/AuthGoogleContext'
function Dashboard() {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = UserAuth();
  const navigate = useNavigate()
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg" style={{height:'100px'}}>
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000",transform:'translate(1450px, 630px)' }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: '50%' }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div
            className="w-72 fixed sidebar dark:bg-secondary-dark-bg
          bg-white
          "
          >
            <Sidebar/>
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg"><Sidebar/></div>
        )}

        <div
          className={`dark:bg-main-dark-bg  bg-main-bg    w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          } `}
        >
          <div style={activeMenu?{marginLeft:'250px',backgroundColor:'white'}:{backgroundColor:'white'}}  className=" md:static bg-main-bg dark:bg-main-dark-bg navbar w-full mb-10" >
            <Navbar/>
          </div>
          <div>
          {themeSettings && (<themeSettings />)}
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;