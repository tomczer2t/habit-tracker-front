import { axios } from '../api/axios';
import { useAuth } from './useAuth';

export const useRefresh = () => {

  const { setAuth } = useAuth();

  return async function () {
    try {
      const { data } = await axios.patch('sessions', {}, { withCredentials: true }) as { data: string };
      setAuth(prev => {
        if (!prev) return prev;
        return { ...prev, accessToken: data };
      });
      return data;
    } catch (e) {
      console.log('zrobic logout, error: ', e);
      return null;
    }
  };
};