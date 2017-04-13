import { CommandParser } from "./CommandParser";
import { CommandType } from '../types/CommandType';
import { Command } from "./Command";

describe('CommandParser', () => {

    let testParser: CommandParser;

    beforeEach(() => {
        testParser = new CommandParser();
    });

    describe('parseToString', () => {

        it('it must return ', () => {
            let testCommand = new Command(CommandType.Fold, 5);

            let result = testParser.parseToString(testCommand);

            expect(result).toBe("Fold 5");
        });
    });

    describe('parseToObject', () => {

        it('it must return new Command object with command See and argument 7.', () => {
            let testString = "See 7";

            let result = testParser.parseToObject(testString);

            expect(result.toString()).toBe(new Command(CommandType.See, 7).toString());
        });
    });
});