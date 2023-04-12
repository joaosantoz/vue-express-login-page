export const cpfValidator = (cpfValue) => {
  const cpf = cpfValue.replace(/[^\d]+/g, '');

  if (cpf.length !== 11) return 'CPF inválido.';

  if (/^(\d)\1{10}$/.test(cpf)) return 'CPF inválido.';

  let sum = 0;
  for (let i = 0; i < 9; i += 1) {
    sum += parseInt(cpf.charAt(i), 10) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(cpf.charAt(9), 10)) return 'CPF inválido.';

  sum = 0;
  for (let i = 0; i < 10; i += 1) {
    sum += parseInt(cpf.charAt(i), 10) * (11 - i);
  }
  remainder = 11 - (sum % 11);

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10), 10)) return 'CPF inválido.';

  return false;
};
