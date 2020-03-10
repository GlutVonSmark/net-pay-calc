import calculate_net_pay from './tax-calc';

interface FormValues {
    salary: number | null;
    tax_credit: number;
    travel: number | null;
    property_tax: number | null;
    bonuses: NumberFormField[];
    deductables: NumberFormField[];
}

export type NumberFormField = {
    id: string;
    name: string;
    value: number | null;
};

export const initialValues: FormValues = {
    salary: null,
    travel: null,
    bonuses: [{ id: '1abc', name: 'Health Insurance', value: 166.77 }],
    deductables: [],
    tax_credit: 275,
    property_tax: null
};

export const onSubmit = (values: FormValues) => {
    alert(
        calculate_net_pay(
            values.salary! / 12,
            false,
            values.travel!,
            0,
            values.property_tax!,
            values.tax_credit!
        )
    );
};
