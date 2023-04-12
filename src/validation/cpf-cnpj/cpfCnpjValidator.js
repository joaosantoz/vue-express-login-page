import { cnpjValidator } from './cnpjValidator.js';
import { cpfValidator } from './cpfValidator.js';

const cpfCnpjValidator = (personType, content) => {
  if (!content) return false;

  return {
    pj: cnpjValidator(content),
    pf: cpfValidator(content),
  }[personType];
};

export default cpfCnpjValidator;
