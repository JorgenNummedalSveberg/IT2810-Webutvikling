import React, {useRef, useState} from 'react';
import SortingPanel from "./SortingPanel";
import {TextField} from "@material-ui/core";
import {setSearch} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import SignLogIn from "./SignLogIn";
import {State} from "../../types/State";
import {makeStyles} from "@material-ui/styles";


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
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
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
    const useStyles = makeStyles({
        div: {
            backgroundColor: '#003049',
            display: 'flex',
        },
        textfield: {
            minWidth: '500px',
        }
    })

    const classes = useStyles();
    return (
        <div className={classes.div}>
            <TextField
                className={classes.textfield}
                variant={'outlined'}
                inputProps={{'data-testid': 'searcher'}}
                value={searchString}
                onChange={onChange}
                placeholder='Search...'
            />
            <SignLogIn isLogged={!user}/>
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