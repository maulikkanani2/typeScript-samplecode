import React from 'react';
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import {Paper, Avatar, Typography} from '@material-ui/core'
import {Lock, Warning} from '@material-ui/icons'
import { Redirect} from 'react-router-dom'

import ResetPasswordForm from './ResetPasswordForm'

import resetPasswordStyle from './ResetPasswordStyle'
import {AuthState, CompleteNewPasswordParams} from "../../auth.type";
import {COMPLETE_NEW_PASSWORD} from "../../auth.action";
import {RoutePathsEnum} from "../../../routes";
import {AppState} from "../../../app/app.type";

interface ResetPasswordProps {
    completeNewPassword: Function,
    auth: AuthState
    classes: any
}

const ResetPassword: React.FC<ResetPasswordProps> = (props: ResetPasswordProps) => {
    const {completeNewPassword, classes, auth: {user, error, challenge}} = props
    if (!user && !challenge) {
        return <Redirect to={RoutePathsEnum.UNAUTHENTICATED_ROOT} />
    }

    if (user && !challenge) {
        return <Redirect to={RoutePathsEnum.AUTHENTICATED_ROOT} />
    }

    const handleSubmit = ({password}: {password: string}) => {
        if (user && challenge && challenge.challengeName === 'NEW_PASSWORD_REQUIRED') {
            completeNewPassword({ user, password, challengeParams: challenge.challengeParams})
        }
    }

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Lock/>
                </Avatar>
                <Typography variant="h4" className={classes.formHeader}>New Password Required!</Typography>
                {error && typeof error.message === 'string' &&
                <Typography color="error">
                  <Warning/> {error.message}
                </Typography>
                }
                <ResetPasswordForm onSubmit={handleSubmit} />
            </Paper>
        </main>
    )
}

const mapStateToProps = (state: AppState) => ({
    auth: state.auth,
})

const mapDispatchToProps = (dispatch: Function) => ({
    completeNewPassword: (payload: CompleteNewPasswordParams) => dispatch({type: COMPLETE_NEW_PASSWORD, payload}),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(resetPasswordStyle)(ResetPassword))

