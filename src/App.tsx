import React from 'react';

import { Page } from './Page/Page';
import { firebaseConfig as config } from './firebase-config';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { FirestoreProvider } from '@react-firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

const App: React.FC = () => (
  <FirebaseAuthProvider {...config} firebase={firebase}>
    <FirestoreProvider {...config} firebase={firebase}>
      <Page />
    </FirestoreProvider>
  </FirebaseAuthProvider>
);

export default App;
