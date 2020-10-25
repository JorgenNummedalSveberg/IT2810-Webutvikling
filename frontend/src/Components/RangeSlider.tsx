import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './CSS/RangeSlider.css';
import {state} from "../types/state";
import {useDispatch, useSelector} from "react-redux";
import { setScore } from '../actions';
import { setYears } from '../actions';

const useStyles = makeStyles({
  root: {
    width: 200,
  },    
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
    </div>
  );
}