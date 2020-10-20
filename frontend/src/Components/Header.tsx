import React from 'react';
import './CSS/Header.css';
import SortingPanel from "./SortingPanel";
import SearchField from "./SearchField";

function Header(props: {updateSearch: any}) {
    return (
      <div className="Header">
        <SearchField updateSearch={props.updateSearch}/>
        <SortingPanel/>
      </div>
    );
  }
  
  export default Header;