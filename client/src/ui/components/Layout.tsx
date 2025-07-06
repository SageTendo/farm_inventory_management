import Sidebar from "./Sidebar.tsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export function Layout() {
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const sidebarWidth = isSidebarHidden ? "md:w-24" : "md:w-44";

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar: Top navbar on mobile, sidebar on desktop */}
      <div
        className={`flex-shrink-0 w-full h-14 md:h-full ${sidebarWidth} transition-all duration-300`}
      >
        <Sidebar
          isSidebarHidden={isSidebarHidden}
          setSidebarHidden={setSidebarHidden}
        />
      </div>

      {/* Main content: no scroll here */}
      <div className="flex-1 relative">
        {/* Spacer for mobile navbar */}
        <div className="px-4 md:pt-0 pt-4 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
