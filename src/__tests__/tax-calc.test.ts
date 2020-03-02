import calculate_net_pay, {
    calculate_usc,
    calculate_tax,
    calculate_prsi
} from '../tax-calc';

const middleBand = 62500 / 12;
const midLowBand = 2608.85;
const travel = 120.83;
const health_insurance = 166.77;
const LPT = 20.08;
const taxable_gross_pay = (pay: number): number =>
    pay + health_insurance - travel;

describe('calculate_usc', () => {
    it('calculates correctly for middle band', () => {
        const result = calculate_usc(taxable_gross_pay(middleBand));
        const result2 = calculate_usc(midLowBand);
        expect(result.toFixed(2)).toEqual((180.02).toFixed(2));
        expect(result2.toFixed(2)).toEqual((60.98).toFixed(2));
    });
});

describe('calculate_tax', () => {
    it('calculates corectly for middle band', () => {
        const tax_credit = 275;
        const result = calculate_tax(taxable_gross_pay(middleBand), tax_credit);
        expect(result.toFixed(2)).toEqual((1238.38).toFixed(2));
        const result2 = calculate_tax(midLowBand, 348.86);
        expect(result2.toFixed(2)).toEqual((172.91).toFixed(2));
    });
});

describe('calculate_prsi', () => {
    it('calculates prsi correctly for middle band', () => {
        const result = calculate_prsi(taxable_gross_pay(middleBand));
        expect(result.toFixed(2)).toEqual((210.17).toFixed(2));
        const result2 = calculate_prsi(midLowBand);
        expect(result2.toFixed(2)).toEqual((104.35).toFixed(2));
    });
});

describe('calculate net pay', () => {
    it('calculates net pay correctly for middle band', () => {
        // pay: number,
        // has_pension: boolean,
        // health_insurance = 166.77,
        // travel = 120.83,
        // LPT = 20.08,
        // tax_credit: number

        const tax_credit = 275;
        const result = calculate_net_pay(
            middleBand,
            false,
            health_insurance,
            travel,
            LPT,
            tax_credit
        );
        expect(result.toFixed(1)).toEqual((3438.86).toFixed(1));
    });
});

// normal 3438.86

// scenario 1: what if travel is not deducated from the taxes
// NOTE: differene is 58.6 euro (which is good)

// scenario 2: how much less money do I get because I have health insurance
// having insurance costs me 80 euro a month
