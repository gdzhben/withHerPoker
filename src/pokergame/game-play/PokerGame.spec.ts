import * as _ from 'lodash';

import {
    PlayerState, GameEndState
} from '../../interfaces';
import { PokerGame } from "./PokerGame";
import { PokerChip } from "../poker-objects/PokerChip";

describe('PokerGame', () => {

    let test: PokerGame;
    let names = ['sukrat', 'ben', 'francis', 'darryl'];
    let sukrat = 'sukrat';

    beforeEach(() => {
        test = new PokerGame();
    });

    describe('dealPlayers', () => {

        it('should deal cards to players', () => {
            let player = test.dealPlayers(sukrat, new PokerChip(100));


            expect(player.hand.size()).toBe(5);
            expect(player.name).toBe(sukrat);
            expect(player.wallet.getValue()).toBe(100);
        })

        it('should throw error if same player exist', () => {
            let player = test.dealPlayers(sukrat, new PokerChip(100));

            expect(() => {
                test.dealPlayers(sukrat, new PokerChip(100));
            }).toThrowError('Player already being dealt!');
        })
    });

    describe('After dealPlayers tasks:', () => {

        beforeEach(() => {
            _.forEach(names, (name) => {
                test.dealPlayers(name, new PokerChip(100));
            })
        })

        describe('poker tasks', () => {

            it('discard', () => {
                let result = test.discard(sukrat, [0, 1, 2]);

                _.forEach(names, (name) => {
                    let playerGame = test.info(name);
                    expect(playerGame.hand.size()).toBe(5);
                });
            })

            it('see', () => {
                let result = test.see(sukrat);

                let playerGame = test.info(sukrat);
                expect(playerGame.wallet.getValue()).toBe(95);
                expect(test.getCurrentBet().getValue()).toBe(5);
            })

            it('raise', () => {
                let result = test.raise(sukrat);

                let playerGame = test.info(sukrat);
                expect(playerGame.wallet.getValue()).toBe(90);
                expect(test.getCurrentBet().getValue()).toBe(10);
            })

            it('fold', () => {
                let result = test.fold(sukrat);

                let playerGame = test.info(sukrat);
                expect(playerGame.wallet.getValue()).toBe(100);
                expect(playerGame.status).toBe(PlayerState.Fold);
            })
        })

        describe('getCurrentBet', () => {
            it('should return the current bet', () => {
                test.raise(names[0]);
                test.raise(names[1]);
                test.raise(names[2]);
                test.raise(names[3]);

                let result = test.getCurrentBet();

                expect(result.getValue()).toBe(25);
            })
        })

        describe('isGameOver', () => {
            it('should return false game is not over', () => {
                test.fold(sukrat);

                let result = test.isGameOver();

                expect(result).toBeFalsy();
            })

            it('should return true when game is over', () => {
                test.fold(names[0]);
                test.fold(names[1]);
                test.fold(names[2]);

                let result = test.isGameOver();

                expect(result).toBeTruthy();
            })
        })

        describe('show', () => {
            it('return the hand object for each name', () => {
                let result = test.show(sukrat);

                let hand = test.info(sukrat).hand;
                expect(result.hand).toBe(hand);
            })
        })

        describe('result', () => {
            it('returns list of players won or lost', () => {
                test.fold(names[1]);
                test.fold(names[2]);
                test.fold(names[3]);

                let result = test.result();

                let folded = _.filter(result, (end) => {
                    return end.gameEndState == GameEndState.Fold;
                })

                expect(result.length).toBe(names.length);
                expect(folded.length).toBe(names.length - 1);
            })

            it('returns list of players won or lost', () => {
                let result = test.result();

                let wonResult = _.filter(result, (end) => {
                    return end.gameEndState == GameEndState.Won;
                })

                expect(result.length).toBe(names.length);
                expect(wonResult.length).toBe(1);
            })
        })


        describe('getPlayersPlaying', () => {

            it('should get the names of all the players', () => {
                let result = test.getPlayersPlaying();
                expect(result).toEqual(names);
            })
        });

        describe('getNextPlayer', () => {
            it('should get the next player', () => {
                let player = test.getNextPlayer();

                expect(player).toEqual(sukrat);
            })

            it('should not get the folded player', () => {
                test.fold(sukrat);
                let result = _.times(5, () => {
                    return test.getNextPlayer();
                })
                expect(result).not.toContain(sukrat);
            })

            it('should return the first player when no player left', () => {
                let result = _.times(4, () => {
                    return test.getNextPlayer();
                })
                let result2 = test.getNextPlayer();

                expect(result).toEqual(names);
                expect(result2).toBe(sukrat);
            })
        })

        describe('removePlayer', () => {
            it('should remove the player', () => {
                let result = test.getPlayersPlaying();

                test.removePlayer(sukrat);

                let result2 = test.getPlayersPlaying();
                expect(result).toEqual(names);
                expect(result2).toEqual(_.slice(names, 1));
            })
        })

        describe('giveChip', () => {
            it('return true if the player is in the game', () => {
                test.giveChip(sukrat, new PokerChip(100));

                let result = test.info(sukrat);
                expect(result.wallet.getValue()).toBe(200);
            })
        })
    });
});