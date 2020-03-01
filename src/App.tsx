import React from 'react';
import { useFormik } from 'formik';
import { TextField, Container, Button, FormGroup } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import styled, { css } from 'styled-components';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f4bf41'
        }
    }
});

interface FormValues {
    firstName: string;
    email: string;
    salary: number | null;
    travel: number | null;
}

const App: React.FC = () => {
    const initialValues: FormValues = {
        firstName: '',
        email: '',
        salary: null,
        travel: null
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
                {/*  NOTE: dont like the blue color here */}
                <Container>
                    <ThemeProvider theme={theme}>
                        <FormGroupWithMargin row>
                            <TextField
                                name='firstName'
                                label='First Name'
                                // helperText='Do you know your name?'
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                required
                                color='primary'
                            />
                        </FormGroupWithMargin>
                        <FormGroupWithMargin row>
                            <TextField
                                name='email'
                                label='Your email'
                                // helperText='Do you have an email?'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                type='email'
                                required
                                color='primary'
                            />
                        </FormGroupWithMargin>
                        <FormGroupWithMargin row>
                            <TextField
                                name='salary'
                                label='Salary'
                                type='number'
                                required
                                onChange={formik.handleChange}
                                value={formik.values.salary}
                            />
                        </FormGroupWithMargin>
                        <FormGroupWithMargin row>
                            <TextField
                                name='travel'
                                label='Travel'
                                type='number'
                                required
                                onChange={formik.handleChange}
                                value={formik.values.travel}
                            />
                        </FormGroupWithMargin>

                        <FormGroupWithMargin row>
                            <Button
                                variant='contained'
                                type='submit'
                                color='primary'
                                startIcon={<CloudUploadIcon />}
                            >
                                Submito!
                            </Button>
                        </FormGroupWithMargin>
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
