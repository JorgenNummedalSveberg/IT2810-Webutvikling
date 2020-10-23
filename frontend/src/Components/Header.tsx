import React from 'react';
import './CSS/Header.css';
import './CSS/SearchField.css';
import SortingPanel from "./SortingPanel";
import {Input} from "semantic-ui-react";
import {setSearch} from "../actions";
import {useDispatch} from "react-redux";

function Header(props: {refresh: any}) {
    // Nødvendig for redux
    const dispatch = useDispatch();

    // Når input endres, bytt ut search filter i state og refresh
    function onChange(e: any,  data: any) {
        dispatch(setSearch(data.value))
        props.refresh();
    }
    return (
      <div className="Header">
          <Input className={"SearchField"} onChange={onChange} placeholder='Search...' />
          <SortingPanel refresh={props.refresh}/>
      </div>
    );
  }
  
  export default Header;