export interface ITwitterBot {
    postTweet(status: string): Promise<void>;
    getUsername(): Promise<string>;
    sendDirectMessage(screenName: string, text: string): Promise<void>;
    createFriendship(screenName: string): Promise<void>;
}