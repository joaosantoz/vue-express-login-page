import requiredValidator from '../../validation/required/requiredValidator.js';
import dateValidator from '../../validation/date/dateValidator.js';
import emailValidator from '../../validation/email/emailValidator.js';
import cpfCnpjValidator from '../../validation/cpf-cnpj/cpfCnpjValidator.js';

const missingOneFieldValidation = (fields) => {
  const missingFields = [];

  let fieldRequired;

  fields.forEach((field) => {
    if (requiredValidator(Object.values(field)[0])) {
      fieldRequired = Object.keys(field)[0];
      missingFields.push(fieldRequired);
    }
  });

  if (missingFields.length === fields.length) {
    const errorMessage = 'Todos os campos são de preenchimento obrigatório.';
    return { isValid: false, errorMessage, missingFields };
  }

  if (missingFields.length > 0) {
    const errorMessage = `O seguinte campo é obrigatório: ${fieldRequired}`;
    return { isValid: false, errorMessage, missingFields };
  }

  return { isValid: true };
};

export const registrationFieldsValidation = (req, res, next) => {
  const {
    email, personType, name, cpfCnpj, dateOfCreation, phone, password,
  } = req.body;

  const fieldsRequired = [
    { email },
    { personType },
    { name },
    { cpfCnpj },
    { dateOfCreation },
    { phone },
    { password },
  ];

  const fieldRequiredCheck = missingOneFieldValidation(fieldsRequired);

  if (!fieldRequiredCheck.isValid) {
    return res.status(400).json({
      error: fieldRequiredCheck.errorMessage,
      fields: fieldRequiredCheck.missingFields,
    });
  }

  const emailValidationError = emailValidator(email);
  const dateValidationError = dateValidator(dateOfCreation);
  const cpfCnpjValidationError = cpfCnpjValidator(personType, cpfCnpj);

  if (emailValidationError) {
    return res.status(400).json({ error: emailValidationError, fields: ['email'] });
  }

  if (cpfCnpjValidationError) {
    return res.status(400).json({ error: cpfCnpjValidationError, fields: ['cpfCnpj'] });
  }

  if (dateValidationError) {
    return res.status(400).json({ error: dateValidationError, fields: ['date'] });
  }

  next();
};
