import { Run } from './run.model';
import { DataFilter } from './data-filter';

export interface AppState {
    runs: Run[];
    names: string[];
    currentFilter: DataFilter;
    filteredRuns: Run[];
}
