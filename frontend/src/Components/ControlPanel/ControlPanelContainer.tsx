import React from 'react';
import {useTheme} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {myMovies, setPage} from "../../actions";
import {makeStyles} from "@material-ui/styles";
import ControlPanel from "./ControlPanel";

// Holder styr på parametere å endre søket etter
export default function ControlPanelContainer(props: { mobile: boolean, refresh: () => void }) {

    const dispatch = useDispatch();
    // Henter inn score fra redux state
    const score = useSelector((state: State) => state.filter.score);
    // Henter årstall fra redux state
    const year = useSelector((state: State) => state.filter.year);
    const user = useSelector((state: State) => state.user);
    const myMoviesState = useSelector((state: State) => state.filter.myMovies);

    function handleTick() {
        dispatch(setPage(0))
        dispatch(myMovies())
        props.refresh()
    }

    const theme = useTheme();
    const classes = makeStyles({
        root: {
            position: (props.mobile ? 'initial' : 'fixed'),
            minWidth: '500px',
            backgroundColor: theme.palette.primary.light,
            height: '100%',
            padding: '20px'
        },
        divider: {
            margin: '20px 10px 20px 10px'
        },
        myMovies: {
            display: 'inline-block'
        },
        checkbox: {
            padding: '10px',
            flexDirection: 'row',
        },
        none: {
            display: !!user ? 'flex' : 'none',
        }
    });

    return (
        <ControlPanel
            classes={classes()}
            score={score}
            year={year}
            myMoviesState={myMoviesState}
            handleTick={handleTick}
            mobile={props.mobile}
            refresh={props.refresh}/>
    );
}

