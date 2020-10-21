import React from 'react';
import './CSS/SortingPanel.css';
import SortButton from "./SortButton";

function SortingPanel() {
  /*Ulike ting vi skal sortere fra (dette må håndteres av redux)*/
  const sortBy = ["Name", "Rating", "Duration", "Year"];

  return (
    <div className="SortingPanelWrapper">
      <div className="SortingPanel">
      {sortBy.map((sort, index) => (
        <SortButton key={index} sort={sort}/>
      ))}
      </div>
    </div>
  );
}
  
export default SortingPanel;