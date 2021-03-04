import React from 'react';
import { AppBar, Button, createStyles, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

import ShowLastFilter from '../../components/ShowLastFilter';

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
        // title: {
        //     flexGrow: 1
        // }
        toolbar: {
            justifyContent: 'space-between'
        }
    }));


export const Header: React.FC = () => {
    const classes = useStyles();
    return (
        <AppBar position="sticky">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6">Faster Than mmaelicke</Typography>
                <ShowLastFilter />
                <div>
                    <IfFirebaseAuthed>
                        {() => <Button color="inherit" onClick={logout}>LOGOUT</Button>}
                    </IfFirebaseAuthed>
                    <IfFirebaseUnAuthed>
                        {() => <span></span>}
                    </IfFirebaseUnAuthed>
                    <Typography variant="button">v: { process.env.REACT_APP_VERSION }</Typography>
                </div>
            </Toolbar>
        </AppBar>
    );
}