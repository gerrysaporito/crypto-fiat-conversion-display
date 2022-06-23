import { Cleaning } from '../Cleaning';

/*
 * Tests for Cleaning utility class.
 */
describe(`Tests Cleaning utility class' static functions`, () => {
  it('tests cleanStringAmount edge cases', async () => {
    // Check no decimal starting with non-zero number
    expect(Cleaning.cleanStringAmount('100')).toEqual('100');
    expect(Cleaning.cleanStringAmount('0100')).toEqual('100');
    expect(Cleaning.cleanStringAmount('000000100')).toEqual('100');
    // Check decimal starting with zero
    expect(Cleaning.cleanStringAmount('0.00123')).toEqual('0.00123');
    expect(Cleaning.cleanStringAmount('00.00123')).toEqual('0.00123');
    expect(Cleaning.cleanStringAmount('000000.00123')).toEqual('0.00123');
    // Check whole number with decimal places
    expect(Cleaning.cleanStringAmount('100.0')).toEqual('100');
    expect(Cleaning.cleanStringAmount('002.00')).toEqual('2');
    expect(Cleaning.cleanStringAmount('002.01')).toEqual('2.01');
    expect(Cleaning.cleanStringAmount('002.1')).toEqual('2.10');
  });
});
