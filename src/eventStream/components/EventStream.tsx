import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import style from './EventStreamStyle'
import {Typography} from "@material-ui/core";
import {useEffect} from "react";
import {GET_EVENTS, SUBSCRIBE_TO_EVENT_STREAM, UNSUBSCRIBE_TO_EVENT_STREAM} from "../eventStream.action";
import {connect} from "react-redux";
import {ApiEvent, GetEventsParams} from "../eventStream.type";
import EventRow from "./EventRow";
import EventStreamLoadingShimmer from "./EventStreamLoadingShimmer";
import {AppState} from "../../app/app.type";

interface EventStreamProps {
    getEvents: (params: GetEventsParams) => (void)
    subscribeToEventStream: (params: {apiId: string}) => (void)
    unsubscribeToEventStream: (subscription: ZenObservable.Subscription) => (void)
    events: ApiEvent[]
    pending: boolean
    subscription: ZenObservable.Subscription
    classes: any
    match: any
}

const EventStream: React.FC<EventStreamProps> = (props: EventStreamProps) => {
    const {classes, match: {params}, getEvents, subscribeToEventStream, unsubscribeToEventStream, events, pending, subscription} = props

    useEffect(() => {
        getEvents({ apiId: params.id})
    }, [getEvents, params.id]);


    useEffect(() => {
        if (!subscription) {
            subscribeToEventStream({ apiId: params.id})
            return () => {
                unsubscribeToEventStream(subscription)
            }
        }
    }, [params.id, subscribeToEventStream, unsubscribeToEventStream, subscription]);

    const ListView = ({ events }) => (
        <React.Fragment>
            <Typography variant="h4" className={classes.header}>
                Events
            </Typography>
            {pending &&
            <EventStreamLoadingShimmer/>
            }
            {!pending &&
            <div>
                {
                    events.map((event: ApiEvent) => (
                        <EventRow event={event} key={event.eventId}/>
                    ))
                }
            </div>
            }
        </React.Fragment>
    );

    if (events) {
        return (
            <ListView events={events} />
        )
    }
    return (
        <h3>
            loading
        </h3>
    )
}

const mapStateToProps = (state: AppState) => ({
    events: state.eventStream.events,
    pending: state.eventStream.pending,
    subscription: state.eventStream.subscription
})

const mapDispatchToProps = (dispatch: Function) => ({
    getEvents: (payload: {apiId: string}) => dispatch({type: GET_EVENTS, payload}),
    subscribeToEventStream: (payload: {apiId: string}) => dispatch({type: SUBSCRIBE_TO_EVENT_STREAM, payload}),
    unsubscribeToEventStream: (payload: ZenObservable.Subscription) => dispatch({type: UNSUBSCRIBE_TO_EVENT_STREAM, payload}),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(EventStream))
