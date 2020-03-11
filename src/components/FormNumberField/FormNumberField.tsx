import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Field, getIn, FormikProps, FieldInputProps } from 'formik';

interface FormNumberFieldProps {
    label: string;
    required?: boolean;
    field: FieldInputProps<any>;
    form: FormikProps<any>;
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

const FormNumberField = ({
    label,
    required,
    field,
    form: { errors, touched }
}: FormNumberFieldProps) => {
    const wasTouched = getIn(touched, field.name);
    const errorMessage = wasTouched && getIn(errors, field.name);
    return (
        <TextField
            {...field}
            label={label}
            required={required}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='start'>€</InputAdornment>
                ),
                inputProps: {
                    style: { textAlign: 'right' }
                }
            }}
            type='number'
            color='primary'
            error={errorMessage}
            helperText={errorMessage}
        />
    );
};

export default FormNumberInput;
