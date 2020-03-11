const calculate_net_pay = (
    pay: number,
    has_pension: boolean,
    bonuses: number,
    deductables: number,
    LPT: number,
    tax_credit: number
): number => {
    const taxable_gross_pay = pay + bonuses! - deductables;
    const pension: number = has_pension ? taxable_gross_pay * 0.03 : 0; // TODO: test this

    const usc: number = calculate_usc(taxable_gross_pay);
    const prsi: number = calculate_prsi(taxable_gross_pay);
    const tax: number = calculate_tax(taxable_gross_pay, tax_credit);

    return pay - pension - usc - prsi - tax - deductables - LPT;
};

type CivilStatus =
    | 'Single'
    | 'Single With Children'
    | 'Married one income'
    | 'Married both with income';

const get20TaxRateBand = (civilStatus: CivilStatus = 'Single'): number => {
    let taxBand = 0;
    switch (civilStatus) {
        case 'Single':
            taxBand = 35300;
            break;
        case 'Single With Children':
            taxBand = 39300;
            break;
        case 'Married one income':
            taxBand = 44300;
            break;
        case 'Married both with income':
            // NOTE: this depends on civil status see: https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/tax-relief-charts/index.aspx
            // don't understand the max tax thingy in the for this option
            taxBand = 44300;
            break;
        default:
            break;
    }
    return taxBand / 12;
};

export const calculate_tax = (
    taxable_gross_pay: number,
    tax_credit: number
): number => {
    // NOTE: this also depends on civil status (married gets more credit) -> this might need to come as param is depends
    const TAX_20 = get20TaxRateBand();

    const lowerBand = Math.min(taxable_gross_pay, TAX_20) * 0.2;
    const higherBand = Math.max(0, taxable_gross_pay - TAX_20) * 0.4;
    return lowerBand + higherBand - tax_credit;
};

export const calculate_prsi = (taxable_gross_pay: number): number =>
    taxable_gross_pay * 0.04;

// TODO: refactor this (needs the lower band scenario)
export const calculate_usc = (taxable_gross_pay: number): number => {
    const usc05: number = 1001;
    const usc2: number = 1656.17; // FIXME: this will change from feb 2020. Do we want to take date?
    const usc45: number = 5837;
    let usc: number;
    // this is simplified
    // first scenario is if you're making above 70k
    // second one is me
    if (taxable_gross_pay >= usc45) {
        usc =
            0.005 * usc05 +
            0.02 * (usc2 - usc05) +
            0.045 * (usc45 - usc2) +
            (taxable_gross_pay + usc45) * 0.08;
    } else {
        // NOTE using this one
        usc =
            0.005 * usc05 +
            0.02 * (usc2 - usc05) +
            0.045 * (taxable_gross_pay - usc2);
    }
    return Number(usc.toFixed(2));
};

export default calculate_net_pay;
