import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap styles
import styles from "../styles/Navbar.module.css"; // Importing custom styles from Navbar.module.css

export default function Navbar() {
  return (
    <nav className={`navbar navbar-expand-lg ${styles.customNavbar} px-3`}>
      <a className="navbar-brand font-weight-bold" href="#">
        Teleperformance
      </a>
      <div className="ml-auto">
        <span className="nav-item px-2">User Profile</span>
        <span className="nav-item px-2">Settings</span>
        <span className="nav-item px-2">Notifications</span>
      </div>
    </nav>
  );
}
