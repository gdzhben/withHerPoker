import { TwitterBot } from "./twitter";

describe('TwitterBot', () => {

    beforeEach(() => {

    });

    describe('postTweet', () => {

        xit('when status is not empty should post successfully', (done) => {
            let expectedTweet = 'Test tweet';
            TwitterBot.postTweet(expectedTweet)
                .then(() => {
                    done();
                })
                .catch((err: Error) => {
                    done.fail(err);
                });
        });

        xit('when status is blank should throw error', (done) => {
            let expectedTweet = '';
            TwitterBot.postTweet(expectedTweet)
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

        xit('should return screen_name', (done) => {
            let expectedUsername = 'withherpoker';
            TwitterBot.getUsername()
                .then((username: string) => {
                    expect(username).toBe(expectedUsername);
                    done();
                })
                .catch((err: Error) => {
                    done.fail(err);
                });
        });
    });

    describe('sendDirectMessage', () => {

        xit('should send message to darryl', (done) => {
            let toScreenName = 'SukratKashyap';
            let text = 'test direct message!';
            TwitterBot.sendDirectMessage(toScreenName, text)
                .then(() => {
                    done();
                })
                .catch((err: Error) => {
                    done.fail(err);
                });
        });
    });

    describe('createFriendship', () => {

        xit('should create friendship', (done) => {
            let toScreenName = 'SukratKashyap';
            TwitterBot.createFriendship(toScreenName)
                .then(() => {
                    done();
                })
                .catch((err: Error) => {
                    done.fail(err);
                });
        });
    });
});