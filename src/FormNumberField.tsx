import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

// TODO: add Typescript to this
const FormNumberField = ({ handleChange, value, name, label }) => (
    <FormGroupWithMargin row>
        <TextField
            name={name}
            label={label}
            onChange={handleChange}
            value={value}
            required
            color='primary'
        />
    </FormGroupWithMargin>
);

const FormGroupWithMargin = styled(FormGroup)`
    margin: 20px;
`;

export default FormNumberField;
