import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';
import { axios } from '../../api/axios';
import './VerifyAccount.css';

export const VerifyAccount = () => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const { loading, toggleLoading } = useLoading(true);
  const { token } = useParams();
  const spinnerStyles = { fontSize: '5em', display: 'block', marginInline: 'auto', marginBlock: '4rem' };

  useEffect(() => {
    void verifyAccount();
  }, [token]);

  const verifyAccount = async () => {
    try {
      if (!token) return;
      await axios.patch(`users/verify-account/${ token }`);
      toggleLoading(false);
      setIsSuccess(true);
    } catch (err) {
      toggleLoading(false);
      setIsSuccess(false);
    }
  }

  return (
    <article className="verifyAccount">
      { loading && <LoadingSpinner style={ spinnerStyles } /> }
      { isSuccess === true && <div className="verifyAccount__success">
        <p className="verifyAccount__success-text">Account verified</p>
        <a className="verifyAccount__success-link" href="/login">Click to go to login page.</a>
      </div> }
      { isSuccess === false && <div className="verifyAccount__error">
        <p className="verifyAccount__error-text">Wrong token or account is already verified.</p>
        <a className="verifyAccount__link" href="/login">Click to go to login page.</a>
      </div>  }
    </article>
  );
};
