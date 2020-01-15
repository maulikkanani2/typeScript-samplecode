import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Tabs, Tab, Theme} from '@material-ui/core'
import style from "./EventStreamStyle";
import {ApiEvent, GetEventDetailParams} from "../eventStream.type";
import SwipeableViews from 'react-swipeable-views'
import EventRequest from "./EventRequest";
import EventResponse from "./EventResponse";
import {connect} from "react-redux";
import {GET_EVENT_DETAIL} from "../eventStream.action";

interface EventDetailProps {
    expanded: boolean
    event: ApiEvent
    classes: any
    theme: Theme
    getEventDetail: (params: GetEventDetailParams) => (void)
}

const EventDetail: React.FC<EventDetailProps> = (props: EventDetailProps) => {
    const {theme, event} = props

    // hooks
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    // event handlers
    const handleTabChange = (event, value) => {
        setSelectedTabIndex(value)
    }

    return (
        <div style={{width: "100%"}}>
            <Tabs
                onChange={handleTabChange}
                value={selectedTabIndex}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                <Tab label="Request"/>
                <Tab label="Response"/>
            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={selectedTabIndex}
                onChangeIndex={handleTabChange}
            >
                <EventRequest request={event.request}/>
                {!event.isWaitingForResponse &&
                <EventResponse response={event.response}/>
                }
            </SwipeableViews>
        </div>
    )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Function) => ({
    getEventDetail: (payload: GetEventDetailParams) => dispatch({type: GET_EVENT_DETAIL, payload}),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style, {withTheme: true})(EventDetail))

