export interface IUser {
    id: string
    screenName: string
}

export interface IUserMessage extends IUser {
    text: string
}

export const BOT_SCREEN_NAME = 'withherpoker';

export interface ITwitterBot {
    postTweet(status: string): Promise<void>;
    getUsername(): Promise<string>;
    sendDirectMessage(screenName: string, text: string): Promise<void>;
    createFriendship(screenName: string): Promise<void>;
    directMessagesStream(): Promise<IUserMessage>;
    followStream(): Promise<IUser>;
    start(): void;
    stop(): void;
}