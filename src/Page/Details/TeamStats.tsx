import React, { useEffect, useState } from 'react'
import { DatePicker } from '@material-ui/pickers';
import { Grid } from '@material-ui/core';
import { Run } from '../../models/run.model';

// const THRESH = {};

interface TeamStatsProps {
    runs: Run[];
}

interface MonthStats {
    date: Date;
    streak5km: number;
    streak10km: number;
    totalKm: number;
    totoalTime: number;
}

const getStats = (runs: Run[], filterMonth: Date): MonthStats => {
    // get the runs of the current month
    const filteredRuns = runs.filter(r => {
        const d = new Date((r.date as any).seconds * 1000);
        return d.getFullYear() === filterMonth.getFullYear() && d.getMonth() === filterMonth.getMonth() 
    });

    // calculate the stats
    const streaks5: number[] = [];
    const streaks10: number[] = [];
    let streak5 = 0;
    let streak10 = 0;
    let dist = 0;
    let time = 0;
    
    // go for each day
    const lastDay = new Date(filterMonth.getFullYear(), filterMonth.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= lastDay; day++) {
        // get todays runs
        const runs = filteredRuns.filter(r => new Date((r.date as any).seconds * 1000).getDate() === day);
        if (runs.length > 0) {
            const d = runs.map(r => r.distance).reduce((prev, curr) => prev + curr, 0);
            const t = runs.map(r => r.timeMin).reduce((prev, curr) => prev + curr, 0);
            dist += d;
            time += t;
            if (d >= 5) streak5 += 1;
            if (d >= 10) streak10 += 1;
        } else {
            streaks5.push(streak5);
            streak5 = 0;
            streaks10.push(streak10);
            streak10 = 0;
        }
    }

    return {
        date: filterMonth,
        streak5km: Math.max(...streaks5),
        streak10km: Math.max(...streaks10),
        totalKm: dist,
        totoalTime: time
    };
};

export const TeamStats: React.FC<TeamStatsProps> = props => {
    const [date, changeDate] = useState(new Date());
    const [stats, changeStats] = useState({} as any);

    // calculate
    const update = (date: Date) => {
        // calculate the new stats
        const newStats = getStats(props.runs, date);
        changeStats(newStats);
        
        // update the date
        changeDate(date);
    }

    // run the update function at least once
    useEffect(() => update(new Date()), [props.runs]);
    
    return (
        <Grid container spacing={5}>
            
            <Grid item xs={12} md={4}>
                <DatePicker
                    variant="static"
                    openTo="month"
                    views={['year', 'month']}
                    value={date}
                    onChange={d => update(new Date((d as any)))} 
                />
            </Grid>
            
            <Grid item xs={12} md={8}>
                <pre><code>{JSON.stringify(stats, null, 4)}</code></pre>
            </Grid>

        </Grid>
    );
}