import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FieldProps, Field } from 'formik';

interface FormNumberFieldProps {
    label: string;
    required?: boolean;
    field: FieldProps;
}

interface FormNumberInputProps {
    name: string;
    label: string;
    required?: boolean;
}

const FormNumberInput = ({ name, label, required }: FormNumberInputProps) => (
    <Field
        component={FormNumberField}
        name={name}
        label={label}
        required={required}
    />
);

const FormNumberField = ({ label, required, field }: FormNumberFieldProps) => (
    <TextField
        {...field}
        label={label}
        required={required}
        InputProps={{
            endAdornment: <InputAdornment position='start'>€</InputAdornment>,
            inputProps: {
                style: { textAlign: 'right' }
            }
        }}
        type='number'
        color='primary'
    />
);

export default FormNumberInput;
