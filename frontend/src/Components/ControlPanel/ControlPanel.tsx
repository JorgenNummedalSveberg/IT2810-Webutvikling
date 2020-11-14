import React from 'react';
import {Checkbox, Divider, Paper} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {myMovies} from "../../actions";
import RangeSlider from "./RangeSlider";
import GenreSelector from "./GenreSelector";
import {makeStyles} from "@material-ui/styles";

// Holder styr på parametere å endre søket etter
function ControlPanel(props: { mobile: boolean, refresh: () => void }) {

    const dispatch = useDispatch();
    // Henter inn score fra redux state
    const score = useSelector((state: State) => state.filter.score);
    // Henter årstall fra redux state
    const year = useSelector((state: State) => state.filter.year);
    const user = useSelector((state: State) => state.user);

    function handleTick() {
        dispatch(myMovies())
    }

    const classes = makeStyles({
        root: {
            position: (props.mobile ? 'initial' : 'fixed'),
            minWidth: '500px',
            backgroundColor: '#D8C3A5',
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
            backgroundColor: '#E98074',
            padding: '10px',
            flexDirection: 'row',
        },
        none: {
            display: !!user ? 'flex' : 'none',
        }
    });

    return (
        <div className={classes().root}>
            <div className={classes().myMovies}>
                <Paper className={`${classes().checkbox} ${classes().none}`}>
                    <h2>My movies</h2>
                    <Checkbox color='secondary' onChange={handleTick}/>
                </Paper>
            </div>
            <Divider className={`${classes().divider} ${classes().none}`}/>
            <GenreSelector refresh={props.refresh}/>
            <Divider className={classes().divider}/>
            <RangeSlider score={score} type="score"/>
            <Divider className={classes().divider}/>
            <RangeSlider score={year} type="year"/>
        </div>
    );
}

export default ControlPanel;