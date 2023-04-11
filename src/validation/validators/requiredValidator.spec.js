import { describe, it, expect } from "vitest";
import { requiredValidator } from "@/validation/validators/requiredValidator";

describe('Required Validator', () => {
  const sut = requiredValidator;

  it('should return error true when empty string is given', () => {
    const inputValue = '';

    expect(sut(inputValue)).toEqual({ required: true });
  });

  it('should return error true when null is given', () => {
    const inputValue = null;

    expect(sut(inputValue)).toEqual({ required: true });
  });

  it('should return error true when only spaces are given', () => {
    const inputValue = '   ';

    expect(sut(inputValue)).toEqual({ required: true });
  });

  it('should return false when a valid value is given', () => {
    const inputValue = 'anyValidValue';

    expect(sut(inputValue)).toBeFalsy();
  });
})