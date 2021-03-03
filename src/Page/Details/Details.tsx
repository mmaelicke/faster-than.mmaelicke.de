import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Typography } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

import { Run } from '../../models/run.model';
import { AppState } from '../../models/app-state.model';
import { connect } from 'react-redux';
import { RunStats } from './RunStats';
import { TeamStats } from './TeamStats';

interface DetailsProps {
    runs: Run[];
    runners: string[];
    allRuns: Run[];
}

const useStyles = makeStyles({
    AccordionBox: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        minHeight: '400px',
        boxSizing: 'border-box'
    }
})

const Details: React.FC<DetailsProps> = props => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Accordion>
                <AccordionSummary expandIcon={<StarRoundedIcon />}>
                    <Typography variant="h6">Team Stats</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.AccordionBox}>
                    <TeamStats runs={props.allRuns} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<TrendingUpIcon />}>
                    <Typography variant="h6">Details</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.AccordionBox}>
                    <RunStats runs={props.runs} runners={props.runners} />
                </AccordionDetails>
            </Accordion>
        </React.Fragment>
    )
};


const mapStateToProps = (state: AppState) => {
    return {
        runs: state.filteredRuns,
        runners: state.names,
        allRuns: state.runs
    }
}
export default connect(mapStateToProps)(Details);