import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBoxes,
  faBoxesStacked,
  faWarehouse,
  faChartLine,
  faUsers,
  faCogs,
  faBars,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <FontAwesomeIcon icon={faChartLine} className="nav-icon logo"/>
        <span className="logo-text">IMS</span>
      </div>
      <div className="sidebar-divider">
        <button className="sidebar-toggle"
                onClick={() => {
                  const sidebar = document.querySelector('.sidebar-nav');
                  if (sidebar) {
                    sidebar.className = sidebar.className === 'sidebar-nav' ? 'sidebar-nav hidden' : 'sidebar-nav';
                  }
                }}
        >
          <FontAwesomeIcon icon={faBars} className="nav-icon"/>
        </button>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="navlink">
          <FontAwesomeIcon icon={faBoxes} className="nav-icon"/>
          <span className="nav-title">Dashboard</span>
        </NavLink>
        <NavLink to="/products" className="navlink">
          <FontAwesomeIcon icon={faBoxesStacked} className="nav-icon"/>
          <span className="nav-title">Products</span>
        </NavLink>
        <NavLink to="/stock" className="navlink">
          <FontAwesomeIcon icon={faWarehouse} className="nav-icon"/>
          <span className="nav-title">Stock</span>
        </NavLink>
        <NavLink to="/sales" className="navlink">
          <FontAwesomeIcon icon={faChartLine} className="nav-icon"/>
          <span className="nav-title">Sales</span>
        </NavLink>
        <NavLink to="/users" className="navlink">
          <FontAwesomeIcon icon={faUsers} className="nav-icon"/>
          <span className="nav-title">Users</span>
        </NavLink>
        <NavLink to="/settings" className="navlink">
          <FontAwesomeIcon icon={faCogs} className="nav-icon"/>
          <span className="nav-title">Settings</span>
        </NavLink>
        <NavLink to="/logout" className="navlink">
          <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon"/>
          <span className="nav-title">Logout</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
