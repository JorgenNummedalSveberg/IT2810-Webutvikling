import React from 'react';
import './CSS/SortingPanel.css';
import SortButton from "./SortButton";

function SortingPanel() {
    return (
      <div className="SortingPanelWrapper">
        <div className="SortingPanel">
          <SortButton/>
          <SortButton/>
          <SortButton/>
          <SortButton/>
          <SortButton/>
        </div>
      </div>
    );
  }
  
  export default SortingPanel;