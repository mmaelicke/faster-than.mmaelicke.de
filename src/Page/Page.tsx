import { Grid, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// date context
//import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { AddForm } from './Add-Form/Add-Form';
import Details from './Details/Details';
import { Header } from './Header/Header';
import RunPlot from './RunPlot/RunPlot';
import { fetchRuns } from '../store/actions/index';

interface PageProps {
    subscribeToFirebase: () => any;
}

const Page: React.FC<PageProps> = (props) => {
    // subscribe to Firebase on startup
    useEffect(() => props.subscribeToFirebase(), [props]);
    
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Header />
            <RunPlot />
            <Grid container justify="center">
                <Grid item xs={12} md={10} lg={8}>
                    <Paper elevation={2}>
                        <AddForm />
                        <Details />
                    </Paper>
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    )
};


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        subscribeToFirebase: () => dispatch(fetchRuns() as any)
    }
}

export default connect(null, mapDispatchToProps)(Page);