// components/Sidebar.js
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTachometerAlt, FaList, FaTags, FaCog } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-4 position-fixed vh-100"
      style={{ width: "250px", boxShadow: "4px 0px 8px rgba(0,0,0,0.2)" }}
    >
      <div className="d-flex flex-column">
        <Link href="/admin" className="nav-link text-white p-3">
          <FaTachometerAlt className="mr-3" /> Dashboard
        </Link>
        <Link href="/admin/posts" className="nav-link text-white p-3">
          <FaList className="mr-3" /> Posts
        </Link>
        <div className="nav-link text-white p-3">
          <FaTags className="mr-3" /> Categories
        </div>
        <div className="nav-link text-white p-3">
          <FaCog className="mr-3" /> Settings
        </div>
      </div>
    </div>
  );
}
