import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

export const RequireAuth = () => {

  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth)
    navigate('/login')
  }, [auth])

  return <Outlet />
}