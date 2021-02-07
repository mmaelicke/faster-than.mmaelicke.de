import React, { useState } from 'react';
import { Button, FormControl, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab'

import firebase from 'firebase/app';
import 'firebase/firestore';

import { Aux } from '../../../hoc/Aux';


interface Run {
    name: string;
    distance: number;
    timeMin: number;
    date: Date;
    pace?: string;
    created?: Date;
}

const addDocument = (data: Run) => {
    return firebase.app().firestore().collection('runs').add(data)
}


export const AddRun: React.FC = () => {
    // we need some state
    const [name, updateName] = useState('');
    const [distance, updateDistance] = useState(0);
    const [timeMin, updateTime] = useState(0);
    const [date, updateDate] = useState(new Date());

    let pace = `${Math.floor(timeMin / distance)}`.padStart(2, '0') + 
        ':' + 
        `${((timeMin *60 / distance) % 60).toFixed(0)}`.padStart(2, '0');

    // messager state
    const [show, updateShow] = useState(false);

    // this needs to be declared here
    const onSuccess = () => {
        updateShow(true);
        
        // reset the form
        updateName('');
        updateDistance(0);
        updateTime(0);
        updateDate(new Date());
        pace = '00:00';
    };

    return (
        <Aux>
            <form noValidate>
                <FormControl fullWidth>
                    <TextField label="Your Name"  error={name === ''} onChange={e => updateName(e.target.value)} value={name}/>
                </FormControl>
                <FormControl>
                    <TextField type="number" label="Distance [km]" error={distance === 0} onChange={e => updateDistance(Number(e.target.value))} value={distance}/>
                </FormControl>
                <FormControl>
                    <TextField type="number" label="Time [min]" error={timeMin === 0} onChange={e => updateTime(Number(e.target.value))} value={timeMin}/>
                </FormControl>
                <FormControl fullWidth>
                    <TextField type="datetime-local" label="Date" value={date.toISOString().slice(undefined, -5)} onChange={e => updateDate(new Date(e.target.value))} />    
                </FormControl>
            </form>
            <p>
                On {date.toLocaleString()} {name}  made {distance} km in {timeMin} min. 
                (Pace: {pace} [min/km])
            </p>

            <Button color="primary" disabled={name === '' || distance === 0 || timeMin === 0}
                onClick={() => addDocument({
                    name: name,
                    distance: distance,
                    date: date,
                    timeMin: timeMin,
                    pace: pace,
                    created: new Date()
                }).then(() => onSuccess()).catch(error => console.log(error))
                }
            >ADD DATA</Button>
            <Snackbar open={show} onClose={() => updateShow(false)} autoHideDuration={3000}>
                <Alert elevation={6} variant="filled" severity="success">Well done! Your Data was saved!</Alert>
            </Snackbar>
        </Aux>
    );
};