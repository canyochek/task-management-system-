import './SidebarHeader.scss'
import alignjustify from "../../assets/icons/align-justify.svg";

const SidebarHeader = ({ onToggle }) => {
  return (
    <div className="user-card__header">
      <h1 className="user-card__name">Menu</h1>
      <button className="user-card__header-btn" onClick={onToggle}>
        <img src={alignjustify} className="user-card__header-icon" />
      </button>
    </div>
  );
};

export default SidebarHeader;
