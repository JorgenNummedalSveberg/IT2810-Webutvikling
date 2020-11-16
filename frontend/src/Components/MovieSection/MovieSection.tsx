import {Button, Drawer, Grid} from "@material-ui/core";
import {showPopup} from "../../actions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Popup from "./Popup";
import React from "react";
import ErrorPage from "./ErrorPage";
import PagePickerContainer from "./PagePicker/PagePickerContainer";

export default function MovieSection(props: {
    classes: {
        root: string,
        moviePage: string,
        popup: string,
        main: string,
        movieGrid: string,
        errorPage: string,
        details: string;
        gridItem: string;
        title: string;
        description: string;
        bottomInfo: string},
    dispatch: (f: { payload: boolean; type: string }) => void,
    pagination: JSX.Element,
    popupShow: boolean,
    refresh: (number: number) => void,
    movieCards: JSX.Element[]}) {
    return (
        <div className={props.classes.root}>
            <ErrorPage classes={
                {errorPage: props.classes.errorPage,
                    details: props.classes.details,
                    gridItem: props.classes.gridItem,
                    title: props.classes.title,
                    description: props.classes.description,
                    bottomInfo: props.classes.bottomInfo}}/>
            <div className={props.classes.moviePage}>
                <Drawer anchor={'right'} open={props.popupShow} onClose={() => props.dispatch(showPopup(false))}>
                    <Button startIcon={<ArrowBackIcon/>} onClick={() => props.dispatch(showPopup(false))}>Close</Button>
                    <div className={props.classes.popup}>
                        <Popup refresh={props.refresh}/>
                    </div>
                </Drawer>
                <div className={props.classes.main}>
                    <PagePickerContainer refresh={props.refresh}/>
                    <Grid
                        className={props.classes.movieGrid}
                        container
                        justify="center"
                        alignItems="stretch"
                        spacing={4}
                    >
                        {props.movieCards}
                    </Grid>
                    <PagePickerContainer refresh={props.refresh}/>
                </div>
            </div>
        </div>
    )
}