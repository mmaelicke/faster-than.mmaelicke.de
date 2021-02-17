import firebase from 'firebase/app';
import 'firebase/firestore';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { firebaseConfig } from '../../firebase-config';
import { Run } from '../../models/run.model';
import { AppState } from '../../models/app-state.model';
import * as actionTypes from './actionTypes';

// init firebase to fetch data
firebase.initializeApp(firebaseConfig);

/**
 * SYNCHRONOUS ACTIONS
 * 
 * These are the ones actually send to redux
 */
const syncDataFromFirestore = (runs: Run[]): AnyAction => {
    // map the runs to only the first occurance of each used name
    const names = runs.map(r => r.name).filter((name, index, allNames) => allNames.indexOf(name) === index)

    // return action data
    return {
        type: actionTypes.UPDATE_RUNS,
        runs: runs,
        names: names
    }
};

 /**
  * ASYNCHRONOUS ACTIONS
  * 
  * THese are the ones actually called by the reducer
  */
export const fetchRuns = () => (dispatch: ThunkDispatch<AppState, {}, AnyAction>) => {
    // TODO: here we can ask for 'since' or year and build a filter property

    // async part- get the data from firebase and dispatch the synchronous action when needed
    firebase.app().firestore().collection('/runs')
    .onSnapshot(observer => {
        if (observer.empty) {
            // emit an empty list of runs
            dispatch(syncDataFromFirestore([]));
        } else {
            // get the runs
            const runs = observer.docs.map(d => d.data() as Run);
            dispatch(syncDataFromFirestore(runs));
        }
    });
}