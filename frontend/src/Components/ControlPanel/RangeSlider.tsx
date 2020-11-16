import React, {useRef} from 'react';
import {Paper, Slider, useTheme} from '@material-ui/core';
import {useDispatch} from "react-redux";
import {setPage, setScore, setYears} from '../../actions';
import {makeStyles} from '@material-ui/styles';
import ImdbIcon from "../Shared/ImdbIcon";


export default function RangeSlider(props: {
    value: any,
    handleChange: (e: any, data: number | number[]) => void,
    range: number[],
    classes: any, score: number[], type: string, refresh: () => void }) {
    return (
        <Paper className={props.classes.slider}>
            <Slider
                className={props.classes.sliderRange}
                value={props.value}
                onChange={props.handleChange}
                valueLabelDisplay="auto"
                step={props.type === 'year' ? 5 : 0.5}
                marks
                min={props.range[0]}
                max={props.range[1]}
            />
            <div className={props.classes.sliderLabel}>
                {props.type === 'year' ?
                    <h3>{props.value[0]}</h3> :
                    <div className={props.classes.imdbLogo}><ImdbIcon rating={props.value[0]} height={25}/></div>}
                <h2>{props.type === 'year' ? "Year" : "Rating"}</h2>
                {props.type === 'year' ?
                    <h3>{props.value[1]}</h3> :
                    <div className={props.classes.imdbLogo}><ImdbIcon rating={props.value[1]} height={25}/></div>}
            </div>
        </Paper>
    )
}