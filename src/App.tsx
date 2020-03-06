import React from 'react';
import { FieldArray, Formik, Form, Field } from 'formik';

import {
    Container,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { createMuiTheme, makeStyles, Theme } from '@material-ui/core/styles';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormNumberField from './FormNumberField';
import Results from './Results';
import calculate_net_pay from './tax-calc';

import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f4bf41'
        }
    }
});

const useStyles = makeStyles({
    root: {
        marginRight: '15px'
    }
});

const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 18
    }
}))(Tooltip);

// FIXME:  why do I have those nulls here anyway (for default values)
interface FormValues {
    salary: number | null;
    tax_credit: number;
    travel: number | null;
    property_tax: number | null;
    bonuses: { id: number; name: string; value: number | null }[];
}

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const App: React.FC = () => {
    const initialValues: FormValues = {
        salary: null,
        travel: null,
        bonuses: [{ id: 1, name: 'Health Insurance', value: 166.77 }],
        tax_credit: 275,
        property_tax: null
    };
    const classes = useStyles();
    // TODO: handle Blur (what to do with it)
    return (
        <Container maxWidth='md' style={{ textAlign: 'center' }}>
            <StyledHeader>
                Using Formik, Material UI with Styled Components and Typescript
                and Netlify
            </StyledHeader>
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
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    alert(
                        calculate_net_pay(
                            values.salary! / 12,
                            false,
                            values.travel!,
                            0,
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
                                            <AnimatePresence>
                                                {values.bonuses.map(
                                                    (bik, index) => {
                                                        return (
                                                            <motion.div
                                                                initial={{
                                                                    opacity: 0
                                                                }}
                                                                animate={{
                                                                    opacity: 1
                                                                }}
                                                                exit={{
                                                                    opacity: 0
                                                                }}
                                                                key={bik.id}
                                                                style={{
                                                                    marginTop:
                                                                        '15px'
                                                                }}
                                                            >
                                                                <Field
                                                                    as={
                                                                        TextField
                                                                    }
                                                                    name={`bonuses.${index}.name`}
                                                                    className={
                                                                        classes.root
                                                                    }
                                                                />

                                                                <TextField
                                                                    // label={bInputAdornmentik.name}
                                                                    name={`bonuses.${index}.value`}
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    value={
                                                                        bik.value
                                                                    }
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <InputAdornment position='start'>
                                                                                €
                                                                            </InputAdornment>
                                                                        ),
                                                                        inputProps: {
                                                                            style: {
                                                                                textAlign:
                                                                                    'right'
                                                                            }
                                                                        }
                                                                    }}
                                                                    type='number'
                                                                />
                                                                <LightTooltip
                                                                    title='shikaka'
                                                                    placement='right'
                                                                >
                                                                    <IconButton
                                                                        aria-label='delete'
                                                                        onClick={() =>
                                                                            arrayHelpers.remove(
                                                                                index
                                                                            )
                                                                        }
                                                                        style={{
                                                                            padding:
                                                                                '8px'
                                                                        }}
                                                                    >
                                                                        <DeleteIcon fontSize='small' />
                                                                    </IconButton>
                                                                </LightTooltip>
                                                            </motion.div>
                                                        );
                                                    }
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </FieldArray>

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

const AnimatedDiv = styled.div`
    transition: 1s;
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
