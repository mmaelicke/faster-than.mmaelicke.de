import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import { RunStats } from './RunStats';


export const Details: React.FC = () => (
    <Accordion>
        <AccordionSummary expandIcon={<TrendingUpIcon />}>
            <Typography variant="h6">Details</Typography>
        </AccordionSummary>
        <AccordionDetails style={{flexDirection: 'column', width: '100%', alignItems: 'center', minHeight: '400px'}}>
            <i>no details provided yet</i>

        </AccordionDetails>
    </Accordion>
);