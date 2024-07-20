import { useEffect, useState } from 'react';
import { verify } from '../../services/api/apiAuth';
import Cookies from 'js-cookie';
import useLoading from '../../hooks/useLoading';
import useMessage from '../../hooks/useMessage';
import ButtonSubmit from "../ButtonSubmit";
import Alert from '../Alert';
import { decryptData } from '../../utils/cookieHelper';

const Verify = ({ onFormChange, mode }) => {
  // Custom hooks for managing loading state and showing messages
  const { message, type, showMessage } = useMessage();
  const [loading, withLoading] = useLoading();
  
  // State to manage verification credentials (email and OTP)
  const [credentials, setCredentials] = useState({
    email: '',
    otp: '',
  });

  // Fetch email from cookies on component mount
  useEffect(() => {
    const emailFromCookie = Cookies.get('email');
    let emailData = null;
    if(emailFromCookie) {
      emailData = decryptData(emailFromCookie);
    }

    if (emailData) {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        email: emailData,
      }));
    }
  }, []);

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  // Handle form submission for OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    withLoading(async () => {
      try {
        const result = await verify(credentials);
        showMessage(result.message, 'success');
        if (mode === 'register') {
          onFormChange('login'); // Redirect to login if registration mode
        } else if (mode === 'forgotpassword') {
          onFormChange('newpassword'); // Redirect to new password if forgot password mode
        }
      } catch (error) {
        showMessage(error.message, 'error');
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      {/* Display alert messages */}
      <Alert message={message} status={type} />
      
      {/* OTP Verification Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <p className="w-full font-bold text-2xl text-center">Verify OTP</p>
        <div className="space-y-2">
          <label htmlFor="otp" className="block">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={credentials.otp}
            onChange={handleChange}
            required
            autoComplete="current-otp"
            placeholder="Enter OTP"
            className="w-full border-2 border-purple rounded-md outline-none p-2 focus:outline-2 focus:outline-purple"
          />
        </div>
        
        {/* Submit button with loading state */}
        <ButtonSubmit loading={loading}>Check</ButtonSubmit>
      </form>
      
      {/* Link to return to login */}
      <button
        type="button"
        onClick={() => onFormChange('login')}
        className="hover:text-purple hover:text-opacity-90 active:text-opacity-50"
      >
        Back to Login
      </button>
    </div>
  );
};

export default Verify;