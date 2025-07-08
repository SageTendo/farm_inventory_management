import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBoxesStacked,
  faWarehouse,
  faChartLine,
  faUsers,
  faBars,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import { Dispatch, SetStateAction } from "react";

function doLogout() {
  console.log("Logging out...");
  //   TODO: Handle logout logic here
}

interface SidebarProps {
  isSidebarHidden: boolean;
  setSidebarHidden: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ isSidebarHidden, setSidebarHidden }: SidebarProps) {
  return (
    <div className={`sidebar ${isSidebarHidden ? "hidden" : ""}`}>
      <div className="sidebar-brand">
        <FontAwesomeIcon icon={faChartLine} className="nav-icon logo" />
        <span className="logo-text">IMS</span>
      </div>
      <div className="sidebar-divider">
        <button className="sidebar-toggle"
          onClick={() => {
            setSidebarHidden(!isSidebarHidden)
          }}>
          <FontAwesomeIcon icon={faBars} className="nav-icon" />
        </button>
      </div>
      <nav className={`sidebar-nav ${isSidebarHidden ? 'hidden' : ''}`}>
        <NavLink to="/dashboard" className="navlink">
          <FontAwesomeIcon icon={faHome} className="nav-icon" />
          <span className="nav-title">Dashboard</span>
        </NavLink>
        <NavLink to="/products" className="navlink">
          <FontAwesomeIcon icon={faBoxesStacked} className="nav-icon" />
          <span className="nav-title">Products</span>
        </NavLink>
        <NavLink to="/stock" className="navlink">
          <FontAwesomeIcon icon={faWarehouse} className="nav-icon" />
          <span className="nav-title">Stock</span>
        </NavLink>
        <NavLink to="/sales" className="navlink">
          <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
          <span className="nav-title">Sales</span>
        </NavLink>
        <NavLink to="/users" className="navlink">
          <FontAwesomeIcon icon={faUsers} className="nav-icon" />
          <span className="nav-title">Users</span>
        </NavLink>
        <NavLink to="/settings" className="navlink">
          <FontAwesomeIcon icon={faUser} className="nav-icon" />
          <span className="nav-title">Settings</span>
        </NavLink>
        <div className="navlink w-100 d-flex">
          <button onClick={doLogout} className="text-reset bg-transparent border-0 ">
            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
            <span className="nav-title fw-bold">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
