import { useEffect, useState } from 'react';

const EMAIL_REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%]).{8,100}$/;

export const useRegisterValidation = (email: string, password: string, passwordRepetition: string) => {

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRepetitionError, setPasswordRepetitionError] = useState(false);

  useEffect(() => {
    if (email && !EMAIL_REGEX.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (password && !PASSWORD_REGEX.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (passwordRepetition && password !== passwordRepetition) {
      setPasswordRepetitionError(true);
    } else {
      setPasswordRepetitionError(false);
    }
  }, [email, password, passwordRepetition]);

  return { emailError, passwordError, passwordRepetitionError };
};