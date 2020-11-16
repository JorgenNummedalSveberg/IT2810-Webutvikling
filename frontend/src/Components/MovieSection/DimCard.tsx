import {Grid, Paper} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import React from "react";

export default function DimCard(props: { classes: any }) {
    return (
        <Grid className={props.classes().gridItem} item>
            <Paper className={props.classes().paper}>
                <Skeleton animation="pulse" variant="rect" width={300} height={450}/>
                <div className={props.classes().details}>
                    <Skeleton animation="wave" width={180} height={40} style={{margin: 10}}/>
                    <Skeleton animation="wave" width={200} height={2} style={{margin: 10}}/>
                    <Skeleton animation="wave" width={170} height={40} style={{margin: 10}}/>
                    <Skeleton animation="wave" width={130} height={40} style={{margin: 10}}/>
                </div>
            </Paper>
        </Grid>
    )
}