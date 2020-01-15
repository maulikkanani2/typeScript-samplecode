import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as authService from './auth.service'
import {
    COMPLETE_NEW_PASSWORD, COMPLETE_NEW_PASSWORD_FAILED, COMPLETE_NEW_PASSWORD_SUCCEEDED, CompleteNewPasswordAction,
    RETRIEVE_CURRENT_USER, RETRIEVE_CURRENT_USER_FAILED,
    RETRIEVE_CURRENT_USER_SUCCEEDED,
    SIGN_IN,
    SIGN_IN_FAILED,
    SIGN_IN_SUCCEEDED, SIGN_OUT, SIGN_OUT_FAILED, SIGN_OUT_SUCCEEDED,
    SignInAction
} from "./auth.action";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* authSaga() {
    yield all([
        takeLatest(SIGN_IN, signInWorkerSaga),
        takeLatest(COMPLETE_NEW_PASSWORD, completeNewPasswordWorkerSaga),
        takeLatest(RETRIEVE_CURRENT_USER, retrieveCurrentUserWorkerSaga),
        takeLatest(SIGN_OUT, signOutWorkerSaga),
    ])

}

function* signInWorkerSaga(action: SignInAction) {
    try {
        const signInResponse = yield call(authService.signIn, action.payload);

        yield put({ type: SIGN_IN_SUCCEEDED, payload: signInResponse });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: SIGN_IN_FAILED, payload: error });
    }
}

function* completeNewPasswordWorkerSaga(action: CompleteNewPasswordAction) {
    try {
        const response = yield call(authService.completeNewPassword, action.payload);

        yield put({ type: COMPLETE_NEW_PASSWORD_SUCCEEDED, payload: response });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: COMPLETE_NEW_PASSWORD_FAILED, payload: error });
    }
}

function* retrieveCurrentUserWorkerSaga() {
    try {
        const response = yield call(authService.retrieveCurrentUser);

        yield put({ type: RETRIEVE_CURRENT_USER_SUCCEEDED, payload: response });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: RETRIEVE_CURRENT_USER_FAILED, error });
    }
}

function* signOutWorkerSaga() {
    try {
        yield call(authService.signOut);

        yield put({ type: SIGN_OUT_SUCCEEDED });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: SIGN_OUT_FAILED, error });
    }
}
