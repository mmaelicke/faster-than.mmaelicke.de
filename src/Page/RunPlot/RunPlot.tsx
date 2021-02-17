import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../models/app-state.model';

import { Run } from '../../models/run.model';
import { MainScatter } from './MainScatter';
import { BarTimeline } from './BarTimeline';

import { CircularProgress } from '@material-ui/core';

interface RunPlotProps {
    runs: Run[];
    runners: string[];
}

const RunPlot: React.FC<RunPlotProps> = ({runs}) => {
    if (!runs || runs.length === 0) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center', 
                width: '100%',
                boxSizing: 'border-box', 
                height:'80vh', 
                textAlign: 'center', 
            }}>
                <CircularProgress size={180} thickness={5.5} color="secondary" />
            </div>
        );
    }

    // return the plot
    return (
        <div style={{height: '80vh', boxSizing: 'border-box'}}>
            <div key="scatter" style={{height: '70%'}}>
                <MainScatter runs={runs} />
            </div>
            <div key="timeline" style={{height: '30%'}}>
                <BarTimeline runs={runs} />
            </div>
        </div>
    );
}


const mapStateToProps = (state: AppState) => {
    return {
        runs: state.runs,
        runners: state.names
    }
}

export default connect(mapStateToProps)(RunPlot);
