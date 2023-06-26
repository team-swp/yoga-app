import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FcReadingEbook } from "react-icons/fc";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links } from "../../../../data/dummy";
import { UserAuth } from "../../../../context/AuthGoogleContext";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = UserAuth();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-3 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center   gap-3 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black  hover:bg-light-gray m-2";

  return (
    <div style={activeMenu?{width:'240px',marginLeft:'10px'}:{marginLeft:'10px'}} className="ml-3 h-screen  md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <div>
          <div style={{marginTop:'16px'}} className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-2 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <FcReadingEbook style={{marginLeft:'10px'}} /> <span>Yoga HeartBeat</span>
            </Link>
            <TooltipComponent
              onClick={handleCloseSideBar}
              content="Menu"
              position="BottomCenter"
            >
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-2 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p
                  style={{ opacity: "0.5" }}
                  className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase"
                >
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <div className="flex gap-4 justify-center justify-items-center items-center pb-2">
                      <span style={{ marginLeft: "20px" }}>{link.icon}</span>
                      <span className="capitalize ">{link.name}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;