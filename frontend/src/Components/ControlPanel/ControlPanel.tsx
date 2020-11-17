import React from 'react';
import {Checkbox, Divider, Paper} from '@material-ui/core';
import RangeSliderContainer from "./RangeSliderContainer";
import GenreSelectorContainer from "./GenreSelectorContainer";

// Holder styr på parametere å endre søket etter
function ControlPanel(props: {
    year: number[];
    score: number[];
    handleTick: () => void;
    myMoviesState: boolean;
    classes: any;
    mobile: boolean, refresh: () => void
}) {
    return (
        <div className={props.classes.root}>
            <div className={props.classes.myMovies}>
                <Paper className={`${props.classes.checkbox} ${props.classes.none}`}>
                    <h2>My movies</h2>
                    <Checkbox data-testid='myMoviesCheckbox' checked={props.myMoviesState} onChange={props.handleTick}/>
                </Paper>
            </div>
            <Divider className={`${props.classes.divider} ${props.classes.none}`}/>
            <GenreSelectorContainer refresh={props.refresh}/>
            <Divider className={props.classes.divider}/>
            <RangeSliderContainer refresh={props.refresh} score={props.score} type="score"/>
            <Divider className={props.classes.divider}/>
            <RangeSliderContainer refresh={props.refresh} score={props.year} type="year"/>
        </div>
    );
}

export default ControlPanel;