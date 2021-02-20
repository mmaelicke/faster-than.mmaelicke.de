export interface DataFilter {
    from?: Date | null;
    to?: Date | null;
    runner?: string;
    lastDays?: number;
}