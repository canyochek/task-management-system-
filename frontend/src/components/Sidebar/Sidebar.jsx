import "./Sidebar.scss";
import SidebarHeader from "../SidebarHeader/SidebarHeader";
import SearchBox from "../SearchBox/SearchBox";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import SidebarList from "../SidebarList/SidebarList";
import SidebarFooter from "../SidebarFooter/SidebarFooter";

const Sidebar = ({onToggle}) => {
  return (
    <section className="user-card">
      <SidebarHeader onToggle={onToggle}/>
      <SearchBox />
      <div className="user-card__content">
        <SidebarMenu />
        <SidebarList />
      </div>
      <SidebarFooter />
    </section>
  );
};

export default Sidebar;
