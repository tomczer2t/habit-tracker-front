import { axios } from '../api/axios';
import { useAuth } from './useAuth';
import { useHabits } from './useHabits';

export const useRefresh = () => {

  const { setAuth } = useAuth();
  const { setHabits } = useHabits();

  return async function () {
    try {
      const { data } = await axios.patch('sessions', {}, { withCredentials: true }) as { data: string };
      setAuth(prev => {
        if (!prev) return prev;
        return { ...prev, accessToken: data };
      });
      return data;
    } catch (e) {
      await axios.delete('sessions', { withCredentials: true });
      localStorage.removeItem('user');
      setAuth(null);
      setHabits([]);
      return null;
    }
  };
};