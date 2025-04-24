import Sidebar from "./Sidebar.tsx";
import {Outlet} from "react-router-dom";

export function Layout() {
  return (
    <>
      <div className="layout">
        <div className="sidebar-container">
          <Sidebar/>
        </div>

        <div className="content-container">
          <Outlet/>
        </div>
      </div>
    </>
  )
}