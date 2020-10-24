import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './CSS/RangeSlider.css';
import {state} from "../types/state";
import {useDispatch, useSelector} from "react-redux";
import { setMinScore } from '../actions';

const useStyles = makeStyles({
  root: {
    width: 200,
  },    
});

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider() {
    
    // Nødvendig for redux
    const dispatch = useDispatch();

    // Henter inn sjangre fra redux state
    const minScore = useSelector((state: state) => state.filter.minScore);

    const [value, setValue] = React.useState<number[]>(minScore);



    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
        dispatch(setMinScore(newValue as number[]));
    };

  return (
    <div className={"RangeSlider"}>
        <h2>Minimum score</h2>
        <Slider className="Slider"
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
        />
    </div>
  );
}