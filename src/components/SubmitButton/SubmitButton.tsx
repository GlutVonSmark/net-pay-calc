import React, { ReactElement } from 'react';
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export default (): ReactElement => (
    <div style={{ margin: '25px' }}>
        <Button
            variant='contained'
            type='submit'
            color='primary'
            startIcon={<CloudUploadIcon />}
        >
            Submito!
        </Button>
    </div>
);
