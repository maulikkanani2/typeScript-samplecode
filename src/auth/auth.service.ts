import {
    AuthChallenge,
    CompleteNewPasswordParams,
    SignInParams,
    SignInResponse,
    User
} from "./auth.type";
import Auth, {CognitoUser} from "@aws-amplify/auth";


// This is authentication service file. It contains async function that handle authentication with remote services ( AWS Cognito )
// It should *NOT* leak remote service types and business logic back to the main app. Instead, it should convert the result into the types defined in auth.type.ts

// todo: handle error thrown by cognito
/**
 * Helper to convert cognito user to user
 * @param cognitoUser
 */
const convertToUser = (cognitoUser: CognitoUser): User => {
    return {
        userName: cognitoUser.getUsername(),
        cognitoUser,
    }
}

const tryGetChallenge = (cognitoUser: { challengeName?: string, challengeParam?: any }): AuthChallenge | undefined => {
    if (cognitoUser.challengeName) {
        return {
            challengeName: cognitoUser.challengeName,
            challengeParams: cognitoUser.challengeParam,
        }
    }
}
//
// const convertCognitoError = (cognitoError: any): Error => {
//     const {_type, message} = cognitoError
//     switch (_type) {
//         case 'UserNotFoundException':
//             return new AuthError(AuthErrorType.UserNotFound, message)
//         case 'InvalidPasswordException':
//             return new AuthError(AuthErrorType.InvalidPassword, message)
//         default:
//             return new Error(message)
//     }
// }

/**
 * Sign in a user. Return a user and a challenge if necessary
 * @param email
 * @param password
 */
export async function signIn({email, password}: SignInParams): Promise<SignInResponse> {
    const signInResponse = await Auth.signIn(email, password);
    const user = convertToUser(signInResponse)
    const challenge = tryGetChallenge(signInResponse)
    return {
        user, challenge
    }
}

/**
 * Complete new password required challenge
 * @param user
 * @param password
 * @param challengeParams
 */
export async function completeNewPassword({user, password, challengeParams}: CompleteNewPasswordParams): Promise<User> {
    const {requiredAttributes} = challengeParams
    const cognitoUser = await Auth.completeNewPassword(user.cognitoUser, password, requiredAttributes)
    return convertToUser(cognitoUser)
}

export async function signOut(): Promise<void> {
    await Auth.signOut();
}

export async function retrieveCurrentUser(): Promise<User> {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    return convertToUser(cognitoUser)
}
