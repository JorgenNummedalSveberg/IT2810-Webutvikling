import React, {useState, useRef} from 'react';
import './CSS/Header.css';
import './CSS/SearchField.css';
import SortingPanel from "./SortingPanel";
import {Input} from "semantic-ui-react";
import {setSearch} from "../actions";
import {useDispatch} from "react-redux";



function Header(props: {refresh: ()=>void}) {
    // Nødvendig for redux
    const dispatch = useDispatch();
    let time = 0;

    // State som holder styr på loading icon på input
    const [loading, setLoading] = useState(false);


    // Tom timeout ref som defineres først;
    let timeoutRef = useRef(setTimeout(() => {}, 0));

    // Når input endres tømmer vi den aktive timeouten og starter på nytt. Når der har gått 300ms, bytt ut search filter i state og refresh
    function onChange(e: any, data: any) {
        setLoading(true)
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setLoading(false);
            dispatch(setSearch(data.value));
            props.refresh();
        }, 300);
    }
    return (
      <div className="Header">
          <Input data-testid="searchbar" onChange={onChange} loading={loading} className={"SearchField"} placeholder='Search...' />
          <SortingPanel refresh={props.refresh}/>
      </div>
    );
  }
  
  export default Header;