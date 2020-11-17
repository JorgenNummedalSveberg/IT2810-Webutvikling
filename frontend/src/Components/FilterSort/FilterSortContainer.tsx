import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {useMediaQuery} from "@material-ui/core";
import FilterSort from "./FilterSort";

export default function FilterSortContainer(props: { refresh: () => void }) {

    const styles = makeStyles({
        filterButton: {
            fontSize: '2em',
            backgroundColor: 'rgb(200, 200, 200, 0.5)',
            padding: '0 20px 0 20px',
            margin: '20px 10px 20px 10px'
        },
        thin: {
            display: useMediaQuery('(max-width: 1400px)').valueOf() ? 'flex' : 'none',
            justifyContent: 'center',
            textAlign: 'center'
        },
        sorting: {
            backgroundColor: '#40798C',
            display: 'flex',
            justifyContent: 'center',
            height: '200px',
            padding: '40px',
            '& *': {
                margin: '10px',
                fontSize: '1.3em'
            }
        },
    })
    const classes = styles();

    const [openSorting, setSortingOpen] = useState(false)
    const [openFilter, setFilterOpen] = useState(false)

    return (
        <FilterSort
            classes={{
                filterButton: classes.filterButton,
                thin: classes.thin,
                sorting: classes.sorting
            }}
            refresh={props.refresh}
            openFilter={openFilter}
            openSorting={openSorting}
            setFilterOpen={setFilterOpen}
            setSortingOpen={setSortingOpen}/>
    )
}