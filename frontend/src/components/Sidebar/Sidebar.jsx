import "./Sidebar.scss";
import SidebarHeader from "../SidebarHeader/SidebarHeader";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import SidebarList from "../SidebarList/SidebarList";
import SidebarFooter from "../SidebarFooter/SidebarFooter";

const Sidebar = ({onToggle, onToggleScreen, onLogout}) => {
  return (
    <section className="user-card">
      <SidebarHeader onToggle={onToggle}/>
      <div className="user-card__content">
        <SidebarMenu onToggleScreen={(screen) => onToggleScreen(screen)}/>
        <SidebarList />
      </div>
      <SidebarFooter onLogout={onLogout}/>
    </section>
  );
};

export default Sidebar;
