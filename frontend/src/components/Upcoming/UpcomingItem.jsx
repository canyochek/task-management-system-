import { useState } from "react";
const UpcomingItem = ({text}) => {
  const [check, setCheck] = useState(true)

  const handleCheckBox = () => {
    setCheck(!check)
  }
  return (
    <>
      <li className="upcoming__item">
        <label className="upcoming__label">
          <input className="upcoming__checkbox" type="checkbox" onChange={handleCheckBox}/>
          <span className="upcoming__custom-checkbox"></span>
          <span className={`upcoming__text ${check ? "" : "line"}`}>{text}</span>
        </label>
      </li>
    </>
  );
};

export default UpcomingItem;
