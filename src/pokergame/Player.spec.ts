import { Player } from "./Player";
import { Command } from './Command';
import { CommandType } from '../types/CommandType';

describe('Player', () => {

    let test: Player;
    let testName = 'Francis';
    let testChipCount = 13;

    beforeEach(() => {
        test = new Player(testName, testChipCount);
    });

    describe('getName', () => {

        it('it must return Francis', () => {
            let result = test.getName();

            expect(result).toBe('Francis');
        });
    });

    describe('getChipCount', () => {

        it('it must return 13', () => {
            let result = test.getChipCount();

            expect(result).toBe(13);
        });
    });

    describe('setCommand and getCommand', () => {

        it('Command must be Fold 3.', () => {
            let testCommand = new Command(CommandType.Fold, 3);
            test.setCommand(testCommand);
            let result = test.getCommand().toString();

            expect(result).toBe('Fold 3');
        });
    });
});