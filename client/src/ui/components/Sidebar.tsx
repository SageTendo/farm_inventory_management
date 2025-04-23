import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxes,
  faBoxesStacked,
  faWarehouse,
  faChartLine,
  faUsers,
  faCogs,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-brand">
            <FontAwesomeIcon icon={faChartLine} className="nav-icon logo" />
            <h1>IMS</h1>
          </div>
          <nav className="sidebar-nav">
            <a className="nav-link text-white active">
              <FontAwesomeIcon icon={faBoxes} className="nav-icon" />
              <span className="nav-title">Dashboard</span>
            </a>
            <a className="nav-link text-white">
              <FontAwesomeIcon icon={faBoxesStacked} className="nav-icon" />
              <span className="nav-title">Products</span>
            </a>
            <a className="nav-link text-white">
              <FontAwesomeIcon icon={faWarehouse} className="nav-icon" />
              <span className="nav-title">Stock</span>
            </a>
            <a className="nav-link text-white">
              <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
              <span className="nav-title">Sales</span>
            </a>
            <a className="nav-link text-white">
              <FontAwesomeIcon icon={faUsers} className="nav-icon" />
              <span className="nav-title">Users</span>
            </a>
            <a className="nav-link text-white">
              <FontAwesomeIcon icon={faCogs} className="nav-icon" />
              <span className="nav-title">Settings</span>
            </a>
            <a className="nav-link text-white">
              <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
              <span className="nav-title">Logout</span>
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
