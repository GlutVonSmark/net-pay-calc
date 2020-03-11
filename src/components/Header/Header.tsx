import React from 'react';
import styled from 'styled-components';

export default () => (
    <>
        <StyledHeader>Net pay calculator for Ireland 2020</StyledHeader>
        <h4>
            <a
                href='https://www.revenue.ie/en/jobs-and-pensions/calculating-your-income-tax/index.aspx'
                style={{
                    textDecoration: 'none',
                    color: 'grey',
                    fontFamily: 'roboto'
                }}
            >
                official docs
            </a>
        </h4>
    </>
);

const StyledHeader = styled.h2`
    margin-top: 100px;
    font-family: 'roboto', 'sans-sarif';
`;
