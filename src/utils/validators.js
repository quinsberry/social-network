
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

export const validPassword = (password) => {
  if (password.length > 8) {
    return undefined;
  }
  return `Password should have min 8 symbols`;
};

export const validEmail = (email) => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regEx.test(email.trim().toLowerCase())) {
    return undefined;
  }
  return `Your email is not valid`;
};
