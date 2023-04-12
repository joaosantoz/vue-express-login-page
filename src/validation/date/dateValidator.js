const dateValidator = (dateValue) => {
  if (!dateValue) return false;

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateValue)) return 'Digite uma data válida.';

  const parts = dateValue.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (month < 1 || month > 12) return 'Digite uma data válida.';
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return 'Digite uma data válida.';

  const today = new Date();
  const date = new Date(year, month - 1, day);
  if (date > today) return 'Digite uma data válida.';

  return false;
};

export default dateValidator;
