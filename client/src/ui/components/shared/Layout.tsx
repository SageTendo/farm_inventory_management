import Sidebar from "./Sidebar.tsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export function Layout() {
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const sidebarWidth = isSidebarHidden ? "md:w-20" : "md:w-40";

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-200">
      {/* Sidebar */}
      <div
        className={`bg-white z-10 fixed md:static top-0 left-0 w-full md:h-full ${sidebarWidth} transition-all duration-300 shadow-md`}
      >
        <Sidebar
          isSidebarHidden={isSidebarHidden}
          setSidebarHidden={setSidebarHidden}
        />
      </div>

      {/* Main Content */}
      <div className={`flex-1 md:ml-0 mt-14 md:mt-0 overflow-auto`}>
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
