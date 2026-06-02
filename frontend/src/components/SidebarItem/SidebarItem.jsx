const SidebarItem = ({className, text, icon, onClick}) => {
    return (
        <li className={className}>
        <button className="user-card__list-btn" onClick={onClick}>
            {icon}
            <span>{text}</span>
        </button>
        </li>
    )
}

export default SidebarItem