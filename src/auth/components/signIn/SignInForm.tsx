import * as React from 'react'
import {Field, reduxForm} from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'
import {Button} from '@material-ui/core'

import signInStyle from './SignInStyle'
import {renderTextField} from '../../../helpers/form.helper'
import {SignInParams} from "../../auth.type";
import {compose} from "redux";

interface SignInFormError {
    password?: string
    email?: string
}

const validate = (values: SignInParams) => {
    const errors: SignInFormError = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Required'
    }
    return errors
}

const SignInForm = (props) => {
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
        form: 'SignInForm',
        validate,
    }),
    withStyles(signInStyle),
)(SignInForm)

