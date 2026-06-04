import './SidebarMenu.scss'
import SidebarItem from '../SidebarItem/SidebarItem'
import calendar from "../../assets/icons/calendar.svg";
import chevrons from "../../assets/icons/chevrons-right.svg";
import list from "../../assets/icons/list.svg";
import sticky from "../../assets/icons/sticky-note.svg";
const SidebarMenu = ( {onToggleScreen} ) => {
  return (
    <>
      <h2 className="user-card__title">Tasks</h2>
      <ul className="user-card__menu">
        <SidebarItem className="user-card__menu-item" text="Upcoming" icon={<img src={chevrons} className="user-card__menu-icon" />} onClick={() => onToggleScreen('upcoming')}/>
        <SidebarItem className="user-card__menu-item" text="Today" icon={<img src={list} className="user-card__menu-icon" />} onClick={() => onToggleScreen('today')}/>
        <SidebarItem className="user-card__menu-item" text="Calendar" icon={<img src={calendar} className="user-card__menu-icon" />}/>
        <SidebarItem className="user-card__menu-item" text="Sticky Wall" icon={<img src={sticky} className="user-card__menu-icon" />}/>
      </ul>
    </>
  );
};

export default SidebarMenu;
