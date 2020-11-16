import React from 'react';
import {TextField} from "@material-ui/core";
import {sortBy} from "../../App";
import SortButtonContainer from "./SortButtonContainer";
import SignLogInContainer from "./SignLogInContainer";


function Header(props: {
    classes: any,
    searchString: string,
    onChange: (e: any) => void,
    logged: boolean,
    refresh: () => void
}) {
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