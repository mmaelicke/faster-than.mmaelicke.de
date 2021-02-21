import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import { RunStats } from './RunStats';
import { Run } from '../../models/run.model';
import { AppState } from '../../models/app-state.model';
import { connect } from 'react-redux';

interface DetailsProps {
    runs: Run[];
    runners: string[];
}

const Details: React.FC<DetailsProps> = props => (
    <Accordion>
        <AccordionSummary expandIcon={<TrendingUpIcon />}>
            <Typography variant="h6">Details</Typography>
        </AccordionSummary>
        <AccordionDetails style={{flexDirection: 'column', width: '100%', alignItems: 'center', minHeight: '400px', boxSizing: 'border-box'}}>
            <RunStats runs={props.runs} runners={props.runners} />
        </AccordionDetails>
    </Accordion>
);


const mapStateToProps = (state: AppState) => {
    return {
        runs: state.filteredRuns,
        runners: state.names
    }
}
export default connect(mapStateToProps)(Details);