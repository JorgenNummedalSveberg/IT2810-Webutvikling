import React,{useState} from 'react';
import './CSS/SortButton.css';

function SortButton(props:any) {
    const [isActive, toggleActive] = useState(false);
    
    function toggleSort() {
      toggleActive((isActive)  => !isActive);
      console.log("clicked");
    }

    /* Skal brukes til å laste inn en ny liste basert på sortering og filter*/
    function loadList(){

    }
    
    return (
      <div className={"SortButton"} onClick={toggleSort}>
        <svg style={{"transform":"rotate(-"+(isActive ? 90 : 0)+"deg)"}} width="258" height="452" viewBox="0 0 258 452" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.40504 203.555L203.692 9.27392C216.051 -3.09108 236.089 -3.09108 248.442 9.27392C260.796 21.6279 260.796 41.6649 248.442 54.0179L76.5281 225.927L248.437 397.83C260.791 410.189 260.791 430.224 248.437 442.578C236.083 454.937 216.046 454.937 203.687 442.578L9.40003 248.294C3.22303 242.114 0.13802 234.023 0.13802 225.928C0.138021 217.829 3.22904 209.732 9.40504 203.555Z" fill={(isActive ? "#DEDA77" : "#D1D1D1")}/>
        </svg>


        <h3 style={{"color":(isActive ? "#DEDA77" : "#D1D1D1")}}>{props.sort}</h3>
      </div>
    );
  }
  
  export default SortButton;
