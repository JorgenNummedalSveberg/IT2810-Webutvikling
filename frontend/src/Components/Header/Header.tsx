import React, {useRef, useState} from 'react';
import './CSS/Header.css';
import './CSS/SearchField.css';
import SortingPanel from "./SortingPanel";
import {Button, Input, TextField} from "@material-ui/core";
import {logout, setSearch} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import SignLogIn from "./SignLogIn";
import {State} from "../../types/State";


function Header(props: { refresh: () => void }) {
    // Nødvendig for redux
    const dispatch = useDispatch();
    // State som holder styr på loading icon på input
    const [searchString, setSearchString] = useState("");


    // Tom timeout ref som defineres først;
    let timeoutRef = useRef(setTimeout(() => {
    }, 0));

    // Når input endres tømmer vi den aktive timeouten og starter på nytt. Når der har gått 300ms, bytt ut search filter i state og refresh
    function onChange(e: any) {
        const value = e.target.value;
        setSearchString(value);
        console.log(e.target.value);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            console.log(value);
            dispatch(setSearch(value));
            props.refresh();
        }, 300);
    }

    const user = useSelector((state: State) => state.user);

    //Brukes for å skru av og på burgermenyen
    let [showMenu, toggleShowMenu] = useState(false);

    function toggleMenu() {
        toggleShowMenu(!showMenu);
    }

    return (
        <div className="Header" id="HeaderID">
            <TextField variant={'filled'} id="searchbar" value={searchString} onChange={onChange} style={{margin: '10px'}}
                   placeholder='Search...' role="searcher" />
            <div className="loginButtons">
                <SignLogIn isLogged={!user}/>
            </div>
            <SortingPanel refresh={props.refresh} show={showMenu}/>
            <svg className={"BurgerButton"} id={"burgerID"} onClick={toggleMenu} width="50" viewBox="0 0 150 125" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <line y1="5" x2="150" y2={showMenu ? "122" : "5"} stroke="white" strokeWidth="10"/>
                <line y1="65" x2="150" y2="65" stroke="white" strokeWidth="10"
                      visibility={showMenu ? "hidden" : "visible"}/>
                <line y1="122" x2="150" y2={showMenu ? "5" : "122"} stroke="white" strokeWidth="10"/>
            </svg>
        </div>
    );
}

export default Header;