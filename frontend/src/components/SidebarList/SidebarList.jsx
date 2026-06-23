import { useState, useEffect, useRef } from 'react';
import SidebarItem from "../SidebarItem/SidebarItem";
import Modal from '../Modal/Modal'; 
import addIcon from "../../assets/icons/plus-circleTask.svg";
import trashIcon from "../../assets/icons/trash.svg"; 
import '../../App.scss';

const COLORS = [
  '#ff0000', '#fadb42', '#fa541c', '#218516', '#52c41a', 
  '#b7eb8f', '#13c2c2', '#1890ff', '#722ed1', '#b539b7'
];

const SidebarList = () => {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('sidebar_lists');
    return savedLists ? JSON.parse(savedLists) : [
      { id: '1', text: "Робота", color: '#ff0000' },
      { id: '2', text: "Особливе", color: '#52c41a' },
      { id: '3', text: "Навчання", color: '#1890ff' }
    ];
  });

  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('sidebar_lists', JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreateList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      const newList = {
        id: Date.now().toString(),
        text: newListName.trim(),
        color: selectedColor
      };
      setLists([...lists, newList]);
      setNewListName('');
      setSelectedColor(COLORS[0]);
      setIsListModalOpen(false);
    }
  };

  const handleOpenMenu = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + 5,
      left: rect.left - 180 
    });
    
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleDeleteList = (id) => {
    setLists(lists.filter(list => list.id !== id));
    setActiveMenuId(null);
  };

  const handleChangeListColor = (id, color) => {
    setLists(lists.map(list => list.id === id ? { ...list, color } : list));
  };
  const handleChangeListName = (id, newText) => {
    setLists(lists.map(list => list.id === id ? { ...list, text: newText } : list));
  };

return (
  <div className="user-card__lists-wrapper" style={{ position: 'relative' }}>
    <h2 className="user-card__title">Список</h2>
    <div className="user-card__scroll-container">
      <ul className="user-card__list">
        {lists.map((list) => (
          <SidebarItem 
            key={list.id} 
            id={list.id}
            className="user-card__list-item" 
            btnClassName="user-card__list-btn--custom-list"
            text={list.text} 
            color={list.color}
            onMenuClick={(e) => handleOpenMenu(e, list.id)}
            onClick={() => console.log(`Open ${list.text}`)}
          />
        ))}
      </ul>
    </div>

    <div className="user-card__add-zone">
      <SidebarItem 
        className="user-card__list-item user-card__list-item--add" 
        btnClassName="user-card__list-btn--add-action"
        text="Додати лист" 
        icon={<img src={addIcon} className="user-card__list-icon" alt="add"></img>}
        onClick={() => setIsListModalOpen(true)}
      />
    </div>

    {activeMenuId && (
      <div 
        className="user-card__dropdown-menu" 
        ref={menuRef}
        style={{ top: menuPosition.top, left: menuPosition.left }}
      >
        <div className="user-card__dropdown-rename-field">
          <input 
            type="text"
            className="user-card__dropdown-input"
            value={lists.find(l => l.id === activeMenuId)?.text || ''}
            onChange={(e) => handleChangeListName(activeMenuId, e.target.value)}
            placeholder="List name..."
          />
        </div>
        <button 
          className="user-card__dropdown-delete" 
          onClick={() => handleDeleteList(activeMenuId)}
        >
          <img src={trashIcon} alt="delete" />
          <span className='user-card__delete-btn'>Видалити</span>
        </button>
        
        <div className="user-card__dropdown-divider"></div>
        
        <div className="user-card__color-picker">
          {COLORS.map((color) => {
            const currentList = lists.find(l => l.id === activeMenuId);
            return (
              <button
                key={color}
                type="button"
                className={`user-card__color-dot ${currentList?.color === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleChangeListColor(activeMenuId, color)}
              />
            );
          })}
        </div>
      </div>
    )}

    <Modal isOpen={isListModalOpen} onClose={() => { setIsListModalOpen(false); setNewListName(''); }}>
      <div onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleCreateList} className="upcoming__modal-form">
          <h3 className="upcoming__modal-title">Створити лист</h3>
          <input 
            type="text" 
            placeholder="Вписати назву листа..." 
            value={newListName} 
            onChange={(e) => setNewListName(e.target.value)} 
            className="upcoming__input"
            autoFocus
          />
          <div className="upcoming__modal-field" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
            <label>Обрати колір:</label>
            <div className="user-card__color-picker" style={{ padding: 0 }}>
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`user-card__color-dot ${selectedColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          <button type="submit" className="upcoming__modal-submit" style={{ marginTop: '15px' }}>
            <img src={addIcon} alt="create" /> Створити лист
          </button>
        </form>
      </div>
    </Modal>

  </div> 
);
};

export default SidebarList;