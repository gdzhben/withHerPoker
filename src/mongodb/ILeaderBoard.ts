export interface ILeaderBoard {
    columnToString(heading: string): string;
    rowToString(rowNum: number): string;
    tableToString(): string;
    addRow(): void;
}