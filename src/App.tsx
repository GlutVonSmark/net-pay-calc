import React from 'react';
import { FieldArray, Formik, Form, Field } from 'formik';

import { Container, Button, TextField } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormNumberField from './FormNumberField';
import Results from './Results';
import calculate_net_pay from './tax-calc';
import { FriendList } from './example';

import styled, { css } from 'styled-components';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f4bf41'
        }
    }
});

// FIXME:  why do I have those nulls here anyway (for default values)
interface FormValues {
    salary: number | null;
    tax_credit: number;
    travel: number | null;
    health_insurance: number | null;
    property_tax: number | null;
    bonuses: { id: number; name: string; value: number | null }[];
}

const App: React.FC = () => {
    const initialValues: FormValues = {
        salary: null,
        travel: null,
        health_insurance: null,
        bonuses: [],
        tax_credit: 275,
        property_tax: null
    };

    // TODO: handle Blur (what to do with it)
    return (
        <Container maxWidth='md' style={{ textAlign: 'center' }}>
            <StyledHeader>
                Using Formik, Material UI with Styled Components and Typescript
                and Netlify
            </StyledHeader>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    alert(
                        calculate_net_pay(
                            values.salary! / 12,
                            false,
                            values.health_insurance!,
                            values.travel!,
                            values.property_tax!,
                            values.tax_credit!
                        )
                    );
                }}
            >
                {({ values, handleChange }) => (
                    <StyledForm>
                        <Container>
                            <ThemeProvider theme={theme}>
                                <FormNumberField
                                    value={values.salary}
                                    name='salary'
                                    label='Annual salary'
                                    required
                                    handleChange={handleChange}
                                ></FormNumberField>
                                <FormNumberField
                                    name='tax_credit'
                                    label='Tax credit'
                                    required
                                    handleChange={handleChange}
                                    value={values.tax_credit}
                                />
                                <FormNumberField
                                    name='travel'
                                    label='Tax saver ticket'
                                    handleChange={handleChange}
                                    value={values.travel}
                                />
                                {/* NOTE: add info that you can add this to your tax  credit (animated gif)*/}
                                <FieldArray name='bonuses'>
                                    {arrayHelpers => (
                                        <div>
                                            <Button
                                                color='primary'
                                                variant='contained'
                                                onClick={() =>
                                                    arrayHelpers.push({
                                                        id: Math.random(),
                                                        name: '',
                                                        value: null
                                                    })
                                                }
                                            >
                                                add BIK (benefit in kind)
                                            </Button>

                                            {values.bonuses.map(
                                                (bik, index) => {
                                                    return (
                                                        <div key={bik.id}>
                                                            <Field
                                                                as={TextField}
                                                                name={`bonuses.${index}.name`}
                                                            />

                                                            <FormNumberField
                                                                label={bik.name}
                                                                name={`bonuses.${index}.value`}
                                                                handleChange={
                                                                    handleChange
                                                                }
                                                                value={
                                                                    bik.value
                                                                }
                                                            />
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}
                                </FieldArray>
                                <FormNumberField
                                    name='health_insurance'
                                    label='Health Insurance'
                                    handleChange={handleChange}
                                    value={values.health_insurance}
                                />

                                <FormNumberField
                                    name='property_tax'
                                    label='Property Tax (LPT)'
                                    handleChange={handleChange}
                                    value={values.property_tax}
                                />
                                <p>
                                    <Button
                                        variant='contained'
                                        type='submit'
                                        color='primary'
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Submito!
                                    </Button>
                                </p>
                            </ThemeProvider>
                        </Container>
                        <StyledDiv standOut>
                            {JSON.stringify(values, null, 2)}

                            {values.salary && values.salary > 0 && (
                                <Results
                                    salary={values.salary / 12}
                                    health_insurance={values.health_insurance!}
                                    travel={values.travel!}
                                    tax_credit={values.tax_credit}
                                    property_tax={values.property_tax!}
                                />
                            )}
                        </StyledDiv>
                    </StyledForm>
                )}
            </Formik>
        </Container>
    );
};

const StyledForm = styled(Form)`
    margin-top: 50px;
`;

const StyledHeader = styled.h2`
    margin-top: 100px;
    font-family: 'Roboto', 'Consolas';
`;

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
