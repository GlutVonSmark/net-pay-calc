import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styled from 'styled-components';

ReactDOM.render(<App />, document.getElementById('root'));

const StyledApp = styled(App)`
    font-family: 'Roboto', 'Consolas', 'sans-serif';
`;
