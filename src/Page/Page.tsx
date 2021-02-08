import { Grid, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { subscribeFirebase } from '../store/firebase-dispatcher';
import { AddForm } from './Add-Form/Add-Form';

import { Header } from './Header/Header';
import RunPlot from './RunPlot/RunPlot';

export const Page: React.FC = () => {
    // subscribe to Firebase on startup
    useEffect(() => subscribeFirebase(), []);
    
    return (
        <React.Fragment>
            <Header />
            <RunPlot />
            <Grid container justify="center">
                <Grid item xs={12} md={10} lg={8}>
                    <Paper elevation={2}>
                        <AddForm />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};
