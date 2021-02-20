import React, { useState } from 'react';
import { createStyles, FormControl, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import { AppState } from '../models/app-state.model';
import { connect } from 'react-redux';
import { DataFilter } from '../models/data-filter';
import { Dispatch } from 'redux';
import { updateFilter } from '../store/actions/index';

const useStyles = (color= 'white') => makeStyles((theme: Theme) => createStyles({
    select: {
        '&:before': {
            borderColor: color
        },
        '&:after': {
            borderColor: color
        },
        color: color
    },
    icon: {
        fill: color
    }
}));

const getDateOffset = (days: number): Date => {
    const now = new Date();
    now.setDate(now.getDate() - days);

    return now;
}

interface ShowLastFilterProps {
    filter: DataFilter,
    newFilter: (filter: DataFilter) => any
}

const ShowLastFilter: React.FC<ShowLastFilterProps> = props => {
    // get the styling
    const classes = useStyles()()

    // use state to store the current date
    const [sinceDays, setSinceDays] = useState(props.filter.lastDays ? props.filter.lastDays : 0);

    // define a function to set the new filter
    const update = (event: React.ChangeEvent<{value: unknown}>) => {
        let val = event.target.value as number;
        if (!val) {
            val = 0;
        }

        // update the UI
        if (val === 0) {
            setSinceDays(0)
        } else {
            setSinceDays(val);
        }

        // dispatch the update
        props.newFilter({
            lastDays: val,
            from: val === 0 ? null : getDateOffset(val)
        })
    }

    // render the list
    return (
        <FormControl>
            <Select value={sinceDays} onChange={e => update(e)} className={classes.select} inputProps={{classes: {icon: classes.icon}}}>
                <MenuItem value={0}>all data</MenuItem>
                <MenuItem value={7}>last week</MenuItem>
                <MenuItem value={14}>last 14 days</MenuItem>
                <MenuItem value={30}>last 30 days</MenuItem>
                <MenuItem value={365}>last year</MenuItem>
            </Select>
        </FormControl>
    )
};

const mapStateToProps = (state: AppState) => {
    return {
        filter: state.currentFilter
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        newFilter: (filter: DataFilter) => dispatch(updateFilter(filter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowLastFilter);