const tax_credit: number = 275.0; // this also depends on civil status (married gets more credit)
const health_insurance: number = 166.77;
const travel: number = 120.83;
const LPT = 20.08; //NOTE:  LAND PROPERTY TAX (not used in tax calculations)

// CutOffs

const tax20: number = 35300 / 12; // NOTE: this depends on civil status see: https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/tax-relief-charts/index.aspx

// TODO: add LPT (don't know where to add it first)

const calculate_net_pay = (pay: number, has_pension: boolean): number => {
    const pension: number = has_pension ? pay * 0.03 : 0;

    // NOTE: don't think I like the way this is calculated (better as on my spreadsheet)
    let usc: number = calculate_usc(pay);

    let prsi: number = calculate_prsi(pay);

    const tax: number = calculate_tax(pay);
    const net_pay: number = pay - pension - usc - prsi - tax - travel - LPT;
    console.log('net pay', pay, pension, usc, prsi, tax, travel, LPT);
    return net_pay;
};

export const calculate_tax = (pay: number): number =>
    tax20 * 0.2 + (pay + health_insurance - travel - tax20) * 0.4 - tax_credit;

export const calculate_prsi = (pay: number): number =>
    (pay + health_insurance - travel) * 0.04;

export const calculate_usc = (pay: number): number => {
    const taxtable_pay = pay + health_insurance - travel;
    const usc05: number = 1001;
    const usc2: number = 1656.17; // FIXME: this will change from feb 2020
    const usc45: number = 5837;
    let usc: number;
    // this is simplified
    // first scenario is if you're making above 70k
    // second one is me
    if (taxtable_pay >= usc45) {
        usc =
            0.005 * usc05 +
            0.02 * (usc2 - usc05) +
            0.045 * (usc45 - usc2) +
            (taxtable_pay + usc45) * 0.08;
    } else {
        // NOTE using this one
        usc =
            0.005 * usc05 +
            0.02 * (usc2 - usc05) +
            0.045 * (taxtable_pay - usc2);

        // NOTE: addition stuff here makes almost zero difference
        // calculation still off by a couple of euros
    }
    return usc;
};

export default calculate_net_pay;
