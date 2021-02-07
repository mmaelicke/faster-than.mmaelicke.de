import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { AddForm } from './Add-Form/Add-Form';

import { Header } from './Header/Header';
import RunPlot from './RunPlot/RunPlot';
import DataPublisher from '../hoc/DataPublisher';

export const Page: React.FC = () => (
    <React.Fragment>
        <DataPublisher />
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
);
