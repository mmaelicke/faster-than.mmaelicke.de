import React from 'react';
import { FirestoreCollection } from '@react-firebase/firestore';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { Run } from './run.model';
import { Dispatch } from 'redux';

interface DataPublisherProps {
    onPublish: (runss: Run[]) => {};
}

const DataPublisher: React.FC<DataPublisherProps> = ({onPublish}) => (
    <FirestoreCollection path="/runs" where={{field: 'created', operator: '>=', value: new Date('2020-01-01')}}>
        {doc => {
            // send the new data to store
            onPublish(doc.value);

            // return no JSX
            return null;
        }}
    </FirestoreCollection>
);

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onPublish: (runs: Run[]) => dispatch({type: actions.UPDATE_RUNS, runs: runs})
    }
};

export default connect(null, mapDispatchToProps)(DataPublisher);
