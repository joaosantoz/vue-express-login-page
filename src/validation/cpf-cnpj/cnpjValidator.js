export const cnpjValidator = (cnpjValue) => {
  const cnpj = cnpjValue.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) return 'CNPJ inválido.';

  if (/^(\d)\1{13}$/.test(cnpj)) return 'CNPJ inválido.';

  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i += 1) {
    sum += parseInt(cnpj.charAt(i), 10) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let remainder = sum % 11;
  let digit = remainder < 2 ? 0 : 11 - remainder;

  if (digit !== parseInt(cnpj.charAt(12), 10)) return 'CNPJ inválido.';

  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i += 1) {
    sum += parseInt(cnpj.charAt(i), 10) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  remainder = sum % 11;
  digit = remainder < 2 ? 0 : 11 - remainder;

  if (digit !== parseInt(cnpj.charAt(13), 10)) return 'CNPJ inválido.';

  return false;
};
