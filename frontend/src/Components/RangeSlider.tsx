import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Slider} from '@material-ui/core';
import './CSS/RangeSlider.css';
import {useDispatch, useSelector} from "react-redux";
import { setScore } from '../actions';
import { setYears } from '../actions';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: 200,
  },    
});

const muiTheme = createMuiTheme({
  overrides:{
    MuiSlider: {
      thumb:{
      color: "#C0BE7B",
      },
      track: {
        color: '#ACA501'
      },
      rail: {
        color: '#484848'
      }
    }
}
});

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider(props: {score:number[], type:string}) {
    
    // Nødvendig for redux
    const dispatch = useDispatch();

    // Tom timeout ref som defineres først;
    let timeoutRef = useRef(setTimeout(() => {}, 0));

    // Når input endres tømmer vi den aktive timeouten og starter på nytt. Når der har gått 300ms, oppdater score range
    function handleChange(e: any, data: number | number[]) {
        clearTimeout(timeoutRef.current);
        setValue(data as number[]);
        timeoutRef.current = setTimeout(() => {
            if(props.type === 'score'){
                dispatch(setScore(data as number[]));
            } else{
                dispatch(setYears(data as number[]));
            }
        }, 300);
    }
        //dispatch(setSort("Rating"));
    };

  return (
    <div className={"RangeSlider"}>
        <h2>{props.type ==='year' ? "Year range":"Rating range"}</h2>
        <ThemeProvider theme={muiTheme}>
        <Slider className="Slider"
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            step={props.type === 'year' ? 5:0.5}
            marks
            min={props.type === 'year' ? 1900:0}
            max={props.type === 'year' ? 2020:10}
        />
        </ThemeProvider>
    </div>
  );
}