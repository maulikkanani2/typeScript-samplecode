import * as authAction from "./auth.action";
import {AuthState} from "./auth.type";
import {
    COMPLETE_NEW_PASSWORD_FAILED,
    COMPLETE_NEW_PASSWORD_SUCCEEDED,
    CompleteNewPasswordActionSucceeded,
    RETRIEVE_CURRENT_USER_FAILED,
    RETRIEVE_CURRENT_USER_SUCCEEDED,
    RetrieveCurrentUserActionSucceeded,
    SIGN_IN_SUCCEEDED, SIGN_OUT_FAILED, SIGN_OUT_SUCCEEDED,
    SignInSucceededAction
} from "./auth.action";

const initialAuthState: AuthState = {
    pending: false
}

export default
(state: AuthState = initialAuthState, action: authAction.AuthActionTypes): AuthState => {
    switch (action.type) {
        case SIGN_IN_SUCCEEDED:
            const signInSucceededAction = action as SignInSucceededAction
            const { user, challenge} = signInSucceededAction.payload
            if (challenge && challenge.challengeName === 'NEW_PASSWORD_REQUIRED') {
                return {
                    ...state,
                    user,
                    challenge,
                    error: undefined,
                    pending: false,
                }
            }
            return {
                ...state,
                user,
                challenge: undefined,
                error: undefined,
                pending: false,
            }
        case COMPLETE_NEW_PASSWORD_SUCCEEDED:
            const completeNewPasswordActionSucceeded = action as CompleteNewPasswordActionSucceeded

            return {
                ...state,
                user: completeNewPasswordActionSucceeded.payload,
                challenge: undefined,
                error: undefined,
                pending: false,
            }
        case RETRIEVE_CURRENT_USER_SUCCEEDED:
            const retrieveCurrentUserActionSucceeded = action as RetrieveCurrentUserActionSucceeded
            return {
                ...state,
                user: retrieveCurrentUserActionSucceeded.payload,
                error: undefined,
                pending: false,
            }
        case SIGN_OUT_SUCCEEDED:
            return initialAuthState
        case SIGN_OUT_FAILED:
        case RETRIEVE_CURRENT_USER_FAILED:
        case COMPLETE_NEW_PASSWORD_FAILED:
            return {
                ...state,
                error: action.payload,
                pending: false,
            }

        default:
            return state
    }
}

