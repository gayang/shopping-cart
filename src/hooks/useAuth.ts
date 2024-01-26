import { useEffect, useState } from 'react';
import * as auth from '../components/AuthContext';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(auth.isAuthenticated());
  }, []);

  return isLoggedIn;
};
export default useAuth;