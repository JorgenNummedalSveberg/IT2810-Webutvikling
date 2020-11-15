import React, {useRef} from 'react';
import {Paper, Slider} from '@material-ui/core';
import {useDispatch} from "react-redux";
import {setPage, setScore, setYears} from '../../actions';
import {makeStyles} from '@material-ui/styles';
import ImdbIcon from "../Shared/ImdbIcon";


export default function RangeSlider(props: { score: number[], type: string, refresh: () => void }) {

    // Value som setter verdien på slidern
    const [value, setValue] = React.useState<number[]>([props.score[0], props.score[1]]);
    const [range] = React.useState<number[]>(props.type === "year" ? [1900, 2020] : [0, 10]);


    // Nødvendig for redux
    const dispatch = useDispatch();

    // Tom timeout ref som defineres først;
    let timeoutRef = useRef(setTimeout(() => {
    }, 0));

    // Når input endres tømmer vi den aktive timeouten og starter på nytt. Når der har gått 300ms, oppdater score range
    function handleChange(e: any, data: number | number[]) {
        clearTimeout(timeoutRef.current);
        setValue(data as number[]);
        timeoutRef.current = setTimeout(() => {
            dispatch(setPage(0));
            if (props.type === 'score') {
                dispatch(setScore(data as number[]));
            } else {
                dispatch(setYears(data as number[]));
            }
            props.refresh();
        }, 300);
    }

    const classes = makeStyles({
        slider: {
            backgroundColor: '#E98074',
            padding: '20px',
            borderRadius: '10px'
        },
        sliderLabel: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        imdbLogo: {
            marginTop: '20px'
        }
    })
    return (
        <Paper className={classes().slider}>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                step={props.type === 'year' ? 5 : 0.5}
                marks
                min={range[0]}
                max={range[1]}
            />
            <div className={classes().sliderLabel}>
                {props.type === 'year' ?
                    <h3>{value[0]}</h3> :
                    <div className={classes().imdbLogo}><ImdbIcon rating={value[0]} height={25}/></div>}
                <h2>{props.type === 'year' ? "Year" : "Rating"}</h2>
                {props.type === 'year' ?
                    <h3>{value[1]}</h3> :
                    <div className={classes().imdbLogo}><ImdbIcon rating={value[1]} height={25}/></div>}
            </div>
        </Paper>
    )
}