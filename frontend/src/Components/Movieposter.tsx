import React from 'react';
import './CSS/Movieposter.css';
import ImdbIcon from "./ImdbIcon";

const Movieposter = (props:any) => (
  <div className="Movieposter">
    <img src={props.poster}></img>
    <div className="movieInfo">
        <h3>{(props.tittel.length>15) ? (props.tittel.slice(0,15)+".."):props.tittel}</h3>
        <h4>{props.year}</h4>
        <ImdbIcon rating={props.rating}/>
    </div>
  </div>
);
  
export default Movieposter;
  