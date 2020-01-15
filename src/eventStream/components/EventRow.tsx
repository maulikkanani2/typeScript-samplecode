import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {
    Grid,
    Typography,
    IconButton,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from '@material-ui/core'
import {AccessTime} from '@material-ui/icons'
import {ExpandMore, ExpandLess} from '@material-ui/icons'
import style from './EventStreamStyle'
import {ApiEvent, GetEventDetailParams} from "../eventStream.type";
import EventDetail from "./EventDetail";
import {AppState} from "../../app/app.type";
import {COLLAPSE_EVENT_ROW, EXPAND_EVENT_ROW, GET_EVENT_DETAIL} from "../eventStream.action";
import {connect} from "react-redux";

interface EventRowProps {
    event: ApiEvent
    expandedEventIds: Set<String>
    expandEventRow: (eventId: string) => (void)
    collapseEventRow: (eventId: string) => (void)
    getEventDetail: (params: GetEventDetailParams) => (void)
    classes: any
}

const EventRow: React.FC<EventRowProps> = (props: EventRowProps) => {
    const {classes, event, getEventDetail, expandEventRow, collapseEventRow} = props
    const expanded = props.expandedEventIds.has(event.eventId)

    const setExpanded = (expanded: boolean) => {
        if (expanded) {
            expandEventRow(event.eventId)
            if (!event.includesDetail) {
                getEventDetail({apiId: event.apiId, eventId: event.eventId})
            }
        } else {
            collapseEventRow(event.eventId)
        }
    }
    const handleExpansionChange = (e: object, expanded: boolean) => {
        setExpanded(expanded)
    }

    const statusClassName = event.isError ? classes.errorStatusCode : classes.successStatusCode

    return (
        <ExpansionPanel className={classes.eventRow} TransitionProps={{unmountOnExit: true}} expanded={expanded}
                        onChange={handleExpansionChange}>
            <ExpansionPanelSummary>
                <Grid container>
                    <Grid item lg={8} md={6} sm={6} xs={10}>
                        <Typography variant="subtitle1"><strong>{event.request.method}</strong> {event.request.path}</Typography>
                    </Grid>
                    <Grid item lg={1} md={2} sm={2} xs={2} className={classes.right}>
                        <Typography variant="subtitle1" className={statusClassName}>{event.response.statusCode}</Typography>
                    </Grid>
                    <Grid item lg={1} md={1} sm={1} xs={12} className={classes.right}>
                        <Typography variant="subtitle1">
                            <AccessTime/> {event.latencyDisplay}
                        </Typography>
                    </Grid>
                    <Grid item lg={1} md={2} sm={2} xs={11} className={classes.right}>
                        <Typography variant="subtitle1">{event.receivedAtDisplay}</Typography>
                    </Grid>
                    <Grid item lg={1} md={1} sm={1} xs={1} className={classes.right}>
                        <IconButton onClick={() => setExpanded(!expanded)}>
                            {expanded &&
                            <ExpandLess/>
                            }
                            {!expanded &&
                            <ExpandMore/>
                            }
                        </IconButton>
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <EventDetail expanded={expanded} event={event}/>
            </ExpansionPanelDetails>
        </ExpansionPanel>

    )
}

const mapStateToProps = (state: AppState) => ({
    expandedEventIds: state.eventStream.expandedEventIds,
})

const mapDispatchToProps = (dispatch: Function) => ({
    expandEventRow: (eventId: string) => dispatch({type: EXPAND_EVENT_ROW, payload: eventId}),
    collapseEventRow: (eventId: string) => dispatch({type: COLLAPSE_EVENT_ROW, payload: eventId}),
    getEventDetail: (payload: GetEventDetailParams) => dispatch({type: GET_EVENT_DETAIL, payload}),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(EventRow))
