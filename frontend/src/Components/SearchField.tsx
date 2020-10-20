import React from 'react';
import './CSS/SearchField.css';
import {Input} from 'semantic-ui-react';

function SearchField(props: {updateSearch: any}) {
    function onChange(e: any,  data: any) {
        props.updateSearch(data.value);
    }
    return (
        <Input className={"SearchField"} onChange={onChange} placeholder='Search...' />
    );
  }
  
  export default SearchField;