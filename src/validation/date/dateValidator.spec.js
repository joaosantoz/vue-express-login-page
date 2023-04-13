import { describe, expect, it } from 'vitest';
import dateValidator from './dateValidator.js';

describe('Date Validator', () => {
  const sut = dateValidator;

  it('should return false when empty string is given', () => {
    const inputValue = '';

    expect(sut(inputValue)).toBeFalsy();
  });

  it('should return false when null is given', () => {
    const inputValue = null;

    expect(sut(inputValue)).toBeFalsy();
  });

  it('should return error message when only spaces are given', () => {
    const inputValue = '   ';

    expect(sut(inputValue)).toBe('Digite uma data válida.');
  });

  it('should return false when a valid value is given', () => {
    const inputValue = 'anyValidValue';

    expect(sut(inputValue)).toBe('Digite uma data válida.');
  });

  it('should return error message when an invalid value is given', () => {
    const inputValue = 'anyInvalidValue';

    expect(sut(inputValue)).toBe('Digite uma data válida.');
  });

  it('should return error message when future date is given', () => {
    const todayDate = new Date();
    todayDate.setDate(new Date().getDate() + 30);

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateString = todayDate.toLocaleDateString('pt-BR', options);

    expect(sut(dateString)).toBe('Digite uma data válida.');
  });

  it('should return error message when day greater than 31 is given', () => {
    const inputValue = '32/12/2001';

    expect(sut(inputValue)).toBe('Digite uma data válida.');
  });

  it('should return error message when day lesser than 1 is given', () => {
    const inputValue = '00/12/2001';

    expect(sut(inputValue)).toBe('Digite uma data válida.');
  });

  it('should return error message when month greater than 12 is given', () => {
    const inputValue = '04/13/2001';

    expect(sut(inputValue)).toBe('Digite uma data válida.');
  });

  it('should return error message when month lesser than 1 is given', () => {
    const inputValue = '04/00/2001';

    expect(sut(inputValue)).toBe('Digite uma data válida.');
  });

  it('should return false when a valid value is given', () => {
    const inputValue = '04/12/2001';

    expect(sut(inputValue)).toBeFalsy();
  });
});
