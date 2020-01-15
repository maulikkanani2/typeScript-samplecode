import { fork } from 'redux-saga/effects';
import {authSaga} from "../auth/auth.saga";
import {eventStreamSaga} from "../eventStream/eventStream.saga";
import {apisSaga} from "../apis/apis.saga";

export default function* appSaga () {
    yield fork(authSaga)
    yield fork(eventStreamSaga)
    yield fork(apisSaga)
}
