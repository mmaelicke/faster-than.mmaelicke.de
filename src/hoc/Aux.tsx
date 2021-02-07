import React, { ReactElement } from 'react';

interface Props {
    children: React.ReactNode;
}

export const Aux: React.FC<Props> = props => props.children as ReactElement;