import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      navigate('/home')
    }
  }, [token, navigate]);

  return children;
}

export default ProtectedRoute