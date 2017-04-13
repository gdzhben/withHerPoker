import { TwitterBot } from "./TwitterBot";
import { ITwitterBot } from "./ITwitterBot";
import { twitterConfig } from './twitter-config'

describe('TwitterBot', () => {

    let twitterBot: ITwitterBot;
    let otherScreenName = 'SukratKashyap';
    let screenName = 'withherpoker';

    beforeEach(() => {
        twitterBot = new TwitterBot(twitterConfig);
    });

    describe('postTweet', () => {

        xit('when status is not empty should post successfully', (done) => {
            let expectedTweet = 'Test tweet';
            twitterBot.postTweet(expectedTweet)
                .then(() => {
                    done();
                })
                .catch((err: Error) => {
                    done.fail(err);
                });
        });

        it('when status is blank should throw error', (done) => {
            let expectedTweet = '';
            twitterBot.postTweet(expectedTweet)
                .then(() => {
                    done.fail();
                })
                .catch((err: Error) => {
                    expect(err.message).toBe('Missing required parameter: status.');
                    done();
                });
        });
    });

    describe('getUsername', () => {

        it('should return screen_name', (done) => {
            twitterBot.getUsername()
                .then((username: string) => {
                    expect(username).toBe(screenName);
                    done();
                })
                .catch((err: Error) => {
                    done.fail(err);
                });
        });
    });

    describe('sendDirectMessage', () => {

        xit('should send message successfully', (done) => {
            let text = 'Test direct message!';
            twitterBot.sendDirectMessage(otherScreenName, text)
                .then(() => {
                    done();
                })
                .catch((err: Error) => {
                    done.fail(err);
                });
        });

        it('should throw error if the message is empty', (done) => {
            let text = '';
            twitterBot.sendDirectMessage(otherScreenName, text)
                .then(() => {
                    done.fail('Empty messsage should not be sent!');
                })
                .catch((err: Error) => {
                    expect(err.message).toBe('There was an error sending your message: Your message cannot be blank..');
                    done();
                });
        });
    });

    describe('createFriendship', () => {

        it('should create friendship', (done) => {
            twitterBot.createFriendship(otherScreenName)
                .then(() => {
                    done();
                })
                .catch((err: Error) => {
                    done.fail(err);
                });
        });
    });
});