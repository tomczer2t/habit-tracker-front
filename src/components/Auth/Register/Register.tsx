import { FormEvent, useEffect, useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useUserValidation } from '../../../hooks/useRegisterValidation';
import { axios } from '../../../api/axios';
import { Link } from 'react-router-dom';

export const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepetition, setPasswordRepetition] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const {
    emailError,
    passwordError,
    passwordRepetitionError,
  } = useUserValidation({ email, password, passwordRepetition });

  useEffect(() => {
    setError('');
  }, [email, password, passwordRepetition]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!email || !password || !passwordRepetition || emailError || passwordError || passwordRepetitionError) {
        return;
      }

      await axios.post('users', { email, password });
      setError('');
      setPassword('')
      setPasswordRepetition('');
      setSuccess(true);
    } catch (e: any) {
      const message = e.response.data.message || 'Sorry. Something went wrong. Please try again later.';
      setSuccess(false);
      setError(message);
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h2>Register new account</h2>
      <label>Email:
        <input type="email"
               value={ email }
               onChange={ e => setEmail(e.target.value) }
               required />
        { emailError && (
          <>
            <span><IoCloseCircleOutline /></span>
            <p>Email is not valid.</p>
          </>
        ) }
      </label>

      <label>Password:
        <input type="password"
               value={ password }
               onChange={ e => setPassword(e.target.value) }
               required />
        { passwordError && (
          <>
            <span><IoCloseCircleOutline /></span>
            <p>Password must be at least 8 characters long and has to contain 1 normal letter, 1 capital letter, 1
               number, and any of special character - "?", "!", "@", "#", "$", "%"</p>
          </>
        ) }
      </label>

      <label>Repeat password:
        <input type="password"
               value={ passwordRepetition }
               onChange={ e => setPasswordRepetition(e.target.value) }
               required />
        { passwordRepetitionError && (
          <>
            <span><IoCloseCircleOutline /></span>
            <p>Passwords don't match.</p>
          </>
        ) }
      </label>

      <button type="submit"
              disabled={ !email || !password || !passwordRepetition || emailError || passwordError || passwordRepetitionError }>Register
      </button>

      { error && <p className="error">{ error }</p> }
      { success && <p className="success">Success! <Link to="/login">Click</Link> to login.</p> }

    </form>
  );
};