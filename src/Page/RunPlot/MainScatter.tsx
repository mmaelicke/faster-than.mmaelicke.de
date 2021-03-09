import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Data } from 'plotly.js';
import { Run } from '../../models/run.model';
import { createStyles, FormControl, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';

interface MainScatterProps {
    runs: Run[];
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        axBar: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: '1.6rem'
        }
    }));

export const MainScatter: React.FC<MainScatterProps> = (props) => {
    const classes = useStyles();

    // container for the data
    const data: Data[] = [];

    // state to store the current x-axis data
    const [useDist, updateUseDist] = useState(false);

    // find unique runner
    const runners: string[] = [];
    props.runs.forEach(r => {
        if (!runners.includes(r.name)) runners.push(r.name); 
    });

    // create the data
    runners.forEach(runner => {
        const runData: Run[] = props.runs.filter(r => r.name === runner);
        data.push({
            x: runData.map(r => useDist ? r.distance : r.timeMin),
            y: runData.map(r => r.timeMin / r.distance),
            mode: 'markers',
            name: runner,
            marker: {size: 14, opacity: 0.6},
            hovertext: runData.map(r => `${new Date((r.date as any).seconds * 1000).toLocaleDateString()}<br>${r.name}: ${r.pace} min/km`),
            visible: true
        } as Data);
    });

    // return the plot
    return (
        <React.Fragment>
            <Plot style={{width: '100%', height: 'calc(100% - 2rem)'}} 
                data={data}
                layout={{
                    autosize: true,
                    legend: {
                        yanchor: 'top',
                        xanchor: 'left',
                        y: 1.05,
                        x: 0.05,
                        orientation: 'h'
                    },
                    margin: {t: 30, r: 5, l: 40, b: 25},
                    yaxis: {
                        title: 'Pace [min/km]'
                    }
                }}
            />
            <div className={classes.axBar}>
                <FormControl>
                    <Select value={useDist ? 1 : 2} onChange={e => updateUseDist(e.target.value === 1)}>
                        <MenuItem value={1}>Distance [km]</MenuItem>
                        <MenuItem value={2}>Time [min]</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </React.Fragment>
    );
}
