import React from 'react';
import {Checkbox, useMediaQuery} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../types/State";
import {myMovies} from "../../actions";
import RangeSlider from "./RangeSlider";
import GenreSelector from "./GenreSelector";
import {makeStyles} from "@material-ui/styles";

// Holder styr på parametere å endre søket etter
function ControlPanel(props: { refresh: () => void, show:boolean }) {

    const dispatch = useDispatch();
    // Henter inn score fra redux state
    const score = useSelector((state: State) => state.filter.score);
    // Henter årstall fra redux state
    const year = useSelector((state: State) => state.filter.year);
    const user = useSelector((state: State) => state.user);

    //Brukes for å bestemme hvilken meny som skal rendres.
    const mobile = useMediaQuery('(max-width: 1200px)').valueOf();

    function handleTick() {
        dispatch(myMovies())
    }
    const useStyles = makeStyles({
        root: {
            backgroundColor: '#70A9A1',
            height: '100%',
            padding: '50px'
        }
    });
    const classes = useStyles();
    return (
        <div className={classes.root} >
            {!!user ?
                <div className={"Checkbox"}>
                    <h2>My movies</h2>
                    <Checkbox  color='secondary' id='checkboxMovie' style={{margin: '10px'}} onChange={handleTick}/>
                </div> : 
                <div/>}
                <br/>
            <GenreSelector refresh={props.refresh}/>
            <RangeSlider score={score} type="score"/>
            <RangeSlider score={year} type="year"/>
        </div>
    );
}

export default ControlPanel;