import '../SidebarList/SidebarList.scss'
import moreIcon from "../../assets/icons/more.svg"; 

const SidebarItem = ({ className, btnClassName = "", text, icon, color, onClick, onMenuClick }) => {
  const isAddBtn = text === "Додати лист";

  return (
    <li className={className}>
      <button className={`user-card__list-btn ${btnClassName}`} onClick={onClick}>
        {!isAddBtn ? (
          <span 
            className="user-card__list-color-dot" 
            style={{ backgroundColor: color }}
          ></span>
        ) : (
          icon
        )}
        <span className="user-card__list-text">{text}</span>
      </button>

      {!isAddBtn && (
        <button className="user-card__more-btn" onClick={onMenuClick}>
          <img src={moreIcon} alt="options" />
        </button>
      )}
    </li>
  );
};

export default SidebarItem;