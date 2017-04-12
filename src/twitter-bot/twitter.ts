import { twitterConfig } from './twitter-config'
var Twitter = require('twitter-node-client').Twitter;

export class TwitterBot {
    private static _bot = new Twitter(twitterConfig);

    public static postTweet(status: string): Promise<void> {
        let params = {
            status: status
        };

        let promise = new Promise<void>((resolve, reject) => {

            this._bot.postTweet(params,
                (err: any) => {
                    let errObj: TwitterError = JSON.parse(err.data);
                    let errorMsg = 'Post tweet failed!';
                    if (errObj && errObj.errors && errObj.errors[0]) {
                        errorMsg = errObj.errors[0].message;
                    }
                    reject(new Error(errorMsg));
                }, (data: any) => {
                    resolve();
                });
        });

        return promise;
    }

    public static getUsername(): Promise<string> {
        let params = {};
        let promise = new Promise<string>((resolve, reject) => {

            this._bot.getCustomApiCall('/account/verify_credentials.json', params,
                (err: any) => {
                    let errObj: TwitterError = JSON.parse(err.data);
                    let errorMsg = 'Getting username failed!';
                    if (errObj && errObj.errors && errObj.errors[0]) {
                        errorMsg = errObj.errors[0].message;
                    }
                    reject(new Error(errorMsg));
                }, (data: string) => {
                    let obj: TwitterVerifyCredentialResponse = JSON.parse(data);
                    resolve(obj.screen_name);
                });

        });
        return promise;
    }

    public static sendDirectMessage(screenName: string, text: string) {
        let params = {
            text: text,
            screen_name: screenName
        };

        let promise = new Promise<string>((resolve, reject) => {

            this._bot.postCustomApiCall('/direct_messages/new.json', params,
                (err: any) => {
                    let errObj: TwitterError = JSON.parse(err.data);
                    let errorMsg = 'Message sending failed!';
                    if (errObj && errObj.errors && errObj.errors[0]) {
                        errorMsg = errObj.errors[0].message;
                    }
                    reject(new Error(errorMsg));
                }, (data: string) => {
                    resolve();
                });

        });
        return promise;
    }

    public static createFriendship(screenName: string) {
        let params = {
            screen_name: screenName,
            follow: true
        };

        let promise = new Promise<string>((resolve, reject) => {

            this._bot.postCustomApiCall('/friendships/create.json', params,
                (err: any) => {
                    let errObj: TwitterError = JSON.parse(err.data);
                    let errorMsg = 'Message sending failed!';
                    if (errObj && errObj.errors && errObj.errors[0]) {
                        errorMsg = errObj.errors[0].message;
                    }
                    reject(new Error(errorMsg));
                }, (data: string) => {
                    resolve();
                });

        });
        return promise;
    }
}

interface TwitterError {
    errors: {
        code: number, message: string
    }[]
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

interface TwitterApi {


}