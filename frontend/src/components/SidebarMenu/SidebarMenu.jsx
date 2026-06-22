import './SidebarMenu.scss'
import SidebarItemTask from '../SidebarItem/SidebarItemTask'
import calendar from "../../assets/icons/calendar.svg";
import chevrons from "../../assets/icons/chevrons-right.svg";
import list from "../../assets/icons/list.svg";
const SidebarMenu = ( {onToggleScreen} ) => {
  return (
    <>
      <h2 className="user-card__title">Завдання</h2>
      <ul className="user-card__menu">
        <SidebarItemTask className="user-card__menu-item" text="Плани" icon={<img src={chevrons} className="user-card__menu-icon" />} onClick={() => onToggleScreen('upcoming')}/>
        <SidebarItemTask className="user-card__menu-item" text="Сьогодні" icon={<img src={list} className="user-card__menu-icon" />} onClick={() => onToggleScreen('today')}/>
        <SidebarItemTask className="user-card__menu-item" text="Календар" icon={<img src={calendar} className="user-card__menu-icon" />} onClick={() => onToggleScreen('calendar')}/>
      </ul>
    </>
  );
};

export default SidebarMenu;
