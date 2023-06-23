import React from "react";
import styles from "./dashboard.module.css";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const activeMenu = true;
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              className="text-4xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
              style={{ background: "blue", borderRadius: "50%" }}
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
            Sidebar
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">Sidebar</div>
        )}

        <div
          className={`dark:bg-main-dark-bg  bg-main-bg min-h-screen  w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          } `}
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            Navbar
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
