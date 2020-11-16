import React, {useRef, useState} from 'react';
import {TextField, useMediaQuery, useTheme} from "@material-ui/core";
import {setSearch} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import SignLogIn from "./SignLogIn";
import {State} from "../../types/State";
import {makeStyles} from "@material-ui/styles";
import SortButton from "./SortButton";
import {sortBy} from "../../App";


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

    const theme = useTheme();

    const classes = makeStyles({
        root: {
            height: useMediaQuery('(max-width: 1400px)').valueOf() ? '220px' : '120px',
            position: 'fixed',
            width: '100%',
            zIndex: 100,
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            flexDirection: useMediaQuery('(max-width: 1400px)').valueOf() ? 'column' : 'row',
            alignItems: useMediaQuery('(max-width: 1400px)').valueOf() ? 'center' : 'flex-end',
            padding: '10px',
        },
        label: {
            color: theme.palette.info.contrastText,
        },
        textInput: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.getContrastText(theme.palette.primary.main),
            borderRadius: '10px',
            height: '5px'
        },
        searchBox: {
            width: useMediaQuery('(max-width: 1400px)').valueOf() ? '80%' : '17%',
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '10px',
            '& *': {
                margin: 0,
            }
        },
        buttons: {
            width: useMediaQuery('(max-width: 1400px)').valueOf() ? '' : '20%',
        },
        sorting: {
            width: '60%',
            display: useMediaQuery('(max-width: 1400px)').valueOf() ? 'none' : 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            height: '100%',
            '& *': {
                width: (1 / sortBy.length) * 100 + '%',
                fontSize: '1.5em',
                height: '60px'
            }
        },
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
                    <SortButton mobile={false} key={index} sort={sort} refresh={props.refresh}
                                nummer={index.toString()}/>
                ))}
            </div>
        </div>
    );
}

export default Header;