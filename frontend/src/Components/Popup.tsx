import React from 'react';
import './CSS/Popup.css';

const Popup = (props:any) => (
      <div className="Popup">
          <div className="ButtonSection">
            <button>Back</button>
          </div>
          <div className="MovieSection">
            <img src={props.poster} alt=""/>
            <div className="MovieInfo">
                <h2>{props.tittel}</h2>
                <h3>{props.year}</h3>
                <p>{props.storyline}</p>
            </div>
          </div>
      </div>
)
  export default Popup;