import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons'

import { AddRun } from './Add-Run/Add-Run';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';
import { Login } from './Login/Login';
import { Aux } from '../../hoc/Aux';

export const AddForm: React.FC = () => (
    <Accordion>
        <AccordionSummary expandIcon={<AddOutlined />}>
            <Typography variant="h6">Add Data</Typography>
        </AccordionSummary>
        <AccordionDetails style={{flexDirection: 'column'}}>
            <IfFirebaseAuthed>
                {() => <AddRun />}
            </IfFirebaseAuthed>
            <IfFirebaseUnAuthed>
                {() => (
                    <Aux>
                        <Typography color="textSecondary">You need to log in before you can submit some data.</Typography>
                        <Login />
                    </Aux>
                )}
            </IfFirebaseUnAuthed>
        </AccordionDetails>
    </Accordion>
);
