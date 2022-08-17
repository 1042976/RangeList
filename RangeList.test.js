/**
 * Created by Xiaodong Liu on 8/17/22.
 */
const RangeList = require('./RangeList');

describe('RangeList', () => {
    const typeErrMsg = "Range should be a pair of number";
    const valErrMsg = "End should be greater than ot equal to start";
    describe('add', () => {
        const rangeList = new RangeList();
        test('add valid range', () => {
            expect(rangeList.getRanges()).toBe('');

            rangeList.add([1, 5]);
            expect(rangeList.getRanges()).toBe('[1, 5)');

            rangeList.add([10, 20]);
            expect(rangeList.getRanges()).toBe('[1, 5) [10, 20)');

            rangeList.add([0, 1]);
            expect(rangeList.getRanges()).toBe('[0, 5) [10, 20)');

            rangeList.add([9, 11]);
            expect(rangeList.getRanges()).toBe('[0, 5) [9, 20)');

            rangeList.add([4, 5]);
            expect(rangeList.getRanges()).toBe('[0, 5) [9, 20)');

            rangeList.add([5, 6]);
            expect(rangeList.getRanges()).toBe('[0, 6) [9, 20)');

            rangeList.add([7, 8]);
            expect(rangeList.getRanges()).toBe('[0, 6) [7, 8) [9, 20)');

            rangeList.add([5, 8]);
            expect(rangeList.getRanges()).toBe('[0, 8) [9, 20)');

            rangeList.add([-1, 21]);
            expect(rangeList.getRanges()).toBe('[-1, 21)');
        });

        test('non-number input', () => {
            expect(() => {
                rangeList.add(['1', 5]);
            }).toThrow(typeErrMsg);

            expect(() => {
                rangeList.add([1, '-5']);
            }).toThrow(typeErrMsg);

            expect(() => {
                rangeList.add([true, '-5']);
            }).toThrow(typeErrMsg);
        });

        test('start > end', () => {
            expect(() => {
                rangeList.add([1, 0]);
            }).toThrow(valErrMsg);
        });
    });

    describe('remove', () => {
        const rangeList = new RangeList();
        rangeList.add([0, 5]);
        rangeList.add([8, 16]);
        rangeList.add([17, 18]);
        test('remove valid range', () => {
            console.log = jest.fn();
            rangeList.remove([0, 1]);
            expect(rangeList.getRanges()).toBe('[1, 5) [8, 16) [17, 18)');

            rangeList.remove([9, 15]);
            expect(rangeList.getRanges()).toBe('[1, 5) [8, 9) [15, 16) [17, 18)');

            rangeList.remove([9, 11]);
            expect(rangeList.getRanges()).toBe('[1, 5) [8, 9) [15, 16) [17, 18)');

            rangeList.remove([10, 11]);
            expect(rangeList.getRanges()).toBe('[1, 5) [8, 9) [15, 16) [17, 18)');

            rangeList.remove([0, 9]);
            expect(rangeList.getRanges()).toBe('[15, 16) [17, 18)');

            rangeList.remove([-3, 20]);
            expect(rangeList.getRanges()).toBe('');
        });

        test('non-number input', () => {
            expect(() => {
                rangeList.remove(['1', 5]);
            }).toThrow(typeErrMsg);

            expect(() => {
                rangeList.remove([1, '-5']);
            }).toThrow(typeErrMsg);

            expect(() => {
                rangeList.remove([true, '-5']);
            }).toThrow(typeErrMsg);
        });

        test('start > end', () => {
            expect(() => {
                rangeList.remove([1, 0]);
            }).toThrow(valErrMsg);
        });
    });

    describe('print', () => {
        const rangeList = new RangeList();
        console.log = jest.fn();
        test('print empty list', () => {
            rangeList.print();
            expect(console.log).toHaveBeenCalledWith('');
        });
        test('print empty list', () => {
            console.log.mockReset();
            rangeList.add([-1, 0]);
            rangeList.add([11, 15]);
            rangeList.add([17, 21]);
            rangeList.print();
            expect(console.log).toHaveBeenCalledWith('[-1, 0) [11, 15) [17, 21)');
        });
    });
});

