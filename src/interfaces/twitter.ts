export interface IUser {
    id: string
    screenName: string
}

export interface ITwitterBot {
    postTweet(status: string): Promise<void>;
    getUsername(): Promise<string>;
    sendDirectMessage(screenName: string, text: string): Promise<void>;
    createFriendship(screenName: string): Promise<void>;
    directMessagesStream(): Promise<IUser>;
    followStream(): Promise<IUser>;
    start(): void;
    stop(): void;
}