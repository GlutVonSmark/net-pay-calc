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
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormNumberField from './FormNumberField';
import Results from './Results';
import LightTooltip from './LightTooltip';
import calculate_net_pay from './tax-calc';

import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import theme from './muiMainTheme';
import { initialValues, onSubmit } from './formikConfig';

const useStyles = makeStyles({
    root: {
        marginRight: '15px'
    }
});

const App: React.FC = () => {
    const classes = useStyles();
    return (
        <Container maxWidth='md' style={{ textAlign: 'center' }}>
            <Header />
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                                                                    title='delete'
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
