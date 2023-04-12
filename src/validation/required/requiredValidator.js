const requiredValidator = (content) => {
  if (!(content?.trim() !== '') || !content) {
    return 'Este campo é obrigatório.';
  }
  return false;
};

export default requiredValidator;
