export interface Run {
    name: string;
    distance: number;
    timeMin: number;
    date: {seconds: number, nanoseconds: number} | Date;
    pace?: string;
    created?: Date;
}