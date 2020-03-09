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

const App: React.FC = () => {
    return (
        <Container maxWidth='md' style={{ textAlign: 'center' }}>
            <ThemeProvider theme={theme}>
                <Header />
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ values }) => (
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
                                {/* <FormNumberInput
                                    name='travel'
                                    label='Tax saver ticket'
                                /> */}
                                <DynamicField
                                    values={values.bonuses}
                                    addButtonText='Bonuses'
                                    name='bonuses'
                                />
                                <DynamicField
                                    values={values.deductables}
                                    addButtonText='Deductables'
                                    name='deductables'
                                />
                                <FormNumberInput
                                    name='property_tax'
                                    label='Property Tax (LPT)'
                                />
                                <SubmitButton />
                            </Container>

                            {/* {JSON.stringify(values, null, 2)} */}

                            <Results
                                salary={values.salary}
                                bik={values.bonuses.reduce(
                                    (acc, curr) => curr.value! + acc,
                                    0
                                )}
                                travel={values.travel!}
                                tax_credit={values.tax_credit}
                                property_tax={values.property_tax!}
                            />
                        </Form>
                    )}
                </Formik>
            </ThemeProvider>
        </Container>
    );
};

export default App;
