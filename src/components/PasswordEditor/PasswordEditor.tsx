import { ChangeModal } from '../common/ChangeModal/ChangeModal';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUserValidation } from '../../hooks/useRegisterValidation';
import { axios } from '../../api/axios';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useLoading } from '../../hooks/useLoading';
import { LoadingSpinner } from '../common/LoadingSpinner/LoadingSpinner';


export const PasswordEditor = () => {

  const [newPassword, setNewPassword] = useState('');
  const [passwordRep, setPasswordRep] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState('');
  const { loading, toggleLoading } = useLoading(false);
  const [success, setSuccess] = useState(false);
  const { auth } = useAuth();

  const {
    passwordError,
    passwordRepetitionError,
  } = useUserValidation({ password: newPassword, passwordRepetition: passwordRep });


  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setError('');
  }, [oldPassword, passwordRep, newPassword]);


  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!newPassword || passwordError || !passwordRep || passwordRepetitionError || !oldPassword) {
        return;
      }
      toggleLoading();
      await axios.patch(`users/${ auth?.id }`, { newPassword: newPassword, password: oldPassword });
      setError('');
      setNewPassword('');
      setPasswordRep('');
      setOldPassword('');
      toggleLoading();
      setSuccess(true);
    } catch (e: any) {
      const message = e.response.data.message || 'Sorry. Something went wrong. Please try again later.';
      setSuccess(false);
      setError(message);
      toggleLoading();
    }
  };

  return (
    <ChangeModal>
      <form className="EmailEditor"
            onSubmit={ handleSubmit }>
        <h2>Change password</h2>
        <label>New password
          <input ref={ inputRef }
                 value={ newPassword }
                 required
                 onChange={ e => setNewPassword(e.target.value) }
                 type="password" />
          { passwordError && (
            <>
              <span><IoCloseCircleOutline /></span>
              <p>Password must be at least 8 characters long and has to contain 1 normal letter, 1 capital letter, 1
                 number, and any of special character - "?", "!", "@", "#", "$", "%".</p>
            </>
          ) }
        </label>
        <label>Repeat password
          <input type="password"
                 required
                 value={ passwordRep }
                 onChange={ e => setPasswordRep(e.target.value) } />
          { passwordRepetitionError && (
            <>
              <span><IoCloseCircleOutline /></span>
              <p>Passwords don't match.</p>
            </>
          ) }
        </label>
        <label>Current password
          <input type="password"
                 required
                 value={ oldPassword }
                 onChange={ e => setOldPassword(e.target.value) } />
        </label>
        <button disabled={ !newPassword || passwordError || !passwordRep || passwordRepetitionError || !oldPassword || !!error }>
          submit
          { loading && <LoadingSpinner style={{ color: '#2f3241' }} /> }
        </button>

        { error && <p className="error">{ error }</p> }
        { success && <p className="success">Success! Password has been correctly changed.</p> }
      </form>
    </ChangeModal>
  );
};


