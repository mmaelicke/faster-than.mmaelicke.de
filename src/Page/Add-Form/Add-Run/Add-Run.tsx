import React, { useState } from 'react';
import { Button, createStyles, FormControl, Grid, makeStyles, Snackbar, TextField, Theme } from '@material-ui/core';
import { Alert, Autocomplete } from '@material-ui/lab'
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Run } from '../../../models/run.model';
import { connect } from 'react-redux';
import { AppState } from '../../../models/app-state.model';
import { DatePicker } from '@material-ui/pickers';

interface AddRunProps {
    availableNames: string[];
}

const addDocument = (data: Run) => {
    return firebase.app().firestore().collection('runs').add(data)
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        inputGrid: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }
    })
);

const AddRun: React.FC<AddRunProps> = ({availableNames}) => {
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

    // get the classes
    const classes = useStyles(); 

    return (
        <React.Fragment>
            <form noValidate>
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} lg={4}>
                        <DatePicker
                            variant="static"
                            openTo="date"
                            views={['year', 'month', 'date']}
                            value={date}
                            onChange={d => updateDate(new Date(d as any))}
                        />
                    </Grid>
                    
                    <Grid item xs={12} lg={8} className={classes.inputGrid}>
                        <FormControl fullWidth>
                            {/*<TextField label="Your Name"  error={name === ''} onChange={e => updateName(e.target.value)} value={name}/>*/}
                            <Autocomplete freeSolo autoComplete autoHighlight 
                                options={availableNames} 
                                renderInput={(params) => <TextField {...params} label="Your Name" />}
                                onChange={(_, value) => updateName(value ? value : '')}
                                onInputChange={(_, value) => updateName(value)}
                                value={name}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField type="number" label="Distance [km]" error={distance === 0} onChange={e => updateDistance(Number(e.target.value))} value={distance}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField type="number" label="Time [min]" error={timeMin === 0} onChange={e => updateTime(Number(e.target.value))} value={timeMin}/>
                        </FormControl>

                        <p>
                            On {date.toLocaleDateString()} {name}  made {distance} km in {timeMin} min. 
                            (Pace: {pace} [min/km])
                        </p>
                    </Grid>
                
                </Grid>
            </form>

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
        </React.Fragment>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        availableNames: state.names
    };
}

export default connect(mapStateToProps)(AddRun);