import * as Yup from 'yup';

export default Yup.object().shape({
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
                .nullable(false)
                .positive('Must be a positive number')
        })
    )
});
