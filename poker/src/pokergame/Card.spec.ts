import { Card } from "./Card";
import { SuitType } from '../types/SuitType';
describe('Test', function () {

    let test: Card;
    let testSuit = SuitType.CLUBS;
    let testStr: string = "testing";
    let testFace: number = 13;
    beforeEach(function () {
        test = new Card(testStr, testSuit, testFace);
    });

    describe('testing the Card class: getCardName  methods', function () {

        it('it must return testing', function () {
            var result = test.getCardName();

            expect(result).toBe('testing');
        });
    });
    describe('testing the Card class:  getSuitType  methods', function () {

        it('it must return hello', function () {
            var result = test.getSuitType;

            expect(result).toBe(SuitType.CLUBS);
        });
    });
    describe('testing the Card class: getFaceValue methods', function () {

        it('it must return 13', function () {
            var result = test.getFaceValue;

            expect(result).toBe(13);
        });
    });
});