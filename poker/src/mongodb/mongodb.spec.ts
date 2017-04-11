import { MongoDB } from "./mongodb";

describe('Test', function () {

    var db : MongoDB;

    beforeEach(function () {
        db = new MongoDB();
        db.update('francis', 10, 24, 'start date', 'end date', 3, 1, 23, 'testid');
    });

    describe('testing the update method', function () {

        it('it must return hello', function () {
            var result = db.getLeaderBoard();

            expect(result).toBe('francis 10 24 start date end date 3 1 23 testid');
        });
    });
});