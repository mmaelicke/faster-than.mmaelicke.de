import React from 'react';
import { Data } from 'plotly.js';
import Plot from 'react-plotly.js';
import { Run } from '../../models/run.model';

interface BarTimelineProps{
    runs: Run[];
}

export const BarTimeline: React.FC<BarTimelineProps> = ({ runs }) => {
    // container for the data
    const data: Data[] = [];

    // find unique runner
    const runners = runs.map(r => r.name).filter((value, index, allNames) => allNames.indexOf(value) === index);
    
    // create the traces
    runners.forEach(runner => {
        // find the data of the current runner
        const runData: Run[] = runs.filter(r => r.name === runner);
        
        // create the plotly trace
        data.push({
            x: runData.map(r => new Date((r.date as any).seconds * 1000).toISOString().split('T')[0]),
            y: runData.map(r => r.distance),
            stackgroup: 'one',
            name: runner,
            type: 'bar',
            text: runData.map(r => `${r.distance} km`),
            textposition: 'auto'
        } as Data);
    });

    return (
        <Plot
            style={{width: '100%', height: '100%'}}
            data={data}
            layout={{
                autosize: true,
                margin: {t: 0, r: 5, l: 50},
                barmode: 'stack',
                legend: {
                    yanchor: 'bottom',
                    xanchor: 'center',
                    y: -0.5,
                    x: 0.05,
                    orientation: 'h'
                },
                yaxis: {
                    title: 'Distance [km]',
                    fixedrange: true
                },
                xaxis: {
                    type: 'date'
                }
            }} 
        />
    );
};
