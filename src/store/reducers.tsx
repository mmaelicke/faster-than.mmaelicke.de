import { Reducer } from 'redux';
import { AppState } from '../models/app-state.model';
import { DataFilter } from '../models/data-filter';
import { Run} from '../models/run.model';
import * as actionTypes from './actions/actionTypes';


const initialState: AppState = {
    runs: [],
    names: [],
    currentFilter: {},
    filteredRuns: [],
};

// filter function
const applyFilter = (run: Run, filter: DataFilter): boolean => {
    // create the Date for filtering
    const d = new Date((run.date as any).seconds * 1000);
    // go for each filter option
    if (filter.from && d < filter.from) return false;
    if (filter.to && d > filter.to) return false;
    if (filter.runner && run.name !== filter.runner) return false;
    // none of the filter applied, return true
    return true
};

export const reducer: Reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_RUNS: 
            return {
                ...state,
                runs: [...action.runs],
                names: [...action.names],
                filteredRuns: [...(action.runs as Run[]).filter(r => applyFilter(r, state.currentFilter))]
            }

        case actionTypes.UPDATE_FILTER:
            // update the filter
            const filter = {...state.currentFilter, ...action.filter};

            // update the filtered runs
            const runs: Run[] = (state.runs as Run[]).filter(r => applyFilter(r, filter));
            // return
            return {
                ...state,
                currentFilter: filter,
                filteredRuns: [...runs]
            }
    }

    return state;
};
