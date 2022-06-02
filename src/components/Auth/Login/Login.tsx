import { FormEvent, useEffect, useState } from 'react';
import { axiosPrivate } from '../../../api/axios';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setAuth } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    setError('');
  }, [email, password]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!email || !password) {
        return;
      }
      const { data } = await axiosPrivate.post('sessions', { email, password }) as { data: { id: string, accessToken: string }};
      // localStorage.setItem('user', JSON.stringify({ id: data.id }));
      setAuth(data);
      navigate('/');
    } catch (e: any) {
      console.log(e.message);
      console.log(e.response.message);
      setError('Sorry. Something went wrong. Please try again later.');
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h2>Login to your account</h2>
      <label>Email:
        <input type="email"
               value={ email }
               onChange={ e => setEmail(e.target.value) }
               required />
      </label>

      <label>Password:
        <input type="password"
               value={ password }
               onChange={ e => setPassword(e.target.value) }
               required />
      </label>


      <button type="submit"
              disabled={ !email || !password || !!error }>Login
      </button>

      { error && <p className="error">{ error }</p> }

    </form>
  );
};