import React from 'react';
import { Field, FieldInputProps } from 'formik';
import { Checkbox, FormControlLabel } from '@material-ui/core/';

interface Props {
    name: string;
    label: string;
}

interface CheckboxProps {
    label: string;
    field: FieldInputProps<Props>;
}

export default ({ name, label }: Props) => {
    return <Field component={FormCheckbox} name={name} label={label} />;
};

const FormCheckbox = ({ label, field }: CheckboxProps) => (
    <FormControlLabel
        style={{ marginLeft: '15px' }}
        control={<Checkbox {...field} value={field.value} color='default' />}
        label={label}
    />
);
