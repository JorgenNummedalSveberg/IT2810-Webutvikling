import React from 'react';
import './CSS/Header.css';
import SortingPanel from "./SortingPanel";
import SearchField from "./SearchField";

function Header(props: {refresh: any}) {
    return (
      <div className="Header">
        <SearchField refresh={props.refresh}/>
        <SortingPanel/>
      </div>
    );
  }
  
  export default Header;