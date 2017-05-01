import * as _ from 'lodash';

import {
    PlayerState, GameEndState
} from '../../interfaces';
import { GameState } from "./GameState";

describe('GameState', () => {

    let test: GameState;
    let names = ['sukrat', 'ben', 'francis', 'darryl'];
    let sukrat = 'sukrat';

    beforeEach(() => {
        test = new GameState(names);
    });

    describe('dealPlayers', () => {

        it('should deal cards to players', () => {
            test.dealPlayers();

            _.forEach(names, (name) => {
                let playerGame = test.getPlayerGame(name);
                expect(playerGame.hand.size()).toBe(5);
            });
        })
    });

    describe('after dealPlayers tasks', () => {

        beforeEach(() => {
            test.dealPlayers();
        })

        describe('poker tasks', () => {

            it('discard', () => {
                let result = test.discard(sukrat, [0, 1, 2]);

                _.forEach(names, (name) => {
                    let playerGame = test.getPlayerGame(name);
                    expect(playerGame.hand.size()).toBe(5);
                });
            })

            it('see', () => {
                let result = test.see(sukrat);

                let playerGame = test.getPlayerGame(sukrat);
                expect(playerGame.wallet.getValue()).toBe(95);
                expect(test.getCurrentBet().getValue()).toBe(5);
            })

            it('raise', () => {
                let result = test.raise(sukrat);

                let playerGame = test.getPlayerGame(sukrat);
                expect(playerGame.wallet.getValue()).toBe(90);
                expect(test.getCurrentBet().getValue()).toBe(10);
            })

            it('fold', () => {
                let result = test.fold(sukrat);

                let playerGame = test.getPlayerGame(sukrat);
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

        describe('checkAndSetBust', () => {
            it('should return the current bet', () => {
                test.raise(names[0]);
                test.raise(names[1]);
                test.raise(names[2]);
                test.raise(names[3]);

                let result = test.checkAndSetBust(sukrat);

                expect(result).toBeUndefined();
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

                let hand = test.getPlayerGame(sukrat).hand;
                expect(result.hand).toBe(hand);
            })
        })

        describe('end', () => {
            it('returns list of players won or lost', () => {
                test.fold(names[1]);
                test.fold(names[2]);
                test.fold(names[3]);

                let result = test.end();

                expect(result[0].name).toBe(sukrat);
                expect(result[0].chipsLeft).toBe(100);
                expect(result[0].gameEndState).toBe(GameEndState.Won);
            })

            it('returns list of players won or lost', () => {
                let result = test.end();

                let wonResult = _.filter(result, (end) => {
                    return end.gameEndState == GameEndState.Won;
                })

                expect(result.length).toBe(names.length);
                expect(wonResult.length).toBe(1);
            })
        })
    });

    describe('getPlayers', () => {

        it('should get the names of all the players', () => {
            let result = test.getPlayers();
            expect(result).toEqual(names);
        })
    });


    describe('getNextPlayer', () => {
        it('should get the next player', () => {
            let player = test.getNextPlayer();

            expect(player).toEqual(sukrat);
        })

        it('should return undefined when no player left', () => {
            let result = _.times(4, () => {
                return test.getNextPlayer();
            })
            let result2 = test.getNextPlayer();

            expect(result).toEqual(names);
            expect(result2).toBeUndefined();
        })
    })

    describe('resetTurn', () => {
        it('should return undefined when no player left', () => {
            let result = _.times(4, () => {
                return test.getNextPlayer();
            })
            let result2 = test.getNextPlayer();

            test.resetTurn();
            let result3 = test.getNextPlayer();

            expect(result).toEqual(names);
            expect(result2).toBeUndefined();
            expect(result3).toEqual(sukrat);
        })
    })

    describe('removePlayer', () => {
        it('should remove the player', () => {
            let result = test.getPlayers();

            test.removePlayer(sukrat);

            let result2 = test.getPlayers();
            expect(result).toEqual(names);
            expect(result2).toEqual(_.slice(names, 1));
        })
    })

    describe('isInTheGame', () => {
        it('return true if the player is in the game', () => {
            let result = test.isInTheGame(sukrat);

            expect(result).toBeTruthy();
        })

        it('return false if the player is not in the game', () => {
            test.removePlayer(sukrat);

            let result = test.isInTheGame(sukrat);

            expect(result).toBeFalsy();
        })
    })

});