import {CognitoUser} from "@aws-amplify/auth";

export interface SignInParams {
    email: string
    password: string
}

interface ChallengeParams {
    requiredAttributes: any
}
export interface CompleteNewPasswordParams {
    user: User,
    password: string,
    challengeParams: ChallengeParams,
}
export interface AuthChallenge {
    challengeName: string,
    challengeParams: any,
}

export interface User {
    userName: string,
    cognitoUser: CognitoUser,
}

export interface SignInResponse {
    user: User,
    challenge?: AuthChallenge,
}

export interface Error {

}

export interface AuthState {
    readonly user?: User,
    readonly challenge?: AuthChallenge,
    readonly error?: AuthError
    readonly pending: boolean
}

export enum AuthErrorType {
    UserNotFound = 'UserNotFound',
    InvalidPassword = 'InvalidPassword',
    InvalidLogin = 'InvalidLogin'
}

export class AuthError extends Error {
    public type: AuthErrorType
    public message: string

    public constructor(type: AuthErrorType, message: string) {
        super(message);
        this.type = type;
        this.message = message;
    }
}
