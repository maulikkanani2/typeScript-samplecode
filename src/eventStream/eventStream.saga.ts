import { take, takeLatest, takeEvery, call, put, all } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
    GET_EVENT_DETAIL,
    GET_EVENT_DETAIL_FAILED,
    GET_EVENT_DETAIL_SUCCEEDED,
    GET_EVENTS,
    GET_EVENTS_FAILED,
    GET_EVENTS_SUCCEEDED,
    GetEventDetailAction,
    GetEventsAction, NEW_EVENT_RECEIVED,
    SUBSCRIBE_TO_EVENT_STREAM, SUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED, SubscribeToEventStreamAction,
    UNSUBSCRIBE_TO_EVENT_STREAM,
    UNSUBSCRIBE_TO_EVENT_STREAM_FAILED,
    UNSUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED,
    UnsubscribeToEventStreamAction
} from "./eventStream.action";
import * as eventStreamService from './eventStream.service'
import { ApiEventGQL} from "./eventStream.type";

export function* eventStreamSaga() {
    yield all([
        takeLatest(GET_EVENTS, getEventsWorkerSaga),
        takeEvery(GET_EVENT_DETAIL, getEventDetailWorkerSaga),
        takeLatest(SUBSCRIBE_TO_EVENT_STREAM, subscribeToEventStreamWorkerSaga),
        takeLatest(UNSUBSCRIBE_TO_EVENT_STREAM, unsubscribeToEventStreamWorkerSaga),
    ])

}

function* getEventsWorkerSaga(action: GetEventsAction) {
    try {
        const payload = yield call(eventStreamService.getEvents, action.payload);

        yield put({ type: GET_EVENTS_SUCCEEDED, payload });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: GET_EVENTS_FAILED, payload: error });
    }
}

function* getEventDetailWorkerSaga(action: GetEventDetailAction) {
    try {
        const payload = yield call(eventStreamService.getEventDetail, action.payload);

        yield put({ type: GET_EVENT_DETAIL_SUCCEEDED, payload });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: GET_EVENT_DETAIL_FAILED, payload: error });
    }
}

interface ChannelEvent {
    eventType: 'NewEvent' | 'Connected'
    data: ApiEventGQL | ZenObservable.Subscription
}
function createEventChannel(apiId) {
    return eventChannel(emitter => {
        eventStreamService.subscribeToEventStream({
            apiId,
            onNextHandler: (e) => {
                emitter({eventType: 'NewEvent', data: e})
            },
            onCompleteHandler: () => {
                emitter(END)
            },
            onStartHandler: () => {
                console.log("just started")
                // do this somehow
            }
        }).then((subscription) => {
            emitter({eventType: 'Connected', data: subscription})
        });
        return () => {
        }
    })
}

function* subscribeToEventStreamWorkerSaga(action: SubscribeToEventStreamAction) {

    const chan = yield call(createEventChannel, action.payload)
    try {
        while(true) {
            const event: ChannelEvent = yield take(chan)
            if (event.eventType === 'NewEvent') {

                yield put({ type: NEW_EVENT_RECEIVED, payload: event.data });
            } else if (event.eventType === 'Connected') {
                yield put({ type: SUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED, payload: event.data });
            }
        }
    } finally {
        // clean up?
    }
}

function* unsubscribeToEventStreamWorkerSaga(action: UnsubscribeToEventStreamAction) {
    try {
        yield call(eventStreamService.unsubscribeToEventStream, action.payload);

        yield put({ type: UNSUBSCRIBE_TO_EVENT_STREAM_SUCCEEDED });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: UNSUBSCRIBE_TO_EVENT_STREAM_FAILED, payload: error });
    }
}
