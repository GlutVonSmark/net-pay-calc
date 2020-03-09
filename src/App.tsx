import React from 'react';
import { Formik, Form } from 'formik';
import { initialValues, onSubmit } from './formikConfig';

import Container from '@material-ui/core/Container';

import { ThemeProvider } from '@material-ui/styles';
import theme from './muiMainTheme';

import FormNumberInput from './FormNumberField';
import DynamicField from './DynamicField/DynamicField';
import Results from './Results';
import Header from './Header';
import SubmitButton from './SubmitButton';

import styled, { css } from 'styled-components';

const App: React.FC = () => {
    return (
        <Container maxWidth='md' style={{ textAlign: 'center' }}>
            <ThemeProvider theme={theme}>
                <Header />
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ values, handleChange }) => (
                        <Form style={{ marginTop: '50px' }}>
                            <Container>
                                <FormNumberInput
                                    name='salary'
                                    label='Annual salary'
                                    required
                                />
                                <FormNumberInput
                                    name='tax_credit'
                                    label='Tax credit'
                                    required
                                />
                                <FormNumberInput
                                    name='travel'
                                    label='Tax saver ticket'
                                />

                                <DynamicField
                                    values={values.bonuses}
                                    addButtonText='shikaka'
                                />

                                <FormNumberInput
                                    name='property_tax'
                                    label='Property Tax (LPT)'
                                />
                                <SubmitButton />
                            </Container>
                            <StyledDiv standOut>
                                {/* {JSON.stringify(values, null, 2)} */}

                                {values.salary && values.salary > 0 && (
                                    <Results
                                        salary={values.salary / 12}
                                        bik={values.bonuses.reduce(
                                            (acc, curr) => curr.value! + acc,
                                            0
                                        )}
                                        travel={values.travel!}
                                        tax_credit={values.tax_credit}
                                        property_tax={values.property_tax!}
                                    />
                                )}
                            </StyledDiv>
                        </Form>
                    )}
                </Formik>
            </ThemeProvider>
        </Container>
    );
};

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

export default App;
