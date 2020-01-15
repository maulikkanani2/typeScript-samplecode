import { AuthError, CompleteNewPasswordParams, SignInParams, SignInResponse, User} from "./auth.type";
// ------------------------------------------
// Exported actions
// ------------------------------------------
export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_SUCCEEDED = 'SIGN_IN_SUCCEEDED'
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED'

export const SIGN_OUT = 'SIGN_OUT'
export const SIGN_OUT_FAILED = 'SIGN_OUT_FAILED'
export const SIGN_OUT_SUCCEEDED = 'SIGN_OUT_SUCCEEDED'

export const COMPLETE_NEW_PASSWORD = 'COMPLETE_NEW_PASSWORD'
export const COMPLETE_NEW_PASSWORD_SUCCEEDED = 'COMPLETE_NEW_PASSWORD_SUCCEEDED'
export const COMPLETE_NEW_PASSWORD_FAILED = 'COMPLETE_NEW_PASSWORD_FAILED'

export const RETRIEVE_CURRENT_USER = 'RETRIEVE_CURRENT_USER'
export const RETRIEVE_CURRENT_USER_SUCCEEDED = 'RETRIEVE_CURRENT_USER_SUCCEEDED'
export const RETRIEVE_CURRENT_USER_FAILED = 'RETRIEVE_CURRENT_USER_FAILED'

export interface SignInAction {
    type: typeof SIGN_IN
    payload: SignInParams
}

export interface SignInSucceededAction {
    type: typeof SIGN_IN_SUCCEEDED
    payload: SignInResponse
}

export interface SignInFailedAction {
    type: typeof SIGN_IN_FAILED
    payload: AuthError
}

export interface SignOutAction {
    type: typeof SIGN_OUT
}

export interface SignOutActionSucceeded {
    type: typeof SIGN_OUT_SUCCEEDED
}

export interface SignOutActionFailed {
    type: typeof SIGN_OUT_FAILED
    payload: AuthError
}

export interface CompleteNewPasswordAction {
    type: typeof COMPLETE_NEW_PASSWORD
    payload: CompleteNewPasswordParams
}

export interface CompleteNewPasswordActionSucceeded {
    type: typeof COMPLETE_NEW_PASSWORD_SUCCEEDED
    payload: User
}

export interface CompleteNewPasswordActionFailed {
    type: typeof COMPLETE_NEW_PASSWORD_FAILED
    payload: AuthError
}

export interface RetrieveCurrentUserAction {
    type: typeof RETRIEVE_CURRENT_USER
}

export interface RetrieveCurrentUserActionSucceeded {
    type: typeof RETRIEVE_CURRENT_USER_SUCCEEDED
    payload: User
}

export interface RetrieveCurrentUserActionFailed {
    type: typeof RETRIEVE_CURRENT_USER_FAILED
    payload: AuthError
}

// export const signIn = ({email password}: SignInParams) => ({}
//     SIGN_IN,
//     authService.signIn
// )
//
// export const completeNewPassword = createAsyncAction(
//     COMPLETE_NEW_PASSWORD,
//     authService.completeNewPassword
// )
//
// export const signOut = createAsyncAction(
//     SIGN_OUT,
//     authService.signOut,
// )
//
// export const retrieveCurrentUser = createAsyncAction(
//     RETRIEVE_CURRENT_USER,
//     authService.retrieveCurrentUser,
// )

export type AuthActionTypes = SignInAction | SignInSucceededAction | SignInFailedAction |
    SignOutAction | SignOutActionSucceeded | SignOutActionFailed |
    CompleteNewPasswordAction | CompleteNewPasswordActionSucceeded | CompleteNewPasswordActionFailed |
    RetrieveCurrentUserAction | RetrieveCurrentUserActionSucceeded | RetrieveCurrentUserActionFailed
