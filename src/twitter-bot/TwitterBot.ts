import * as _ from 'lodash';
import * as Twit from 'twit';
import * as rx from 'rxjs/Rx';

import {
    ITwitterBot, IUser, IUserMessage, BOT_SCREEN_NAME,
    ITwitterStream, IApp

} from '../interfaces';

export class TwitterBot implements ITwitterBot, ITwitterStream, IApp {
    private _bot: Twit;
    private readonly _userStreamName: Twit.StreamEndpoint = 'user';
    private _userStream: NodeJS.ReadableStream;

    private _obsMessage: rx.Subject<IUserMessage> = new rx.Subject<IUserMessage>();
    private _obsFollow: rx.Subject<IUser> = new rx.Subject<IUser>();

    constructor(twitterConfig: Twit.ConfigKeys) {
        this._bot = new Twit(twitterConfig);
    }

    public start(): Promise<string> {
        let promise = this.getUsername();
        this._createStreams();
        return promise;
    }

    public stop(): void {
        this._obsFollow && this._obsMessage.unsubscribe();
        this._obsFollow && this._obsFollow.unsubscribe();
        if (_.hasIn(this._userStream, 'stop')) {
            this._userStream['stop']();
        }
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

    public directMessagesObservable(): rx.Observable<IUserMessage> {
        return this._obsMessage.asObservable();
    }

    public followObservable(): rx.Observable<IUser> {
        return this._obsFollow.asObservable();
    }

    private _createStreams() {
        this._userStream = this._bot.stream(this._userStreamName);
        this._userStream.on('direct_message', (msg: TwitterMessage, err: any) => {
            if (err) {
                let error = new Error(err);
                this._obsMessage.error(error);
                return;
            }
            if (!(_.hasIn(msg, 'direct_message.sender_id_str')
                && _.hasIn(msg, 'direct_message.sender_screen_name')
                && _.hasIn(msg, 'direct_message.text'))) {
                let error = new Error('Error in receiving message');
                this._obsMessage.error(error);
                return;
            }

            let user: IUserMessage = {
                id: msg.direct_message.sender_id_str,
                screenName: msg.direct_message.sender_screen_name,
                text: msg.direct_message.text
            }
            if (!_.isEqual(msg.direct_message.sender_screen_name, BOT_SCREEN_NAME)) {
                this._obsMessage.next(user);
            }
        });

        this._userStream.on('follow', (msg: TwitterFollower, err: any) => {
            if (err) {
                let error = new Error(err);
                this._obsMessage.error(error);
                return;
            }
            if (!(_.hasIn(msg, 'source.id_str')
                && _.hasIn(msg, 'source.screen_name'))) {
                let error = new Error('Error in receiving followers');
                this._obsMessage.error(error);
                return;
            }

            let user: IUser = {
                id: msg.source.id_str,
                screenName: msg.source.screen_name
            }
            this._obsFollow.next(user);
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
    created_at: Date
}

interface TwitterError {
    errors: {
        code: number, message: string
    }[]
}