/* tslint:disable */

import React, { ReactElement } from 'react';
import { Field, FieldProps } from 'formik';

// TODO: this definitely requires a refactor!!!!!

// interface Props {
//     name: string;
//     label: string;
// }

// interface CheckboxProps {
//     name: string;
//     label: string;
//     field: FieldProps;
// }

export default ({ name, label }) => {
    return <Field component={Checkbox} name={name} label={label} />;
};

const Checkbox = ({ name, label, field }) => {
    return (
        <label>
            <input type='checkbox' {...field} checked={field.value} />
            {label}
        </label>
    );
};
