import { cnpjValidator } from '@/validation/cpf-cnpj/cnpjValidator';
import { cpfValidator } from '@/validation/cpf-cnpj/cpfValidator';

export const cpfCnpjValidator = (personType, content) => {
  if (!content) return false;

  return {
    pj: cnpjValidator(content),
    pf: cpfValidator(content),
  }[personType];
};
