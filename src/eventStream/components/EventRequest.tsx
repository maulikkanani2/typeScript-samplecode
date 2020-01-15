import React from "react";
import { Typography, Grid } from '@material-ui/core'
import withStyles from "@material-ui/core/styles/withStyles";
import style from "./EventStreamStyle";
import {ApiEventRequest} from "../eventStream.type";
import {GridSpacing} from "@material-ui/core/Grid";
import EventBody from "./EventBody";

interface EventRequestProps {
    request: ApiEventRequest
    classes: any
}

const EventRequest: React.FC<EventRequestProps> = (props: EventRequestProps) => {
    const {classes, request: {headers}} = props
    const contentTypeHeader = headers.find(({key}) => key === 'Content-Type')

    return (
        <Grid container direction="column" spacing={10 as GridSpacing} className={classes.detailContainer}>
            <Grid item>
                <Typography variant="h6">Headers</Typography>
                <div className={classes.content}>
                    {
                        headers && headers.map(({key, value}) => (
                            <Typography className={classes.keyValuePair} key={`requestHeaders-${key}`}><b>{key}</b>: {value}</Typography>
                        ))
                    }
                </div>
            </Grid>
            <Grid item>
                <Typography variant="h6">Body</Typography>
                <div className={classes.content}>
                    <EventBody body={props.request.body} contentTypeHeader={contentTypeHeader}/>
                </div>
            </Grid>
        </Grid>
    )
}

export default withStyles(style)(EventRequest)

