
export const required = (value) => {
  if (value) {
    return undefined;
  }
  return 'Field is required';
};

export const maxLength = (maxLength) => {
  return (value) => {
    if (value && value.length < maxLength) {
      return undefined;
    }
    return `Max length is ${maxLength} symbols`;
  }
};
