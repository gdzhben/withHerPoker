export interface IApp {
    start(): Promise<any>;
    stop(): void;
}