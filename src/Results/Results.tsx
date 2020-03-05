import React, { ReactElement } from 'react'
import styled from 'styled-components'
import calculate_net_pay, { calculate_tax, calculate_prsi, calculate_usc } from '../tax-calc';

interface Props {
    salary: number,
    health_insurance: number,
    travel: number,
    tax_credit: number,
    property_tax: number
}

export default function Results({salary, health_insurance, travel, tax_credit, property_tax}: Props): ReactElement {
    return (
        <>
        <StyledPre>

        {`Calculated Tax: ${calculate_tax(
               salary +
               health_insurance -
               travel,
               tax_credit
               ).toFixed(2)}
Calculated PRSI: ${calculate_prsi(
                salary +
                health_insurance -
                travel
            ).toFixed(2)}
Calculated USC: ${calculate_usc(salary +
health_insurance -
travel)}


                   `}

            </StyledPre>
            <StyledParagraph>
            Calculated Net Pay: ${calculate_net_pay(salary, false, health_insurance, travel, property_tax, tax_credit).toFixed(2)}
        </StyledParagraph>
        </>
    )
}

const StyledParagraph = styled.pre`
    font-size: x-large;
    font-weight: bolder
`

const StyledPre = styled.pre`
    font-weight: bold;
    font-size: larger;
    margin-top: 50px;
`;
