import { ChangeModal } from '../common/ChangeModal/ChangeModal';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useUserValidation } from '../../hooks/useRegisterValidation';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { axios } from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';

export const EmailEditor = () => {

  const [email, setEmail] = useState('');
  const [emailRep, setEmailRep] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { auth } = useAuth();

  const {
    emailError,
    emailRepetitionError,
  } = useUserValidation({ email, emailRepetition: emailRep });


  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setError('');
  }, [email, emailRep, password]);


  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!email || emailError || !emailRep || emailRepetitionError || !password) {
        return;
      }
      await axios.patch(`users/${ auth?.id }`, { newEmail: email, password });
      setError('');
      setPassword('');
      setEmailRep('');
      setEmail('');
      setSuccess(true);
    } catch (e: any) {
      const message = e.response.data.message || 'Sorry. Something went wrong. Please try again later.';
      setSuccess(false);
      setError(message);
    }
  };

  return (
    <ChangeModal>
      <form className="EmailEditor"
            onSubmit={ handleSubmit }>
        <h2>Change email</h2>
        <label>New email
          <input ref={ inputRef }
                 value={ email }
                 required
                 onChange={ e => setEmail(e.target.value) }
                 type="email" />
          { emailError && (
            <>
              <span><IoCloseCircleOutline /></span>
              <p>Email is not valid.</p>
            </>
          ) }
        </label>
        <label>Repeat email
          <input type="email"
                 required
                 value={ emailRep }
                 onChange={ e => setEmailRep(e.target.value) } />
          { emailRepetitionError && (
            <>
              <span><IoCloseCircleOutline /></span>
              <p>Emails don't match.</p>
            </>
          ) }
        </label>
        <label>Password
          <input type="password"
                 required
                 value={ password }
                 onChange={ e => setPassword(e.target.value) } />
        </label>
        <button disabled={ !email || emailError || !emailRep || emailRepetitionError || !password || !!error }>submit</button>

        { error && <p className="error">{ error }</p> }
        { success && <p className="success">Success! Email has been correctly changed.</p> }
      </form>
    </ChangeModal>
  );
};