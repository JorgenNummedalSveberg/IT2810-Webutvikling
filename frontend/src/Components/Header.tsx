import React, {useState, useRef} from 'react';
import './CSS/Header.css';
import './CSS/SearchField.css';
import SortingPanel from "./SortingPanel";
import {Button, Input} from "semantic-ui-react";
import {logout, setSearch} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import SignLogIn from "./SignLogIn";
import {state} from "../types/state";



function Header(props: {refresh: ()=>void}) {
    // Nødvendig for redux
    const dispatch = useDispatch();
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

    const user = useSelector((state: state) => state.user);

    return (
      <div className="Header" id="HeaderID">
          <Input id="searchbar" onChange={onChange} loading={loading} className={"SearchField"} placeholder='Search...' role="searcher" />
          <SortingPanel refresh={props.refresh}/>
          {!!user ? (
              <Button id={"loginButton"} onClick={() => dispatch(logout())} style={{zIndex: '1000000'}} >Log out</Button>
          ) : (
            <SignLogIn/>
          )
          }
      </div>
    );
  }
  
  export default Header;