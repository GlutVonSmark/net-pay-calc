const tax_credit: number = 275.0; // this also depends on civil status (married gets more credit)
const health_insurance: number = 166.77;
const travel: number = 120.83;
const LPT = 20.08; //NOTE:  LAND PROPERTY TAX (not used in tax calculations)

const TAX_20: number = 35300 / 12; // NOTE: this depends on civil status see: https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/tax-relief-charts/index.aspx

const calculate_net_pay = (pay: number, has_pension: boolean): number => {
    const taxable_gross_pay = pay + health_insurance - travel;
    const pension: number = has_pension ? taxable_gross_pay * 0.03 : 0; // TODO: test this

    const usc: number = calculate_usc(taxable_gross_pay);
    const prsi: number = calculate_prsi(taxable_gross_pay);
    const tax: number = calculate_tax(taxable_gross_pay);

    return pay - pension - usc - prsi - tax - travel - LPT;
};

export const calculate_tax = (taxable_gross_pay: number): number =>
    TAX_20 * 0.2 + (taxable_gross_pay - TAX_20) * 0.4 - tax_credit;

export const calculate_prsi = (taxable_gross_pay: number): number =>
    taxable_gross_pay * 0.04;

// TODO: refactor this
export const calculate_usc = (taxable_gross_pay: number): number => {
    const usc05: number = 1001;
    const usc2: number = 1656.17; // FIXME: this will change from feb 2020. Do we want to take data?
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
    return usc;
};

export default calculate_net_pay;
