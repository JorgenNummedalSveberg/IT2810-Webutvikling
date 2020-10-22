import React from 'react';
import './CSS/SearchField.css';
import {Input} from 'semantic-ui-react';
import {setFilterState, setSearch} from "../actions";
import {filter} from "../types/filter";
import {useDispatch} from "react-redux";

function SearchField(props: {refresh: any}) {
    const dispatch = useDispatch();
    function onChange(e: any,  data: any) {
        dispatch(setSearch(data.value))
        props.refresh();
    }
    return (
        <Input className={"SearchField"} onChange={onChange} placeholder='Search...' />
    );
  }
  
  export default SearchField;