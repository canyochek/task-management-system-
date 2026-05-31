import './SearchBox.scss'
import searchIcon from "../../assets/icons/search.svg";
const SearchBox = () => {
  return (
    <div className="search-box">
      <img src={searchIcon} className="search-box__icon" />
      <input
        className="search-box__input"
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
