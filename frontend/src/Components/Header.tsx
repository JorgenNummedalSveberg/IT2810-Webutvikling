import React, {useState, useRef} from 'react';
import './CSS/Header.css';
import './CSS/SearchField.css';
import SortingPanel from "./SortingPanel";
import BurgerMenu from  "./BurgerMenu";
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

    //Brukes for å skru av og på burgermenyen
    let [showMenu, toggleShowMenu] = useState(false);

    function toggleMenu(){
      toggleShowMenu(!showMenu);
    }

    return (
      <div className="Header" id="HeaderID">
          <Input id="searchbar" onChange={onChange} loading={loading} className={"SearchField"} placeholder='Search...' role="searcher" />
          <div className="loginButtons">
              {!!user ?(<Button onClick={() => dispatch(logout())} style={{zIndex: '1000000'}} >Log out</Button>) :
                  (<SignLogIn/>)}
          </div>
          <BurgerMenu refresh={props.refresh} show={showMenu}/>
          <SortingPanel refresh={props.refresh}/>
          <svg className={"BurgerButton"} onClick={toggleMenu} width="50" viewBox="0 0 150 125" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="5" x2="150" y2={showMenu ? "122":"5"} stroke="white" stroke-width="10"/>
            <line y1="65" x2="150" y2="65" stroke="white" stroke-width="10" visibility={showMenu ? "hidden":"visible"}/>
            <line y1="122" x2="150" y2={showMenu ? "5":"122"} stroke="white" stroke-width="10"/>
          </svg>
      </div>
    );
  }
  
  export default Header;