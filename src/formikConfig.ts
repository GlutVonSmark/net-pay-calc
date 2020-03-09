import calculate_net_pay from './tax-calc';

interface FormValues {
    salary: number | null;
    tax_credit: number;
    travel: number | null;
    property_tax: number | null;
    bonuses: { id: string; name: string; value: number | null }[];
    deducuctables: { id: string; name: string; value: number | null }[]; // QUESTION: should this be it's onw type if i'm reusing it?
}

export const initialValues: FormValues = {
    salary: null,
    travel: null,
    bonuses: [{ id: '1abc', name: 'Health Insurance', value: 166.77 }],
    deducuctables: [],
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
