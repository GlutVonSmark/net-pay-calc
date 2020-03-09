import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import calculate_net_pay, {
    calculate_tax,
    calculate_prsi,
    calculate_usc
} from '../../tax-calc';

interface Props {
    salary: number | null;
    bik: number;
    travel: number;
    tax_credit: number;
    property_tax: number;
}

export default function Results({
    salary,
    bik,
    travel,
    tax_credit,
    property_tax
}: Props): ReactElement {
    let component: ReactElement;
    if (salary && salary > 0) {
        salary = salary / 12;
        component = (
            <StyledDiv standOut>
                <StyledPre>
                    {`Calculated Tax: ${calculate_tax(
                        salary + bik - travel,
                        tax_credit
                    ).toFixed(2)}
            Calculated PRSI: ${calculate_prsi(salary + bik - travel).toFixed(2)}
            Calculated USC: ${calculate_usc(salary + bik - travel)}
            
            
            `}
                </StyledPre>
                <StyledParagraph>
                    Calculated Net Pay: $
                    {calculate_net_pay(
                        salary,
                        false,
                        bik,
                        travel,
                        property_tax,
                        tax_credit
                    ).toFixed(2)}
                </StyledParagraph>
            </StyledDiv>
        );
    } else {
        component = <></>;
    }
    return component;
}

interface divProps {
    readonly standOut?: boolean;
}

const StyledDiv = styled.div<divProps>`
    margin-bottom: 25px;
    ${(props: divProps) =>
        props.standOut &&
        css`
            margin: 50px;
        `}
`;

const StyledParagraph = styled.pre`
    font-size: x-large;
    font-weight: bolder;
`;

const StyledPre = styled.pre`
    font-weight: bold;
    font-size: larger;
    margin-top: 50px;
`;
