import * as React from 'react'
import { TextField } from '@material-ui/core'

export const renderTextField = ({
                                    input, label, type, meta: { touched, error, valid },
                                }: {
    input: any,
    label: string,
    type: string,
    meta: {
        touched: boolean,
        valid: boolean,
        error: Error
    }
}) => (
    <TextField
        autoComplete={label}
        margin="normal"
        error={touched && !valid}
        helperText={touched && error}
        fullWidth
        type={type}
        placeholder={label}
        value={input.value}
        onChange={input.onChange}
    />
)
