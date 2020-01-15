import React from 'react';
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import {Paper, Avatar, Typography} from '@material-ui/core'
import {Lock} from '@material-ui/icons'


import style from './style'
import {AppState} from "../../app/app.type";
import AddApiForm from "./AddApiForm";

interface SignInProps {
    classes: any
}

const AddApi: React.FC<SignInProps> = (props: SignInProps) => {
    const { classes } = props
    return (
        <main className={classes.formLayout}>
            <Paper className={classes.formContainer}>
                <Avatar className={classes.avatar}>
                    <Lock/>
                </Avatar>
                <Typography variant="h4" className={classes.formHeader}>Add New API Integration</Typography>
                <AddApiForm />
            </Paper>
        </main>
    )
}
const mapStateToProps = (state: AppState) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch: Function) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(AddApi))

