const SidebarItem = ({className, text, icon}) => {
    return (
        <li className={className}>
          <button className="user-card__list-btn">
            {icon}
            <span>{text}</span>
        </button>
        </li>
    )
}

export default SidebarItem