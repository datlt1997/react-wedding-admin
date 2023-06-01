import { Link } from "react-router-dom";
import "./style.css";

function SideBar() {
  return (
    <div className="wrapper-sidebar">
      <ul className="list-sidebar">
        SideBar
        <li  className="sidebar-item">
          <Link to="/admin/user">User</Link>
        </li>
        <li  className="sidebar-item">
          <Link to="/admin/address">Address</Link>
        </li>
        <li  className="sidebar-item">
          <Link to="/admin/images">Images</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
