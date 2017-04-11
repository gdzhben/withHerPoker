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

        it('when status is blank should throw error', (done) => {
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
});