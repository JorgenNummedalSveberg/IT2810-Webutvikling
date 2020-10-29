import React from 'react';
import './CSS/SortingPanel.css';
import SortButton from "./SortButton";

// Panelet med sorteringskategorier
function SortingPanel(props: { refresh: any }) {
    // Ulike ting vi sorterer etter, komponenten returnerer en knapp for hvert element
    const sortBy = ["Name", "Rating", "Duration", "Year"];

    return (
        <div className="SortingPanelWrapper">
            <div className="SortingPanel" id={"panelID"}>
                {sortBy.map((sort, index) => (
                    <SortButton key={index} sort={sort} refresh={props.refresh} nummer={index.toString()}/>
                ))}
            </div>
        </div>
    );
}

export default SortingPanel;