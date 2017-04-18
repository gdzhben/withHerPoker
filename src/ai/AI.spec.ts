import { AI } from "./AI";
import { SuitType } from '../types/SuitType';

describe('AI', () => {

    let test: AI;

    beforeEach(() => {
        test = new AI(SuitType, SuitType);
    });

    describe('getCommand', () => {

        it('must return raise', () => {
            let result = test.getCommand();

            expect(result).toBe('raise');
        });
    });
});