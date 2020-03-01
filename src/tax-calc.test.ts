import calculate_net_pay, {
    calculate_usc,
    calculate_tax,
    calculate_prsi
} from './tax-calc';

const middleBand = 62500 / 12;

describe('calculate_usc', () => {
    it('calculates correctly for middle band', () => {
        const pay = middleBand;
        const result = calculate_usc(pay);
        expect(result.toFixed(2)).toEqual((180.02).toFixed(2));
    });
});

describe('calculate_tax', () => {
    it('calculates corectly for middle band', () => {
        const pay = middleBand;
        const result = calculate_tax(pay);
        expect(result.toPrecision(2)).toEqual((1238.37).toPrecision(2));
    });
});

describe('calculate_prsi', () => {
    it('calculates prsi correctly for middle band', () => {
        const pay = middleBand;
        const result = calculate_prsi(pay);
        expect(result.toFixed(2)).toEqual((210.17).toFixed(2));
    });
});

describe('calculate net pay', () => {
    it('calculates net pay correctly for middle band', () => {
        const pay = middleBand;
        const result = calculate_net_pay(pay, false);
        expect(result.toFixed(1)).toEqual((3438.86).toFixed(1));
    });
});
