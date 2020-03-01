import React from 'react';
import TextField from '@material-ui/core/TextField';

interface FormNumberFieldProps {
    handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void;
    value: number | null;
    name: string;
    label: string;
    children: any;
}

const FormNumberField = ({
    handleChange,
    value,
    name,
    label
}: FormNumberFieldProps) => (
    <TextField
        name={name}
        label={label}
        onChange={handleChange}
        value={value}
        required
        type='number'
        color='primary'
    />
);

export default FormNumberField;
