import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Theme, Tooltip } from '@material-ui/core';

export default withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 18
    }
}))(Tooltip);
