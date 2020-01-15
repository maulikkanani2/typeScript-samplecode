import * as React from 'react'
import {Field, reduxForm} from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'
import {Button} from '@material-ui/core'
import resetPasswordStyle from './ResetPasswordStyle'
import {renderTextField} from '../../../helpers/form.helper'
import { compose} from 'redux';

interface ResetPasswordFormError {
    password?: string
    passwordConfirm?: string
}

const validate = (values: {password: string, passwordConfirm: string}): ResetPasswordFormError => {
    const errors: ResetPasswordFormError = {}
    if (!values.password) {
        errors.password = 'Required'
    }
    if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'Password does not match'
    }
    return errors
}

const ResetPasswordForm = (props) => {
    const {classes} = props
    return (
        <form className={classes.form} onSubmit={props.handleSubmit}>
            <Field
                className="form-control"
                name="password"
                label="Password"
                type="password"
                component={renderTextField}
            />
            <Field
                className="form-control"
                name="passwordConfirm"
                label="Confirm Password"
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
                Set new password
            </Button>
        </form>
    )
}
export default compose(
    reduxForm({
        form: 'ResetPasswordForm',
        validate,
    }),
    withStyles(resetPasswordStyle),
)(ResetPasswordForm);

// export default reduxForm<ResetPasswordFormData, ResetPasswordFormProps>({
//     form: 'ResetPasswordForm',
//     validate,
// })(withStyles(resetPasswordStyle)(ResetPasswordForm))
