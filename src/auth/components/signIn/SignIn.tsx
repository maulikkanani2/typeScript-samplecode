import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import {Paper, Avatar, Typography} from '@material-ui/core'
import {Lock, Warning} from '@material-ui/icons'

import SignInForm from './SignInForm'

import signInStyle from './SignInStyle'
import {AuthState, SignInParams} from "../../auth.type";
import {RoutePathsEnum} from "../../../routes";
import {RETRIEVE_CURRENT_USER, SIGN_IN} from "../../auth.action";
import {AppState} from "../../../app/app.type";

interface SignInProps {
    retrieveCurrentUser: () => (void)
    signIn: (params: SignInParams) => (void)
    auth: AuthState
    classes: any
}

const SignIn: React.FC<SignInProps> = (props: SignInProps) => {
    const {signIn, retrieveCurrentUser, classes, auth: {user, error, challenge}} = props

    useEffect(() => {
        retrieveCurrentUser()
    }, [retrieveCurrentUser]);

    if (user && !challenge) {
        localStorage.setItem('users', JSON.stringify({user}));
        return <Redirect to={RoutePathsEnum.AUTHENTICATED_ROOT}/>
    }

    if (challenge && challenge.challengeName === 'NEW_PASSWORD_REQUIRED') {
        return <Redirect to={RoutePathsEnum.RESET_PASSWORD}/>
    }

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Lock/>
                </Avatar>
                <Typography variant="h4" className={classes.formHeader}>Sign in</Typography>
                {error && typeof error.message === 'string' &&
                <Typography color="error">
                  <Warning/> {error.message}
                </Typography>
                }
                <SignInForm onSubmit={signIn} />
            </Paper>
        </main>
    )
}
const mapStateToProps = (state: AppState) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch: Function) => ({
    signIn: ({email, password}: SignInParams) => dispatch({type: SIGN_IN, payload: { email, password }}),
    retrieveCurrentUser: () => dispatch({type: RETRIEVE_CURRENT_USER}),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(signInStyle)(SignIn))

