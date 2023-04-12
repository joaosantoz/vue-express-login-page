import { describe, it, expect } from 'vitest';
import { emailValidator } from "@/validation";

describe('Email Validator', () => {
  const sut = emailValidator;

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

    expect(sut(inputValue)).toBe('Digite um e-mail válido.');
  });

  it('should return false when a valid value is given', () => {
    const inputValue = 'anyValidValue';

    expect(sut(inputValue)).toBe('Digite um e-mail válido.');
  });

  it('should return error message when an invalid value is given', () => {
    const inputValue = 'anyInvalidValue';

    expect(sut(inputValue)).toBe('Digite um e-mail válido.');
  });

  it('should return false when a valid value is given', () => {
    const inputValue = 'anyValidValue@mail.com';

    expect(sut(inputValue)).toBeFalsy();
  });
});
