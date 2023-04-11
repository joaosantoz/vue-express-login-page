export const requiredValidator = (content) => {
  if (!(content?.trim() !== '') || !content) {
    return { required: true };
  }
  return false;
};
