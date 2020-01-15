import * as React from 'react'
import {Field, reduxForm} from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'
import {Button} from '@material-ui/core'

import style from './style'
import {renderTextField} from '../../helpers/form.helper'
import {compose} from "redux";

const AddApiForm = (props) => {
    const {classes} = props
    return (
        <form className={classes.form} onSubmit={props.handleSubmit}>
            <Field
                className="form-control"
                name="email"
                label="Email Address"
                component={renderTextField}
            />
            <Field
                className="form-control"
                name="password"
                label="Password"
                type="password"
                component={renderTextField}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
            </Button>
        </form>
    )
}

export default compose(
    reduxForm({
        form: 'AddApiForm',
    }),
    withStyles(style),
)(AddApiForm)

