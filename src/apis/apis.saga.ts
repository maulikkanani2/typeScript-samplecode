import { takeEvery, call, put, all } from 'redux-saga/effects';
import * as apisService from './apis.service'
import {GET_API_LIST, GET_API_LIST_FAILED, GET_API_LIST_SUCCEEDED, GetApiListAction} from "./apis.action";

export function* apisSaga() {
    yield all([
        takeEvery(GET_API_LIST, getApiListWorkerSaga),
    ])
}

function* getApiListWorkerSaga(action: GetApiListAction) {
    try {
        const payload = yield call(apisService.getApis, action.payload);

        yield put({ type: GET_API_LIST_SUCCEEDED, payload });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: GET_API_LIST_FAILED, payload: error });
    }
}
