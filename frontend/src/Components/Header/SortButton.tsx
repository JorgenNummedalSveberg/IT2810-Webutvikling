import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setDesc, setSort} from "../../actions";
import {State} from "../../types/State";
import {makeStyles} from "@material-ui/styles";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {Paper, useTheme} from "@material-ui/core";

// Knapp som oppdaterer hva kategori vi sorterer etter og hvilken retning vi sorterer i
function SortButton(props: {
    classes: any,
    toggleSort: () => void,
    mobile: boolean,
    sort: string,
    refresh: () => void,
    number: string,
    active: boolean,
    desc: boolean}) {

    return (
        <Paper elevation={5} className={props.classes.div} data-testid={"sortbutton" + props.number}
               onClick={props.toggleSort}>
            {props.mobile ? <h3 className={props.classes.sortTitle}>{props.sort}</h3> : null}
            {props.active ? (props.desc ?
                <KeyboardArrowDownIcon className={props.classes.arrow}/> :
                <KeyboardArrowUpIcon className={props.classes.arrow}/>) :
                <KeyboardArrowLeftIcon className={props.classes.arrow}/>}
            {!props.mobile ? <h3 className={props.classes.sortTitle}>{props.sort}</h3> : null}
        </Paper>
    );
}

export default SortButton;
