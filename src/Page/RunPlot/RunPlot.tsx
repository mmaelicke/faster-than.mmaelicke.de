import React from 'react';
import { CircularProgress } from '@material-ui/core';

import { Run } from './../../hoc/run.model';

import Plot from 'react-plotly.js';
import { Data } from 'plotly.js';
import { connect } from 'react-redux';
import { AppState } from '../../store/reducers';

interface RunPlotProps {
    runs: Run[];
}

const RunPlot: React.FC<RunPlotProps> = ({runs}) => {
    if (!runs || runs.length === 0) {
        return (
            <div style={{display: 'block', width: '100%', textAlign: 'center', marginTop: '2rem', marginBottom: '2rem'}}>
                <CircularProgress color="secondary" />
            </div>
        );
    }

    const data: Data[] = [];

    // find unique runner
    const runners: string[] = [];
    runs.forEach(r => {
        if (!runners.includes(r.name)) runners.push(r.name); 
    });

    // create the data
    runners.forEach(runner => {
        const runData: Run[] = runs.filter(r => r.name === runner);
        data.push({
            x: runData.map(r => r.distance),
            y: runData.map(r => r.timeMin / r.distance),
            mode: 'markers',
            name: runner,
            marker: {size: 14, opacity: 0.6},
            hovertext: runData.map(r => `${new Date((r.date as any).seconds * 1000).toLocaleDateString()}<br>${r.name}: ${r.pace} min/km`)
        } as Data);
    });

    // return the plot
    return (
        <Plot style={{width: '100%', height: '75vh'}} 
            data={data}
            layout={{
                autosize: true,
                legend: {
                    yanchor: 'top',
                    xanchor: 'center',
                    y: 1.05,
                    x: 0.05,
                    orientation: 'h'
                },
                margin: {t: 30, r: 5}
            }}
        />
    );
}


const mapStateToProps = (state: AppState) => {
    return {
        runs: state.runs
    }
}

export default connect(mapStateToProps)(RunPlot);
