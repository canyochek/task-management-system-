import './SidebarFooter.scss';
import logout from "../../assets/icons/log-out.svg";

const SidebarFooter = ({ onLogout }) => {
  return (
    <ul className="user-card__footer-menu">
      <li className="user-card__footer-item">
        <button className="user-card__footer-btn" onClick={onLogout}>
          <img src={logout} className="user-card__footer-icon" alt="logout" /> 
          <span>Вийти</span>
        </button>
      </li>
    </ul>
  );
};

export default SidebarFooter;