import React from 'react';
import Plot from 'react-plotly.js';
import { Data } from 'plotly.js';
import { MonthStats } from './TeamStats';
import { Typography } from '@material-ui/core';

interface TeamStatsPlotProps {
    currentStats: MonthStats;
    lastStats: MonthStats;
}

export const TeamStatsPlot: React.FC<TeamStatsPlotProps> = ({currentStats, lastStats}) => {
    const date = currentStats.date ? currentStats.date : new Date();
    const dom = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    // empty container for the plot data
    const data: Data[] = [
        {
            type: 'indicator',
            mode: 'gauge+number+delta',
            gauge: {
                shape: 'angular',
                axis: {range: [0, dom]},
                bar: {color: currentStats.streak5km > 10 ? 'darkgreen' : 'purple'}
            },
            delta: {reference: lastStats.streak5km, position: 'bottom'},
            value: currentStats.streak5km,
            domain: { y: [0.15, 0.6], x: [0, 0.45] },
            title: {text: '5km streak'}
        },
        {
            type: 'indicator',
            mode: 'gauge+number+delta',
            gauge: {
                shape: 'angular',
                axis: {range: [0, dom]},
                bar: {color: currentStats.streak10km > 6 ? 'darkgreen' : 'purple'}
            },
            delta: {reference: lastStats.streak10km, position: 'bottom'},
            value: currentStats.streak10km,
            domain: {y: [0.15, 0.6], x: [0.55, 1]},
            title: {text: '10km streak'}
        },
        {
            type: 'indicator',
            mode: 'gauge+number+delta',
            gauge: {
                shape: 'bullet', 
                axis: {range: [0, 444], dtick: 111},
                bar: {color: currentStats.totalKm > 222 ? 'darkgreen' : 'purple'},
                steps: [
                    {range: [0, 111], color: 'rgba(144,238,144, 0.2)'},
                    {range: [111, 222], color: 'rgba(144,238,144, 0.3)'},
                    {range: [222, 333], color: 'rgba(144,238,144, 0.4)'},
                    {range: [333, 444], color: 'rgba(144,238,144, 0.5)'},
                ]//.filter((o, idx) => (idx + 1) * 111 <= props.totalKm ),
            },            
            delta: {reference: lastStats.totalKm, position: 'top'},
            value: currentStats.totalKm,
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
