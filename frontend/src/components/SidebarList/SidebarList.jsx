import './SidebarList.scss'
import SidebarItem from '../SidebarItem/SidebarItem'
import circle from "../../assets/icons/plus-circle.svg";
const SidebarList = () => {
  return (
    <>
      <h2 className="user-card__title">Lists</h2>
      <ul className="user-card__list">
        <SidebarItem className="user-card__list-item" text="Work"/>
        <SidebarItem className="user-card__list-item" text="Personal"/>
        <SidebarItem className="user-card__list-item" text="Study"/>
        <SidebarItem className="user-card__list-item" text="Add new list" icon={<img src={circle} className="user-card__list-icon" />}/>
      </ul>
    </>
  );
};

export default SidebarList;
