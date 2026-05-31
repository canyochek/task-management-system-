import './SidebarFooter.scss'
import logout from "../../assets/icons/log-out.svg";
import aligncenter from "../../assets/icons/align-center.svg";
const SidebarFooter = () => {
  return (
    <ul className="user-card__footer-menu">
      <li className="user-card__footer-item">
        <button className="user-card__footer-btn">
          {" "}
          <img src={aligncenter} className="user-card__footer-icon" /> <span>Settings</span>
        </button>
      </li>
      <li className="user-card__footer-item">
        <button className="user-card__footer-btn">
          {" "}
          <img src={logout} className="user-card__footer-icon" /> <span>Sign Out</span>
        </button>
      </li>
    </ul>
  );
};

export default SidebarFooter