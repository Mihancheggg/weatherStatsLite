import { dataFormatter, getAverageOfNumsArr } from './utils'

describe('Utils tests', () => {
    test('test data formatting', () => {
        expect(dataFormatter(1)).toBe('01');
        expect(dataFormatter(9)).toBe('09');
        expect(dataFormatter(10)).toBe('10');
        expect(dataFormatter(22)).toBe('22');
    });

    test('getting average fo nums arr', () => {
        expect(getAverageOfNumsArr([1])).toBe(1);
        expect(getAverageOfNumsArr([1,2])).toBe(2);
        expect(getAverageOfNumsArr([1,2,3])).toBe(2);
        expect(getAverageOfNumsArr([1,200])).toBe(101);
    });
})
