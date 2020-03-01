// TODO: those need to be arguments
const tax_credit: number = 275.0;
const health_insurance: number = 166.77;
const travel: number = 120.83;

// CutOffs
const usc05: number = 1001;
const usc2: number = 1656.17;
const usc475: number = 5837;

const tax20: number = 2964.92;

// TODO: add LPT

// TODO: typescripty this
const calculate = (pay: number, has_pension: boolean): number => {
    const pension: number = has_pension ? pay * 0.03 : 0;

    // NOTE: don't think I like the way this is calculated (better as on my spreadsheet)
    let usc: number = calculate_usc(pay);
    console.log('usc: ', usc);

    let prsi: number = calculate_prsi(pay);
    console.log('prsi: ', prsi);

    const taxable: number = pay + health_insurance - pension - travel;
    console.log('taxable: ', taxable);

    const tax: number = calculate_tax(taxable);
    console.log('tax: ', tax);

    const net_pay: number = pay - pension - usc - prsi - tax - travel;
    console.log('net_pay: ', net_pay);
    return net_pay;
};

const calculate_tax = (taxable: number): number =>
    tax20 * 0.2 + (taxable - tax20) * 0.4 - tax_credit;

const calculate_prsi = (pay: number): number =>
    (pay + health_insurance - travel) * 0.04;

const calculate_usc = (pay: number): number => {
    let usc: number;
    if (pay >= usc475) {
        usc =
            0.005 * usc05 +
            0.02 * (usc2 - usc05) +
            0.0475 * (usc475 - usc2) +
            (pay + health_insurance - travel - usc475) * 0.08;
    } else {
        usc =
            0.005 * usc05 +
            0.02 * (usc2 - usc05) +
            0.0475 * (pay + health_insurance - travel - usc2);
    }
    return usc;
};

calculate(62500, false);

export default calculate;
