import * as Yup from 'yup';
import calculate_net_pay from './tax-calc';
import { sumFields } from './helpers';

interface FormValues {
    salary: number | null;
    tax_credit: number;
    property_tax: number | null;
    bonuses: NumberFormField[];
    deductables: NumberFormField[];
}

export type NumberFormField = {
    id: string;
    name: string;
    value: number | null;
    disabled: boolean;
};

export const initialValues: FormValues = {
    salary: null,
    bonuses: [
        { id: '1abc', name: 'Health Insurance', value: 166.77, disabled: true }
    ],
    deductables: [],
    tax_credit: 275,
    property_tax: null
};

export const onSubmit = (values: FormValues) => {
    alert(
        calculate_net_pay(
            values.salary! / 12,
            false,

            sumFields(values.bonuses),
            sumFields(values.deductables),
            values.property_tax!,
            values.tax_credit!
        )
    );
};

export const validationSchema = Yup.object().shape({
    salary: Yup.number()
        .nullable(true)
        .positive('Must be a positive number')
        .required('Salary must be provided!'),
    tax_credit: Yup.number()
        .nullable(true)
        .required('You must provide tax credit')
        .positive('Must be a positive number'),
    bonuses: Yup.array().of(
        Yup.object().shape({
            name: Yup.string()
                .nullable(false)
                .required('Please provide a name'),
            value: Yup.number()
                .required('Please provide a value')
                .nullable(true)
                .positive('Must be a positive number')
        })
    ),
    deductables: Yup.array().of(
        Yup.object().shape({
            name: Yup.string()
                .nullable(false)
                .required('Please provide a name'),
            value: Yup.number()
                .required('Please provide a value')
                .nullable(true)
                .positive('Must be a positive number')
        })
    )
});
