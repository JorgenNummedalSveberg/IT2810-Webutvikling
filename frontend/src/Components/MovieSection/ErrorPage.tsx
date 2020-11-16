import {Divider, Paper, Typography} from "@material-ui/core";
import React from "react";

export default function errorPage(props: { classes: any, myMovies: boolean }) {
    return (
        <div className={props.classes.errorPage}>
            <Paper className={`${props.classes.details} ${props.classes.gridItem}`} elevation={5}>
                <div className={props.classes.title}>
                    <Typography color='error' variant="h5" component="h2">
                        No movies
                    </Typography>
                    <Divider/>
                </div>
                <div className={props.classes.description}>
                    This might be because:
                </div>
                <div className={props.classes.bottomInfo}>
                    <ul>
                        <li>
                            <Typography color='error'>You may not be on the NTNU network or your VPN is off</Typography>
                        </li>
                        <li>
                            <Typography color='error'>
                                {props.myMovies ?
                                    "You have no movies in your list" :
                                    "We do not have the movie you're looking for"}
                            </Typography>
                        </li>
                    </ul>
                </div>
                <a href={'https://www.youtube.com/watch?v=oHg5SJYRHA0'}>Maybe this can help</a>
            </Paper>
        </div>
    )
}