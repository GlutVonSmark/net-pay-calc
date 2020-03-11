import React from 'react';
import { Formik, Form } from 'formik';
import { initialValues, onSubmit, validationSchema } from './formikConfig';

import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import theme from './muiMainTheme';

import FormNumberInput from './components/FormNumberField';
import DynamicField from './components/DynamicField';
import Results from './components/Results';
import Header from './components/Header';
import SubmitButton from './components/SubmitButton';

import { sumFields } from './helpers';

//  { id: '1abc', name: 'Health Insurance', value: 166.77, disabled: true }

const App: React.FC = () => {
    return (
        <Container maxWidth='md' style={{ textAlign: 'center' }}>
            <ThemeProvider theme={theme}>
                <Header />
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({ errors, values, touched }) => (
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
                            {JSON.stringify(errors, null, 2)}

                            <Results
                                salary={values.salary}
                                bonuses={sumFields(values.bonuses)}
                                deductables={sumFields(values.deductables)}
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
