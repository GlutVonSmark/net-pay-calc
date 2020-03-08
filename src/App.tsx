import React from 'react';
import { FieldArray, Formik, Form, Field } from 'formik';
import {
    Container,
    Button,
    TextField,
    InputAdornment,
    IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ThemeProvider } from '@material-ui/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormNumberInput from './FormNumberField';
import Results from './Results';
import LightTooltip from './LightTooltip';

import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import theme from './muiMainTheme';
import { initialValues, onSubmit } from './formikConfig';
import DynamicField from './DynamicField/DynamicField';

const App: React.FC = () => {
    return (
        <Container maxWidth='md' style={{ textAlign: 'center' }}>
            <ThemeProvider theme={theme}>
                <Header />
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ values, handleChange }) => (
                        <StyledForm>
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
                            </Container>
                            <StyledDiv standOut>
                                {JSON.stringify(values, null, 2)}

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
                        </StyledForm>
                    )}
                </Formik>
            </ThemeProvider>
        </Container>
    );
};

const StyledForm = styled(Form)`
    margin-top: 50px;
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
