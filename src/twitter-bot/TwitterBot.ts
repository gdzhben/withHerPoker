import * as _ from 'lodash';
import * as Twit from 'twit';

import { ITwitterBot } from './ITwitterBot';

export class TwitterBot implements ITwitterBot {

    private _bot: Twit;

    constructor(twitterConfig: Twit.ConfigKeys) {
        this._bot = new Twit(twitterConfig);
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

    public sendDirectMessage(screenName: string, text: string): Promise<void> {
        let params = {
            text: text,
            screen_name: screenName
        };

        return this._bot.post('direct_messages/new', params)
            .then((response: TwitterResponse) => {
                if (response.data.errors) {
                    throw response;
                }
                return;
            }).catch(this._handleError);
    }

    public createFriendship(screenName: string): Promise<void> {
        let params = {
            screen_name: screenName,
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

interface TwitterError {
    errors: {
        code: number, message: string
    }[]
}