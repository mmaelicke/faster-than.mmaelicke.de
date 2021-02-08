import { AnyAction } from 'redux';
import { Run } from '../hoc/run.model';
import * as actions from './actions';

export interface AppState {
    runs: Run[];
    names: string[];
}

export interface PublishAction{
    type: typeof actions.UPDATE_RUNS;
    runs: Run[];
}

const initialState: AppState = {
    runs: [],
    names: []
};


const onNewDatapublished = (state: AppState, action: PublishAction): AppState => {
    return {
        ...state,
        runs: [...action.runs],
        // find only the first occurence of each name
        names: action.runs.map(r => r.name).filter((value, index, allNames) => allNames.indexOf(value) === index)
    }
}

const rootReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case actions.UPDATE_RUNS:
            return onNewDatapublished(state, action as PublishAction);
    }
    return state;
}

export default rootReducer;