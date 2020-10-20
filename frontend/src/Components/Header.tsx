import React from 'react';
import './CSS/Header.css';
import SortingPanel from "./SortingPanel";
import SearchField from "./SearchField";

function Header() {
    return (
      <div className="Header">
        <SearchField/>
        <SortingPanel/>
      </div>
    );
  }
  
  export default Header;