import React, {useRef} from 'react';
import {Slider} from '@material-ui/core';
import {useDispatch} from "react-redux";
import {setPage, setScore, setYears} from '../../actions';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import ImdbIcon from "../Shared/ImdbIcon";

//For å style slideren som er hentet fra Material UI.
const muiTheme = createMuiTheme({
    overrides: {
        MuiSlider: {
            root: {
                background: 'none',
            },
            thumb: {
                height: '18px',
                width: '18px',
                color: "#C0BE7B",
                boxShadow: "#rgba(0,0,0,0.5) 0 2px 2px",
                "&:focus, &:hover, &$active": {
                    boxShadow: 'rgba(0,0,0,0.5) 0px 0px 10px 2px',
                }
            },
            track: {
                color: '#ACA501',
                height: '8px'
            },
            rail: {
                height: '8px',
                color: '#484848'
            },
            mark: {
                height: '8px',
                width: '1px',
                color: 'rgba(255, 255, 255, 0)',
            }
        }
    }
});


export default function RangeSlider(props: { score: number[], type: string }) {

    // Value som setter verdien på slidern
    const [value, setValue] = React.useState<number[]>([props.score[0], props.score[1]]);

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
        }, 300);
    }

    return (
        <div className={"ControlElement"}>
            <ThemeProvider theme={muiTheme}>
                <Slider className="Slider"
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        step={props.type === 'year' ? 5 : 0.5}
                        marks
                        min={props.type === 'year' ? 1900 : 0}
                        max={props.type === 'year' ? 2020 : 10}
                />
            </ThemeProvider>
            <div className="SliderInfo">
               {props.type === 'year' ? <h3>{value[0]}</h3>:<ImdbIcon rating={value[0]} height={25}/>}
               <h2>{props.type === 'year' ? "Year" : "Rating"}</h2>
               {props.type === 'year' ? <h3>{value[1]}</h3>:<ImdbIcon rating={value[1]} height={25}/>}
            </div>
        </div>
    )
}