import { NumberFormField } from './formikConfig';

export const sumFields = (values: NumberFormField[]): number =>
    values.reduce((acc, curr) => curr.value! + acc, 0);
