import {
  vi, it, expect, describe, beforeEach, afterEach,
} from 'vitest';

import registrationFieldsValidation from '../middleware/registrationMiddleware.js';
import requiredValidator from '../../validation/required/requiredValidator.js';
import emailValidator from '../../validation/email/emailValidator.js';
import cpfCnpjValidator from '../../validation/cpf-cnpj/cpfCnpjValidator.js';
import dateValidator from '../../validation/date/dateValidator.js';

vi.mock('../../validation/required/requiredValidator');
vi.mock('../../validation/date/dateValidator');
vi.mock('../../validation/email/emailValidator');
vi.mock('../../validation/cpf-cnpj/cpfCnpjValidator');

describe('Registration Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { body: {} };
    res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    next = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return an error response if all required field is missing', () => {
    requiredValidator.mockReturnValue(true);

    req.body = {
      email: '',
      personType: '',
      name: '',
      cpfCnpj: '',
      dateOfCreation: '',
      phone: '',
      password: '',
    };

    registrationFieldsValidation(req, res);

    expect(requiredValidator).toHaveBeenCalledTimes(7);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Todos os campos são de preenchimento obrigatório.',
      fields: [
        'email',
        'personType',
        'name',
        'cpfCnpj',
        'dateOfCreation',
        'phone',
        'password',
      ],
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return an error response if any required field is missing', () => {
    requiredValidator
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);

    req.body = {
      email: 'mail@mail.com',
      personType: '',
      name: '',
      cpfCnpj: '',
      dateOfCreation: '',
      phone: '',
      password: '',
    };

    registrationFieldsValidation(req, res);

    expect(requiredValidator).toHaveBeenCalledTimes(7);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Verifique o preenchimento de todos os campos e tente novamente.',
      fields: [
        'personType',
        'name',
        'cpfCnpj',
        'dateOfCreation',
        'phone',
        'password',
      ],
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return an error response if the email is invalid', () => {
    requiredValidator.mockReturnValue(false);
    cpfCnpjValidator.mockReturnValue(false);
    dateValidator.mockReturnValue(false);
    emailValidator.mockReturnValue('Email inválido.');

    req.body = {
      email: 'invalid-email',
      personType: 'pf',
      name: 'John Doe',
      cpfCnpj: '58509217025',
      dateOfCreation: '04/12/2001',
      phone: '11987654321',
      password: '123456',
    };

    registrationFieldsValidation(req, res);

    expect(emailValidator).toHaveBeenCalledWith('invalid-email');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email inválido.', fields: ['email'] });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return an error response if the CPF/CNPJ is invalid', () => {
    requiredValidator.mockReturnValue(false);
    emailValidator.mockReturnValue(false);
    cpfCnpjValidator.mockReturnValue('CPF/CNPJ inválido.');

    req.body = {
      email: 'johndoe@example.com',
      personType: 'pf',
      name: 'John Doe',
      cpfCnpj: 'invalid-cpf',
      dateOfCreation: '2000-01-01',
      phone: '11987654321',
      password: '123456',
    };

    registrationFieldsValidation(req, res);

    expect(cpfCnpjValidator).toHaveBeenCalledWith('pf', 'invalid-cpf');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'CPF/CNPJ inválido.', fields: ['cpfCnpj'] });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return an error response if the dateOfCreation is invalid', () => {
    requiredValidator.mockReturnValue(false);
    emailValidator.mockReturnValue(false);
    cpfCnpjValidator.mockReturnValue(false);
    dateValidator.mockReturnValue('Digite uma data válida.');

    req.body = {
      email: 'johndoe@example.com',
      personType: 'pf',
      name: 'John Doe',
      cpfCnpj: '58509217025',
      dateOfCreation: 'invalid-date',
      phone: '11987654321',
      password: '123456',
    };

    registrationFieldsValidation(req, res);

    expect(dateValidator).toHaveBeenCalledWith('invalid-date');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Digite uma data válida.', fields: ['date'] });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return a success response if all fields are valid', () => {
    requiredValidator.mockReturnValue(false);
    emailValidator.mockReturnValue(false);
    cpfCnpjValidator.mockReturnValue(false);
    dateValidator.mockReturnValue(false);

    req.body = {
      email: 'john.doe@example.com',
      personType: 'pf',
      name: 'John Doe',
      cpfCnpj: '58509217025',
      dateOfCreation: '04/12/2001',
      phone: '11987654321',
      password: '123456',
    };

    registrationFieldsValidation(req, res, next);

    expect(requiredValidator).toHaveBeenCalledTimes(7);
    expect(emailValidator).toHaveBeenCalledWith('john.doe@example.com');
    expect(cpfCnpjValidator).toHaveBeenCalledWith('pf', '58509217025');
    expect(dateValidator).toHaveBeenCalledWith('04/12/2001');
    expect(next).toHaveBeenCalled();
  });
});
