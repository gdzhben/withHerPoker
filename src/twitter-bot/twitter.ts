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
}

interface TwitterError {
    errors: {
        code: number, message: string
    }[]
}
