import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';
import { axios } from '../../api/axios';

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
      console.log(err);
      toggleLoading(false);
      setIsSuccess(false);
    }
  }

  return (
    <article>
      { loading && <LoadingSpinner style={ spinnerStyles } /> }
      { isSuccess === true && <p>Success</p>}
      { isSuccess === false && <p>Error</p>}
    </article>
  );
};
