import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setDesc, setSort} from "../../actions";
import {State} from "../../types/State";
import {makeStyles} from "@material-ui/styles";
import {sortBy} from "../../App";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

// Knapp som oppdaterer hva kategori vi sorterer etter og hvilken retning vi sorterer i
function SortButton(props: {mobile: boolean, sort: string, refresh: () => void, nummer: string }) {

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

    const classes = makeStyles({
        div: {
            display: 'flex',
            flexDirection: props.mobile?'column':'row',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: 'rgb(200, 200, 200, 0.5)',
            borderRadius: '5px',
            cursor: 'pointer',
            width: (1/sortBy.length)*100-5+'%',
            margin: '10px',
            height: '100%'
        },
        sortTitle: {
            color: active?'#DEDA77':'#D1D1D1',
            width: '100%',
            margin: 0,
            paddingTop: props.mobile?'40px':'7px'
        },
        arrow: {
            color:(active ? "#DEDA77" : "#D1D1D1")
        }
    })

    return (
        <div className={classes().div} data-testid={"sortbutton" + props.nummer} id={"sortbutton" + props.nummer}
             onClick={toggleSort}>
            {props.mobile?<h3 className={classes().sortTitle}>{props.sort}</h3>:null}
            {active?(desc?
                <KeyboardArrowDownIcon className={classes().arrow}/>:
                <KeyboardArrowUpIcon className={classes().arrow}/>):
                <KeyboardArrowLeftIcon className={classes().arrow}/>}
            {!props.mobile?<h3 className={classes().sortTitle}>{props.sort}</h3>:null}
        </div>
    );
}

export default SortButton;
