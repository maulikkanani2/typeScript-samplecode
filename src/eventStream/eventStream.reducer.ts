import * as eventStreamAction from "./eventStream.action";
import {EventStreamState} from "./eventStream.type";
import {
    COLLAPSE_EVENT_ROW, EXPAND_EVENT_ROW,
    GET_EVENT_DETAIL_SUCCEEDED,
    GET_EVENTS,
    GET_EVENTS_FAILED,
    GET_EVENTS_SUCCEEDED, NEW_EVENT_RECEIVED, SUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED, UNSUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED
} from "./eventStream.action";

const initialEventStreamState: EventStreamState = {
    events: [],
    expandedEventIds: new Set(),
    pending: false
}

export default (state: EventStreamState = initialEventStreamState, action: eventStreamAction.EventStreamActionTypes): EventStreamState => {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                pending: true,
            }
        case GET_EVENTS_SUCCEEDED:
            const {items, paginationToken} = action.payload
            return {
                ...state,
                events: items,
                paginationToken,
                error: undefined,
                pending: false,
            }
        case GET_EVENTS_FAILED:
            return {
                ...state,
                error: action.payload,
                pending: false,
            }
        case GET_EVENT_DETAIL_SUCCEEDED:
            const apiEvent = action.payload

            // find the index of the event using event id, then return a new list with the item replaced by the detailed version
            const {events: currentEvents} = state
            const index = currentEvents.findIndex(i => i.eventId === apiEvent.eventId)
            return {
                ...state,
                events: [...currentEvents.slice(0, index), apiEvent, ...currentEvents.slice(index + 1)],
            }
        case COLLAPSE_EVENT_ROW:
            const newSet = new Set(state.expandedEventIds)
            newSet.delete(action.payload)
            return {
                ...state,
                expandedEventIds: newSet,
            }

        case EXPAND_EVENT_ROW:
            const newSet2 = new Set(state.expandedEventIds)
            newSet2.add(action.payload)
            return {
                ...state,
                expandedEventIds: newSet2,
            }
        case SUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED:
            return {
                ...state,
                subscription: action.payload
            }

        case UNSUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED:
            return {
                ...state,
                subscription: undefined
            }
        case NEW_EVENT_RECEIVED:
            const newEvent = action.payload
            return {
                ...state,
                events: [newEvent, ...state.events]
            }
        default:
            return state
    }
}

