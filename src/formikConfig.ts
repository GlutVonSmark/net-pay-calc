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
