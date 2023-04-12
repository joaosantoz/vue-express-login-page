import { describe, it, expect } from 'vitest';
import { cpfCnpjValidator } from '@/validation';

describe('Email Validator', () => {
  const sut = cpfCnpjValidator;

  it('should return false when empty string is given and personType is pf', () => {
    const personType = 'pf';
    const inputValue = '';

    expect(sut(personType, inputValue)).toBeFalsy();
  });

  it('should return false when null is given and personType is pf', () => {
    const personType = 'pf';
    const inputValue = null;

    expect(sut(personType, inputValue)).toBeFalsy();
  });

  it('should return error message when only spaces are given and personType is pf', () => {
    const personType = 'pf';
    const inputValue = '   ';

    expect(sut(personType, inputValue)).toBe('CPF inválido.');
  });

  it('should return error message when only zeros are given and personType is pf', () => {
    const personType = 'pf';
    const inputValue = '00000000000';

    expect(sut(personType, inputValue)).toBe('CPF inválido.');
  });

  it('should return false when a valid value is given and personType is pf', () => {
    const personType = 'pf';
    const inputValue = 'invalidValue';

    expect(sut(personType, inputValue)).toBe('CPF inválido.');
  });

  it('should return error message when an invalid value is given and personType is pf', () => {
    const personType = 'pf';
    const inputValue = 'anyInvalidValue';

    expect(sut(personType, inputValue)).toBe('CPF inválido.');
  });

  it('should return error message when an invalid but correct length is given and personType is pf', () => {
    const personType = 'pf';
    const inputValue = '091769abcde';

    expect(sut(personType, inputValue)).toBe('CPF inválido.');
  });

  it('should return error message when the penultimate digit, remain equal 11 is incorrect and personType is pf', () => {
    const personType = 'pf';
    const inputValue = '52998284719';

    expect(sut(personType, inputValue)).toBe('CPF inválido.');
  });

  it('should return error message when the penultimate digit, remain equal 11 or 10 2 is incorrect and personType is pf', () => {
    const personType = 'pf';
    const inputValue = '19715828400';

    expect(sut(personType, inputValue)).toBeFalsy();
  });

  it('should return error message when the last digit is incorrect, remain equal 11 than 2 and personType is pf', () => {
    const personType = 'pf';
    const inputValue = '09176965069';

    expect(sut(personType, inputValue)).toBe('CPF inválido.');
  });

  it('should return error message when the last digit is incorrect, remain equal 11 or 10 and personType is pf', () => {
    const personType = 'pf';
    const inputValue = '09176965068';

    expect(sut(personType, inputValue)).toBe('CPF inválido.');
  });

  it('should return false when a valid value is given and personType is pf', () => {
    const personType = 'pf';
    const inputValue = '09176965066';

    expect(sut(personType, inputValue)).toBeFalsy();
  });

  it('should return false when empty string is given and personType is pj', () => {
    const personType = 'pj';
    const inputValue = '';

    expect(sut(personType, inputValue)).toBeFalsy();
  });

  it('should return false when null is given and personType is pj', () => {
    const personType = 'pj';
    const inputValue = null;

    expect(sut(personType, inputValue)).toBeFalsy();
  });

  it('should return error message when only spaces are given and personType is pj', () => {
    const personType = 'pj';
    const inputValue = '   ';

    expect(sut(personType, inputValue)).toBe('CNPJ inválido.');
  });

  it('should return error message when only zeros are given and personType is pj', () => {
    const personType = 'pj';
    const inputValue = '00000000000000';

    expect(sut(personType, inputValue)).toBe('CNPJ inválido.');
  });

  it('should return false when a valid value is given and personType is pj', () => {
    const personType = 'pj';
    const inputValue = 'invalidValue';

    expect(sut(personType, inputValue)).toBe('CNPJ inválido.');
  });

  it('should return error message when an invalid value is given and personType is pj', () => {
    const personType = 'pj';
    const inputValue = 'anyInvalidValue';

    expect(sut(personType, inputValue)).toBe('CNPJ inválido.');
  });

  it('should return error message when an invalid but correct length is given and personType is pj', () => {
    const personType = 'pj';
    const inputValue = '521882880abcde';

    expect(sut(personType, inputValue)).toBe('CNPJ inválido.');
  });

  it('should return error message when the penultimate digit, remain greater than 2 is incorrect and personType is pj', () => {
    const personType = 'pj';
    const inputValue = '52188288000103';

    expect(sut(personType, inputValue)).toBe('CNPJ inválido.');
  });

  it('should return error message when the penultimate digit, remain lesser than 2 is incorrect and personType is pj', () => {
    const personType = 'pj';
    const inputValue = '07353464000129';

    expect(sut(personType, inputValue)).toBe('CNPJ inválido.');
  });

  it('should return error message when the last digit is incorrect, remain greater than 2 and personType is pj', () => {
    const personType = 'pj';
    const inputValue = '52188288000170';

    expect(sut(personType, inputValue)).toBe('CNPJ inválido.');
  });

  it('should return error message when the last digit is incorrect, remain lesser than 2 and personType is pj', () => {
    const personType = 'pj';
    const inputValue = '12388288000150';

    expect(sut(personType, inputValue)).toBe('CNPJ inválido.');
  });

  it('should return false when a valid value is given and personType is pj', () => {
    const personType = 'pj';
    const inputValue = '52188288000173';

    expect(sut(personType, inputValue)).toBeFalsy();
  });
});
