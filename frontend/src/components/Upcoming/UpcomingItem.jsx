import { useState } from 'react';
import trash from "../../assets/icons/trash.svg";
import change from "../../assets/icons/pen.svg"; 

const UpcomingItem = ({ id, text, taskFull, onDelete, onEdit }) => {
  const [check, setCheck] = useState(true);

  const handleCheckBox = () => {
    setCheck(!check);
  };

  const handleTrashClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    onDelete(id); 
  };

  const handleChangeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(taskFull); 
  };

  return (
    <>
      <li className="upcoming__item">
        <label className="upcoming__label">
          <input 
            className="upcoming__checkbox" 
            type="checkbox" 
            checked={!check}
            onChange={handleCheckBox}
          />
          <span className="upcoming__custom-checkbox"></span>
          <span className={`upcoming__text ${check ? "" : "line"}`}>
            {text}
            <img 
              className="upcoming__trash-icon" 
              src={change} 
              alt="changeTask" 
              onClick={handleChangeClick} 
            />
            <img 
              className="upcoming__trash-icon" 
              src={trash} 
              alt="trash" 
              onClick={handleTrashClick}
            />
          </span>
        </label>
      </li>
    </>
  );
};

export default UpcomingItem;
