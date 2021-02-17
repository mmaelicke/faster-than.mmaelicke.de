import { Reducer } from 'redux';
import { AppState } from '../models/app-state.model';
import * as actionTypes from './actions/actionTypes';


const initialState: AppState = {
    runs: [],
    names: []
};

export const reducer: Reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_RUNS: 
            return {
                ...state,
                runs: [...action.runs],
                names: [...action.names]
            }
    }

    return state;
};
