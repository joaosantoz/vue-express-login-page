const emailValidator = (content) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!content) return false;

  if (!regex.test(content)) {
    return 'Digite um e-mail válido.';
  }

  return false;
};

export default emailValidator;
