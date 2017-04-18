import * as _ from 'lodash';
import * as Twit from 'twit';

import { ITwitterBot, IUser } from '../interfaces';

export class TwitterBot implements ITwitterBot {

    private _bot: Twit;
    private readonly _userStreamName: Twit.StreamEndpoint = 'user';
    private _userStream: NodeJS.ReadableStream;
    private _getDirectMessagePromise: Promise<IUser>;
    private _followPromise: Promise<IUser>;

    constructor(twitterConfig: Twit.ConfigKeys) {
        this._bot = new Twit(twitterConfig);
    }

    public start(): Promise<string> {
        let promise = this.getUsername();
        this._createStreams();
        return promise;
    }

    public postTweet(status: string): Promise<void> {
        let params = {
            status: status
        };

        return this._bot
            .post('statuses/update', params)
            .then((response: TwitterResponse) => {
                if (response.data.errors) {
                    throw response;
                }
                return;
            }).catch(this._handleError);
    }

    public getUsername(): Promise<string> {
        let params = {};

        return this._bot
            .get('account/verify_credentials', params)
            .then((response: TwitterResponse) => {
                if (response.data.errors) {
                    throw response;
                }
                return response.data.screen_name;
            }).catch((err: any) => {
                let error = new Error(err);
                return Promise.reject(error);
            });
    }

    public sendDirectMessage(userId: string, text: string): Promise<void> {
        let params = {
            text: text,
            user_id: userId
        };

        return this._bot.post('direct_messages/new', params)
            .then((response: TwitterResponse) => {
                if (response.data.errors) {
                    throw response;
                }
                return;
            }).catch(this._handleError);
    }

    public createFriendship(userId: string): Promise<void> {
        let params = {
            user_id: userId,
            follow: true
        };

        return this._bot.post('friendships/create', params)
            .then((response: TwitterResponse) => {
                if (response.data.errors) {
                    throw response;
                }
                return;
            }).catch(this._handleError);
    }

    public directMessagesStream(): Promise<IUser> {
        return this._getDirectMessagePromise;
    }

    public followStream(): Promise<IUser> {
        return this._followPromise;
    }

    public stop() {
        this._getDirectMessagePromise = null;
        this._followPromise = null;
        if (_.hasIn(this._userStream, 'stop')) {
            this._userStream['stop']();
        }
    }

    private _createStreams() {
        this._userStream = this._bot.stream(this._userStreamName);
        this._getDirectMessagePromise = new Promise<IUser>((resolve, reject) => {
            this._userStream.on('direct_message', (msg: TwitterMessage) => {
                if (_.hasIn(msg, 'direct_message.sender_id_str') && _.hasIn(msg, 'direct_message.sender_screen_name')) {
                    reject(new Error('Error in receiving message'));
                }

                let user: IUser = {
                    id: msg.direct_message.sender_id_str,
                    screenName: msg.direct_message.sender_screen_name
                }
                resolve(user);
            });
        });

        this._followPromise = new Promise<IUser>((resolve, reject) => {
            this._userStream.on('follow', (msg: TwitterFollower) => {
                if (_.hasIn(msg, 'source.id_str') && _.hasIn(msg, 'source.screen_name')) {
                    reject(new Error('Error in receiving followers'));
                }

                let user: IUser = {
                    id: msg.source.id_str,
                    screenName: msg.source.screen_name
                }
                resolve(user);
            });
        });
    }

    private _handleError(response: TwitterResponse): Promise<Error> {
        let msgs = _.map(response.data.errors, (elem) => {
            return elem.message;
        });
        let errorMsg = _.join(msgs, ',');
        return Promise.reject(new Error(errorMsg));
    }
}

interface TwitterResponse extends Twit.PromiseResponse {
    data: Twit.Response & TwitterError & TwitterVerifyCredentialResponse
}

interface TwitterVerifyCredentialResponse {
    id: number
    id_str: string
    is_translator: boolean
    location: string
    name: string
    notifications: any
    profile_background_color: string
    profile_background_image_url: string
    profile_background_image_url_https: string
    screen_name: string
}

interface TwitterMessage {
    direct_message: {
        id: number,
        id_str: string,
        text: string,
        sender_id: number,
        sender_id_str: string,
        sender_screen_name: string,
        created_at: Date
    }
}

interface TwitterFollower {
    event: string
    source: {
        id: number,
        id_str: string,
        name: string,
        screen_name: string
    }
    created_at: 'Mon Apr 17 15:50:23 +0000 2017'
}

interface TwitterError {
    errors: {
        code: number, message: string
    }[]
}