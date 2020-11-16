import React, {useRef} from 'react';
import {useTheme} from '@material-ui/core';
import {useDispatch} from "react-redux";
import {setPage, setScore, setYears} from '../../actions';
import {makeStyles} from '@material-ui/styles';
import RangeSlider from "./RangeSlider";


export default function RangeSliderContainer(props: { score: number[], type: string, refresh: () => void }) {

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

    const theme = useTheme();
    const classes = makeStyles({
        slider: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main),
            padding: '20px',
            borderRadius: '10px'
        },
        sliderLabel: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        imdbLogo: {
            marginTop: '20px'
        },
        sliderRange: {
            color: theme.palette.info.light
        }
    })
    return (
        <RangeSlider
            classes={classes()}
            handleChange={handleChange}
            range={range}
            value={value}
            refresh={props.refresh}
            type={props.type}
            score={props.score}/>
    )
}