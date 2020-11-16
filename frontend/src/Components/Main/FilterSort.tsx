import {Button, Drawer} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {sortBy} from "../../App";
import ControlPanel from "../ControlPanel/ControlPanel";
import React from "react";
import SortButton from "../Header/SortButton";

export default function FilterSort(props: {refresh: () => void, sorting: string, openSorting: boolean, setSortingOpen: (b: boolean) => void, openFilter: boolean, setFilterOpen: (b: boolean) => void}) {
    return (
        <div>
            <Drawer anchor={'top'} open={props.openSorting} onClose={() => props.setSortingOpen(false)}>
                <Button startIcon={<ArrowBackIcon/>} onClick={() => props.setSortingOpen(false)}>Close</Button>
                <div className={props.sorting}>
                    {sortBy.map((sort, index) => (
                        <SortButton mobile={true} key={index} sort={sort} refresh={props.refresh}
                                    nummer={index.toString()}/>
                    ))}
                </div>
            </Drawer>
            <Drawer anchor={'left'} open={props.openFilter} onClose={() => props.setFilterOpen(false)}>
                <Button startIcon={<ArrowBackIcon/>} onClick={() => props.setFilterOpen(false)}>Close</Button>
                <ControlPanel mobile={true} refresh={props.refresh}/>
            </Drawer>
        </div>
    )
}