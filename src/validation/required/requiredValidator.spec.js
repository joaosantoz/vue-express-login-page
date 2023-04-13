import { describe, it, expect } from 'vitest';
import requiredValidator from './requiredValidator.js';

describe('Required Validator', () => {
  const sut = requiredValidator;

  it('should return error message when empty string is given', () => {
    const inputValue = '';

    expect(sut(inputValue)).toBe('Este campo é obrigatório.');
  });

  it('should return error message when null is given', () => {
    const inputValue = null;

    expect(sut(inputValue)).toBe('Este campo é obrigatório.');
  });

  it('should return error message when only spaces are given', () => {
    const inputValue = '   ';

    expect(sut(inputValue)).toBe('Este campo é obrigatório.');
  });

  it('should return false when a valid value is given', () => {
    const inputValue = 'anyValidValue';

    expect(sut(inputValue)).toBeFalsy();
  });
});
