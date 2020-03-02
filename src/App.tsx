import React from 'react';
import { useFormik } from 'formik';
import { Container, Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormNumberField from './FormNumberField';

import styled, { css } from 'styled-components';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f4bf41'
        }
    }
});

interface FormValues {
    salary: number | null;
    tax_credit: number | null;
    travel: number | null;
    health_insurance: number | null;
}

const App: React.FC = () => {
    const initialValues: FormValues = {
        salary: null,
        travel: null,
        health_insurance: null,
        tax_credit: null
    };
    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });
    return (
        <Container maxWidth='md'>
            <StyledHeader>
                Using Formik, Material UI with Styled Components and Typescript
            </StyledHeader>
            <StyledForm onSubmit={formik.handleSubmit}>
                <Container>
                    <ThemeProvider theme={theme}>
                        <FormNumberField
                            value={formik.values.salary}
                            name='salary'
                            label='Annual salary'
                            required
                            handleChange={formik.handleChange}
                        ></FormNumberField>
                        <FormNumberField
                            name='tax_credit'
                            label='Tax credit'
                            required
                            handleChange={formik.handleChange}
                            value={formik.values.tax_credit}
                        />
                        <FormNumberField
                            name='travel'
                            label='Tax saver ticket'
                            handleChange={formik.handleChange}
                            value={formik.values.travel}
                        />
                        // NOTE: add info that you can add this to your tax
                        credit (animated gif)
                        <FormNumberField
                            name='health_insurance'
                            label='Health Insurance'
                            handleChange={formik.handleChange}
                            value={formik.values.health_insurance}
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
                    <StyledPre>
                        {JSON.stringify(formik.values, null, 2)}
                    </StyledPre>
                </StyledDiv>
            </StyledForm>
        </Container>
    );
};

const StyledForm = styled.form`
    margin-top: 50px;
`;

const StyledPre = styled.pre`
    font-weight: bold;
    font-size: larger;
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
