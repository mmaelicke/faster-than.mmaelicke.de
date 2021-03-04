import React from 'react';
import Plot from 'react-plotly.js';
import { Data } from 'plotly.js';
import { MonthStats } from './TeamStats';
import { Typography } from '@material-ui/core';

export const TeamStatsPlot: React.FC<MonthStats> = props => {
    const date = props.date ? props.date : new Date();
    const dom = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    // empty container for the plot data
    const data: Data[] = [
        {
            type: 'indicator',
            mode: 'gauge+number+delta',
            gauge: {
                shape: 'angular',
                axis: {range: [0, dom]},
                bar: {color: props.streak5km > 15 ? 'darkgreen' : 'purple'}
            },
            delta: {reference: dom, position: 'top'},
            value: props.streak5km,
            domain: { y: [0.15, 0.6], x: [0, 0.45] },
            title: {text: '5km streak'}
        },
        {
            type: 'indicator',
            mode: 'gauge+number+delta',
            gauge: {
                shape: 'angular',
                axis: {range: [0, dom]},
                bar: {color: props.streak10km > 10 ? 'darkgreen' : 'purple'}
            },
            delta: {reference: dom, position: 'bottom'},
            value: props.streak10km,
            domain: {y: [0.15, 0.6], x: [0.55, 1]},
            title: {text: '10km streak'}
        },
        {
            type: 'indicator',
            mode: 'gauge+number+delta',
            gauge: {
                shape: 'bullet', 
                axis: {range: [0, 444], dtick: 111},
                bar: {color: props.totalKm > 222 ? 'darkgreen' : 'purple'},
                steps: [
                    {range: [0, 111], color: 'rgba(144,238,144, 0.2)'},
                    {range: [111, 222], color: 'rgba(144,238,144, 0.3)'},
                    {range: [222, 333], color: 'rgba(144,238,144, 0.4)'},
                    {range: [333, 444], color: 'rgba(144,238,144, 0.5)'},
                ]//.filter((o, idx) => (idx + 1) * 111 <= props.totalKm ),
            },            
            delta: {reference: 222, position: 'top'},
            value: props.totalKm,
            domain: {y: [0.85, 0.95], x: [0.1, 1]},
            title: {text: 'total'},
            number: {suffix: 'km'},
            
            
        }
    ];

    // return the plots
    return (
        <React.Fragment>
            <Typography variant="body1">
                Can we establish a { dom } day streak of &gt;5km or &gt;10km? 
                Can we make 222km in { dom } days? <br />                
                Jan, every kilometer counts!
            </Typography>
            <Plot 
                data={data}
                layout={{
                    autosize: true,
                    margin: {t: 5, r:5, l: 35, b: 35}
                }}
            />
        </React.Fragment>
    );
}
