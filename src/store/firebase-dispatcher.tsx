import firebase from 'firebase/app';
import 'firebase/firestore';
import * as actions from './actions';
import { firebaseConfig } from '../firebase-config';
import store from './store';

firebase.initializeApp(firebaseConfig);

export const subscribeFirebase = () => {
    // subscribe to snapshots of the runs 
    firebase.app().firestore().collection('/runs')
    .where('created', '>=', new Date('2020-01-01'))
    .onSnapshot(doc => {
        store.dispatch({
            type: actions.UPDATE_RUNS, 
            runs: doc.docs.map(d => d.data())
        });
    })
}