import { AnyAction } from "redux";
import { DataFilter } from "../../models/data-filter";
import * as actionTypes from './actionTypes';

export const updateFilter = (filterUpdates: DataFilter): AnyAction => {
    return {
        type: actionTypes.UPDATE_FILTER,
        filter: filterUpdates
    }
};
