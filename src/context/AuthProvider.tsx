import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface State {
  id: string;
  accessToken: string;
}

export const AuthContext = createContext<{ auth: State | null, setAuth: Dispatch<SetStateAction<State | null>> }>({  auth: null, setAuth: () => {}});

interface Props {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {

  const [auth, setAuth] = useState<State | null>(null);

  return (
    <AuthContext.Provider value={ { auth, setAuth } }>
      { children }
    </AuthContext.Provider>
  );
};