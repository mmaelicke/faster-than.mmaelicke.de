import React from 'react';
import { AppBar, Button, createStyles, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { IfFirebaseAuthed } from '@react-firebase/auth';

import firebase from 'firebase/app';
import 'firebase/auth';

const logout = () => {
    firebase.app().auth().signOut().catch(error => console.log(error));
};

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1
        }
    }));


export const Header: React.FC = () => {
    const classes = useStyles();
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>Faster Than mmaelicke</Typography>
                <IfFirebaseAuthed>
                    {() => <Button color="inherit" onClick={logout}>LOGOUT</Button>}
                </IfFirebaseAuthed>
            </Toolbar>
        </AppBar>
    );
}