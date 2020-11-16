import React, {useRef, useState} from 'react';
import {TextField, useMediaQuery, useTheme} from "@material-ui/core";
import {setSearch} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import SignLogIn from "./SignLogIn";
import {State} from "../../types/State";
import {makeStyles} from "@material-ui/styles";
import SortButton from "./SortButton";
import {sortBy} from "../../App";
import SortButtonContainer from "./SortButtonContainer";
import SignLogInContainer from "./SignLogInContainer";
import {User} from "../../types/User";


function Header(props: {
    classes: any,
    searchString: string,
    onChange: (e: any) => void,
    logged: boolean,
    refresh: () => void }) {
    return (
        <div className={props.classes.root}>
            <div className={props.classes.searchBox}>
                <h2 className={props.classes.label}>Search by title</h2>
                <TextField
                    variant={'outlined'}
                    inputProps={{'data-testid': 'searcher', className: props.classes.textInput}}
                    value={props.searchString}
                    onChange={props.onChange}
                    placeholder='Search...'
                />
            </div>
            <div className={props.classes.buttons}>
                <SignLogInContainer refresh={props.refresh} isLogged={props.logged}/>
            </div>
            <div className={props.classes.sorting}>
                {sortBy.map((sort, index) => (
                    <SortButtonContainer mobile={false} key={index} sort={sort} refresh={props.refresh}
                                number={index.toString()}/>
                ))}
            </div>
        </div>
    );
}

export default Header;