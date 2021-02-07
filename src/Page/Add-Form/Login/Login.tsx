import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'
import { Button, FormControl, TextField } from '@material-ui/core';

const login = (password: string) => {
    firebase.app().auth().signInWithEmailAndPassword('user@faster-than.mmaelicke.de', password);
}

export const Login: React.FC = () => {
    const [pw, changePw] = useState('');
    return (
        <FormControl fullWidth>
            <TextField type="password" label="Authorization Token" onChange={e => changePw(e.target.value)}/>
            <Button color="primary" disabled={pw === ''} onClick={() => login(pw)}>LOGIN</Button>
        </FormControl>
    )
};