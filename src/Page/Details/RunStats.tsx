import React from 'react';
import { DataGrid, ColDef, CellParams } from '@material-ui/data-grid';
import { Run } from '../../models/run.model';


interface RowData {
    id: number;
    runner: string;
    distance: number,
    time: number;
    pace: number;
    totals: any;
}

interface RunStatsProps {
    runs: Run[];
    runners: string[];
}

const formatTimeMin = (time: number): string => {
    const hrs = Math.floor(time / 60);
    const min = (time % 60).toFixed(0);

    return `${String(hrs).padStart(2,'0')}:${String(min).padStart(2, '0')}`;
}

const formatPace = (paceMin: number): string => {
    const min = Math.floor(paceMin);
    const sec = ((paceMin - min) * 60).toFixed(0);

    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// define the columns in a static manner
const columns: ColDef[] = [
    {field: 'runner', headerName: 'Name', flex: 1},
    {
        field: 'distance', 
        headerName: 'Total Distance [km]', 
        type: 'number', 
        flex: 1,
        renderCell: (params: CellParams) => renderProgressBar((v: number) => `${v.toFixed(1)} km`, Number(params.value), params.row.totals.distance)
    },
    {
        field: 'time', 
        headerName: 'Total Time [hh:mm]', 
        type: 'number', 
        flex: 1, 
        renderCell: (params: CellParams) => renderProgressBar(v => formatTimeMin(v), Number(params.value), params.row.totals.time)
    },
    {
        field: 'pace', 
        headerName: 'Best Pace [min/km]', 
        type: 'number', 
        flex: 1, 
        valueFormatter: ({value}) => formatPace(Number(value)),
//        renderCell: (params: CellParams) => renderProgressBar((v: number) => formatPace(v), Number(params.value), params.row.totals.pace)
    }
];

const renderProgressBar = (valueFormatter: (v: any) => string, value: number, totalValue: number): React.ReactElement => {
    const w = Math.floor(value / totalValue * 100);
    return (
        <div style={{width: '100%', margin: '0px', padding: '0px', position: 'relative'}}>
            {valueFormatter(value)}
            <div style={{width: `${w}%`, position: 'absolute', top: '0.6rem', left: 0, bottom: '0.6rem', backgroundColor: w > 50 ? '#137D39' : '#1F77B4', zIndex: -1}}></div>
        </div>
    );
}

const createRows = (runs: Run[], runners: string[], totalStats: any): RowData[] => {
    const rows: RowData[] = [];

    // create one row for each runner
    runners.forEach((runner, index) => {
        rows.push({
            id: index,
            runner: runner,
            distance: runs.filter(r => r.name === runner).reduce((prev, curr) => prev + curr.distance, 0),
            time: runs.filter(r => r.name === runner).reduce((prev, curr) => prev + curr.timeMin, 0),
            pace: runs.filter(r => r.name === runner).reduce((prev, curr) => Math.min(prev, (curr.timeMin / curr.distance)), 99999),
            totals: totalStats
        });
    });

    return rows;
}

const totalStats = (runs: Run[]) => {
    return {
        distance: runs.reduce((prev, curr) => prev + curr.distance, 0),
        time: runs.reduce((prev, curr) => prev + curr.timeMin, 0),
        pace: runs.reduce((prev, curr) => Math.min(prev, (curr.timeMin / curr.distance)), 99999)
    }
}

export const RunStats: React.FC<RunStatsProps> = props => {
    // create total stats
    const total = totalStats(props.runs);

    // get the rows for the datatable
    const rows = createRows(props.runs, props.runners, total);

    return (
        <div style={{display: 'flex', width: '100%'}}>
            <div style={{flexGrow: 1}}>
                <DataGrid columns={columns} rows={rows} pageSize={5} autoHeight={true} />  
            </div>
        </div>
    );
};