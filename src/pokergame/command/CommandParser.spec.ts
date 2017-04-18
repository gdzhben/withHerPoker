import { CommandType } from '../../interfaces';
import { CommandParser } from "./CommandParser";
import { Command } from "./Command";

describe('CommandParser', () => {

    let testParser: CommandParser;

    beforeEach(() => {
        testParser = new CommandParser();
    });

    describe('parseToString', () => {

        it('must return ', () => {
            let testCommand = new Command(CommandType.Fold, 5);

            let result = testParser.parseToString(testCommand);

            expect(result).toBe("Fold 5");
        });
    });

    describe('parseToObject', () => {

        it('must return new Command object with command See and argument 7.', () => {
            let testString = "See 7";

            let result = testParser.parseToObject(testString);

            expect(result.toString()).toBe(new Command(CommandType.See, 7).toString());
        });
    });

    describe('parseToObject', () => {

        it('must return new Command object with command See and argument 7.', () => {
            let testString = "See 7 test";

            let result = testParser.parseToObject(testString);

            expect(result.toString()).toBe(new Command(CommandType.See, 7).toString());
        });
    });

    describe('parseToObject', () => {

        it('must return new Command object with command See and argument 7.', () => {
            let testString = "See 7 test";

            let result = testParser.parseToObject(testString);

            expect(result.toString()).toBe(new Command(CommandType.See, 7).toString());
        });
    });

    describe('parseToObject', () => {

        it('must return new Command object with command See and argument 7.', () => {
            let testString = "See7";

            let result = function () { testParser.parseToObject(testString); };

            expect(result).toThrow(new Error('No spaces. Cannot parse input.'));
        });
    });
});