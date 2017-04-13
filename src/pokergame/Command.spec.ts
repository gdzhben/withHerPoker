import { Command } from "./Command";
import { CommandType } from '../types/CommandType';

describe('Command', () => {

    let test: Command;
    let testCommandType = CommandType.See;
    let testArgument = 5;

    beforeEach(() => {
        test = new Command(testCommandType, testArgument);
    });

    describe('getCommandType', () => {

        it('it must return See', () => {
            let result = test.getCommandType();

            expect(result).toBe(CommandType.See);
        });
    });

    describe('getArgument', () => {

        it('it must return 5', () => {
            let result = test.getArgument();

            expect(result).toBe(5);
        });
    });

    describe('toString', () => {

        it('it must return 0 5', () => {
            let result = test.toString();

            expect(result).toBe('0 5');
        });
    });
});