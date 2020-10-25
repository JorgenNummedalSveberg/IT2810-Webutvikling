import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
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

    const [value, setValue] = React.useState<number[]>([props.score[0], props.score[1]]);



    const handleChange = (event: any, newValue: number | number[]) => {
      setValue(newValue as number[]);  
      if(props.type === 'score'){
        dispatch(setScore(newValue as number[]));
      } else{
          dispatch(setYears(newValue as number[]));
      } 
        //Kan legge til at det automatisk skal byttes til rating sortering
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