import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

interface FormNumberFieldProps {
    handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void;
    value: number | null;
    name: string;
    label: string;
    children?: any;
    required?: boolean;
}

const FormNumberField = ({
    handleChange,
    value,
    name,
    label,
    required
}: FormNumberFieldProps) => (
    <p>
        <TextField
            name={name}
            label={label}
            onChange={handleChange}
            value={value}
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
        />
    </p>
);

export default FormNumberField;
