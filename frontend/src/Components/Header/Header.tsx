import React, {useRef, useState} from 'react';
import {TextField} from "@material-ui/core";
import {setSearch} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import SignLogIn from "./SignLogIn";
import {State} from "../../types/State";
import {makeStyles} from "@material-ui/styles";
import SortButton from "./SortButton";


function Header(props: { refresh: () => void }) {
    // Nødvendig for redux
    const dispatch = useDispatch();
    // State som holder styr på loading icon på input
    const [searchString, setSearchString] = useState("");

    // Ulike ting vi sorterer etter, komponenten returnerer en knapp for hvert element
    const sortBy = ["Name", "Rating", "Duration", "Year"];

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

    const classes = makeStyles({
        root: {
            height: '100%',
            backgroundColor: '#003049',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '20px',
            '& *': {
                paddingRight: '20px'
            }
        },
        label: {
            color: 'white',
        },
        textInput: {
            backgroundColor: 'rgb(200, 200, 200, 0.5)',
            color: 'white',
            borderRadius: '10px',
        },
        searchBox: {
            width: '17%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        buttons: {
            width: '20%'
        },
        sorting: {
            width: '60%',
            display: 'flex',
            justifyContent: 'flex-end',
            '& *': {
                width: (1/sortBy.length)*100+'%',
                fontSize: '1.5em'
            }
        }
    })


    return (
        <div className={classes().root}>
            <div className={classes().searchBox}>
                <h2 className={classes().label}>Search by title</h2>
                <TextField
                    variant={'outlined'}
                    inputProps={{'data-testid': 'searcher', className: classes().textInput}}
                    value={searchString}
                    onChange={onChange}
                    placeholder='Search...'
                />
            </div>
            <div className={classes().buttons}>
                <SignLogIn isLogged={!user}/>
            </div>
            <div className={classes().sorting}>
                {sortBy.map((sort, index) => (
                    <SortButton key={index} sort={sort} refresh={props.refresh} nummer={index.toString()}/>
                ))}
            </div>
        </div>
    );
}

export default Header;