// TODO: those need to be arguments
var tax_credit = 275.0;
// var health_insurance = 166.77;
var health_insurance = 0;
var travel = 120.83;
// var travel = 0;
// CutOffs
var usc05 = 1001;
var usc2 = 1656.17;
var usc475 = 5837;
var tax20 = 2964.92;

// TODO: typescripty this
var calculate = function(pay, has_pension) {
    var pension = has_pension ? pay * 0.03 : 0;
    // NOTE: don't think I like the way this is calculated (better as on my spreadsheet)
    var usc = calculate_usc(pay);
    console.log('usc: ', usc);
    var prsi = calculate_prsi(pay);
    console.log('prsi: ', prsi);
    var taxable = pay + health_insurance - pension - travel;
    console.log('taxable: ', taxable);
    var tax = calculate_tax(taxable);
    console.log('tax: ', tax);
    var net_pay = pay - pension - usc - prsi - tax - travel;
    console.log('net_pay: ', net_pay);
    return net_pay;
};
var calculate_tax = function(taxable) {
    return tax20 * 0.2 + (taxable - tax20) * 0.4 - tax_credit;
};
var calculate_prsi = function(pay) {
    return (pay + health_insurance - travel) * 0.04;
};
var calculate_usc = function(pay) {
    var usc;
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
calculate(62500 / 12, false);
export default calculate;
