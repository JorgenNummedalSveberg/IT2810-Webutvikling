import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setDesc, setSort} from "../../actions";
import {State} from "../../types/State";
import {makeStyles} from "@material-ui/styles";
import {useTheme} from "@material-ui/core";
import SortButton from "./SortButton";

// Knapp som oppdaterer hva kategori vi sorterer etter og hvilken retning vi sorterer i
function SortButtonContainer(props: { mobile: boolean, sort: string, refresh: () => void, number: string }) {

    // Nødvendig for redux
    const dispatch = useDispatch();

    // Definerer om knappen er trykket basert på om filteret i redux state er likt som navnet til denne knappen
    const active = useSelector((state: State) => state.filter.sort) === props.sort;
    // Bestemmer rentning basert på filter i state
    const desc = useSelector((state: State) => state.filter.desc);

    // Håndterer trykk på knapp, endrer filter i state basert på tittel og retning
    function toggleSort() {
        if (active) {
            // Hvis aktiv, bare bytt retning
            dispatch(setDesc(!desc));
        } else {
            // Hvis ikke aktiv, sett sort i state og set descending til true
            dispatch(setSort(props.sort));
            dispatch(setDesc(true));
        }
        props.refresh();
    }

    const theme = useTheme();
    const classes = makeStyles({
        div: {
            display: 'flex',
            flexDirection: props.mobile ? 'column' : 'row',
            alignItems: 'flex-start',
            textAlign: 'center',
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark
            },
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '10px',
            height: 'calc(100%-20px)'
        },
        sortTitle: {
            color: active ? theme.palette.getContrastText(theme.palette.primary.light) : theme.palette.text.disabled,
            width: '100%',
            margin: 0,
            paddingTop: props.mobile ? '40px' : '7px'
        },
        arrow: {
            color: active ? theme.palette.getContrastText(theme.palette.primary.light) : theme.palette.text.disabled
        }
    })

    return (
        <SortButton
            active={active}
            desc={desc}
            classes={classes()}
            toggleSort={toggleSort}
            refresh={props.refresh}
            mobile={props.mobile}
            number={props.number}
            sort={props.sort}/>
    );
}

export default SortButtonContainer;
