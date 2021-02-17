import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';


export const Details: React.FC = () => (
    <Accordion>
        <AccordionSummary expandIcon={<TrendingUpIcon />}>
            <Typography variant="h6">Details</Typography>
        </AccordionSummary>
        <AccordionDetails style={{flexDirection: 'column'}}>
            <i>no details provided yet</i>
        </AccordionDetails>
    </Accordion>
);