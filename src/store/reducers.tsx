import { AnyAction } from 'redux';
import { Run } from '../hoc/run.model';
import * as actions from './actions';

export interface AppState {
    runs: Run[];
}

const initialState: AppState = {
    runs: []
};

const rootReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case actions.UPDATE_RUNS:
            return {
                ...state,
                runs: action.runs
            }
    }
    return state;
}

export default rootReducer;