import Sidebar from "./Sidebar.tsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export function Layout() {
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  return (
    <>
      <div className={`layout ${isSidebarHidden ? "collapsed" : ""}`}>
        <div className="sidebar-container">
          <Sidebar isSidebarHidden={isSidebarHidden} setSidebarHidden={setSidebarHidden} />
        </div>

        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </>
  )
}