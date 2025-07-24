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
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useState, Dispatch, SetStateAction } from "react";

function doLogout() {
  console.log("Logging out...");
}

interface SidebarProps {
  isSidebarHidden: boolean;
  setSidebarHidden: Dispatch<SetStateAction<boolean>>;
}

const navItems = [
  { to: "/dashboard", icon: faHome, label: "Dashboard" },
  { to: "/pos", icon: faStore, label: "Shop" },
  { to: "/products", icon: faBoxesStacked, label: "Products" },
  { to: "/stock", icon: faWarehouse, label: "Stock" },
  { to: "/sales", icon: faChartLine, label: "Sales" },
  { to: "/users", icon: faUsers, label: "Users" },
  { to: "/settings", icon: faUser, label: "Settings" },
];

function Sidebar({ isSidebarHidden, setSidebarHidden }: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-900  text-white overflow-hidden z-50 transition-all duration-300
          hidden md:flex flex-col
          ${isSidebarHidden ? "w-20" : "w-40"}`}
      >
        {/* Brand */}
        <div className="flex items-center gap-4 px-4 pt-8 pb-1">
          <FontAwesomeIcon icon={faChartLine} className="text-4xl" />
          {!isSidebarHidden && (
            <span className="text-2xl font-bold whitespace-nowrap">IMS</span>
          )}
        </div>

        {/* Divider + Toggle */}
        <div className="flex items-center justify-end border-t border-blue-500/50 px-2 py-3">
          <button
            onClick={() => setSidebarHidden(!isSidebarHidden)}
            className="w-12 h-12 flex items-center justify-center text-white hover:text-blue-400 transition"
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-4 flex-grow overflow-auto">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center w-full px-3 py-3 text-sm no-underline font-bold text-white transition duration-300 hover:bg-blue-600 
                ${isActive ? "bg-blue-600" : ""}
                ${isSidebarHidden ? "justify-end" : "justify-start"}
                `
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <FontAwesomeIcon icon={icon} className="text-base mr-4" />
              {!isSidebarHidden && (
                <span className="whitespace-nowrap">{label}</span>
              )}
            </NavLink>
          ))}

          <button
            onClick={doLogout}
            className={`flex items-center w-full px-4 py-3 text-sm font-bold
               text-white transition duration-300 hover:bg-red-600 mt-auto
               ${isSidebarHidden ? "justify-end" : "justify-start"}
               `}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-base mr-4" />
            {!isSidebarHidden && (
              <span className="whitespace-nowrap">Logout</span>
            )}
          </button>
        </nav>
      </aside>

      {/* Mobile Top Nav */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between px-4 h-14 z-50 md:hidden">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faChartLine} className="text-2xl" />
          <span className="font-bold text-lg">IMS</span>
        </div>

        {/* Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>
      </header>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <nav
          className="fixed top-14 left-0 right-0 bg-gray-900 text-white flex flex-col border-t
        border-blue-500 z-40 md:hidden h-screen"
        >
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-base font-bold no-underline text-white transition duration-300 hover:bg-blue-600 ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <FontAwesomeIcon icon={icon} className="mr-4" />
              {label}
            </NavLink>
          ))}

          <button
            onClick={() => {
              doLogout();
              setMobileMenuOpen(false);
            }}
            className="flex items-center px-4 py-3 text-base font-bold text-white transition duration-300 hover:bg-red-600"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-4" />
            Logout
          </button>
        </nav>
      )}
    </>
  );
}

export default Sidebar;
