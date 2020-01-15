import {ApiEvent, GetEventDetailParams, GetEventsParams, GetEventsResponse} from "./eventStream.type";
// ------------------------------------------
// Exported actions
// ------------------------------------------
export const GET_EVENTS = 'GET_EVENTS'
export const GET_EVENTS_SUCCEEDED = 'GET_EVENTS_SUCCEEDED'
export const GET_EVENTS_FAILED = 'GET_EVENTS_FAILED'

export const GET_EVENT_DETAIL = 'GET_EVENT_DETAIL'
export const GET_EVENT_DETAIL_SUCCEEDED = 'GET_EVENT_DETAIL_SUCCEEDED'
export const GET_EVENT_DETAIL_FAILED = 'GET_EVENT_DETAIL_FAILED'

export const EXPAND_EVENT_ROW = 'EXPAND_EVENT_ROW'
export const COLLAPSE_EVENT_ROW = 'COLLAPSE_EVENT_ROW'

export const SUBSCRIBE_TO_EVENT_STREAM = 'SUBSCRIBE_TO_EVENT_STREAM'
export const SUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED = 'SUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED'
export const SUBSCRIBE_TO_EVENT_STREAM_FAILED = 'SUBSCRIBE_TO_EVENT_STREAM_FAILED'

export const UNSUBSCRIBE_TO_EVENT_STREAM = 'UNSUBSCRIBE_TO_EVENT_STREAM'
export const UNSUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED = 'UNSUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED'
export const UNSUBSCRIBE_TO_EVENT_STREAM_FAILED = 'UNSUBSCRIBE_TO_EVENT_STREAM_FAILED'

export const NEW_EVENT_RECEIVED = 'NEW_EVENT_RECEIVED'

export interface GetEventsAction {
    type: typeof GET_EVENTS
    payload: GetEventsParams
}

export interface GetEventsSucceededAction {
    type: typeof GET_EVENTS_SUCCEEDED
    payload: GetEventsResponse
}

export interface GetEventsFailedAction {
    type: typeof GET_EVENTS_FAILED
    payload: Error
}

export interface GetEventDetailAction {
    type: typeof GET_EVENT_DETAIL
    payload: GetEventDetailParams
}

export interface GetEventDetailSucceededAction {
    type: typeof GET_EVENT_DETAIL_SUCCEEDED
    payload: ApiEvent
}

export interface GetEventDetailFailedAction {
    type: typeof GET_EVENT_DETAIL_FAILED
    payload: Error
}

export interface ExpandEventRowAction {
    type: typeof EXPAND_EVENT_ROW
    payload: string
}

export interface CollapseEventRowAction {
    type: typeof COLLAPSE_EVENT_ROW
    payload: string
}

export interface SubscribeToEventStreamAction {
    type: typeof SUBSCRIBE_TO_EVENT_STREAM
    payload: string
}

export interface SubscribeToEventStreamSucceededAction {
    type: typeof SUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED
    payload: ZenObservable.Subscription
}

export interface SubscribeToEventStreamFailedAction {
    type: typeof SUBSCRIBE_TO_EVENT_STREAM_FAILED
    payload: Error
}

export interface UnsubscribeToEventStreamAction {
    type: typeof UNSUBSCRIBE_TO_EVENT_STREAM
    payload: ZenObservable.Subscription
}

export interface UnsubscribeToEventStreamSucceededAction {
    type: typeof UNSUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED
    payload: string
}

export interface UnsubscribeToEventStreamFailedAction {
    type: typeof UNSUBSCRIBE_TO_EVENT_STREAM_FAILED
    payload: Error
}

export interface NewEventReceived {
    type: typeof NEW_EVENT_RECEIVED
    payload: ApiEvent
}

export type EventStreamActionTypes = GetEventsAction | GetEventsSucceededAction | GetEventsFailedAction |
    GetEventDetailAction | GetEventDetailSucceededAction | GetEventDetailFailedAction |
    ExpandEventRowAction | CollapseEventRowAction |
    SubscribeToEventStreamAction | SubscribeToEventStreamFailedAction | SubscribeToEventStreamSucceededAction |
    UnsubscribeToEventStreamAction | UnsubscribeToEventStreamFailedAction | UnsubscribeToEventStreamSucceededAction |
    NewEventReceived
