import calculate_net_pay, {
    calculate_usc,
    calculate_tax,
    calculate_prsi
} from './tax-calc';

const middleBand = 62500 / 12;
const travel = 120.83;
const health_insurance = 166.77;
const taxable_gross_pay = (pay: number): number =>
    pay + health_insurance - travel;

describe('calculate_usc', () => {
    it('calculates correctly for middle band', () => {
        const result = calculate_usc(taxable_gross_pay(middleBand));
        expect(result.toFixed(2)).toEqual((180.02).toFixed(2));
    });
});

describe('calculate_tax', () => {
    it('calculates corectly for middle band', () => {
        const result = calculate_tax(taxable_gross_pay(middleBand));
        expect(result.toPrecision(2)).toEqual((1238.37).toPrecision(2));
    });
});

describe('calculate_prsi', () => {
    it('calculates prsi correctly for middle band', () => {
        const result = calculate_prsi(taxable_gross_pay(middleBand));
        expect(result.toFixed(2)).toEqual((210.17).toFixed(2));
    });
});

describe('calculate net pay', () => {
    it('calculates net pay correctly for middle band', () => {
        const result = calculate_net_pay(middleBand, false);
        expect(result.toFixed(1)).toEqual((3438.86).toFixed(1));
    });
});

// normal 3438.86

// scenario 1: what if travel is not deducated from the taxes
// NOTE: differene is 58.6 euro (which is good)

// scenario 2: how much less money do I get because I have health insurance
