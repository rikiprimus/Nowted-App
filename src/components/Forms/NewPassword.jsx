import { useState, useEffect } from "react";
import { newpassword } from '../../services/api/apiAuth';
import Cookies from 'js-cookie';
import useLoading from "../../hooks/useLoading";
import useMessage from "../../hooks/useMessage";
import ButtonSubmit from "../ButtonSubmit";
import Alert from "../Alert";

const NewPassword = ({ onFormChange }) => {
  // Custom hooks for handling loading state and messages
  const { message, type, showMessage } = useMessage();
  const [loading, withLoading] = useLoading();
  
  // State to manage user credentials
  const [credentials, setCredentials] = useState({
    email: null,
    password: '',
  });

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    withLoading(async () => {
      try {
        const result = await newpassword(credentials);
        showMessage(result.message, 'success');
        onFormChange('login'); // Redirect to login form on successful password change
      } catch (error) {
        showMessage(error.message, 'error'); // Display error message if password change fails
      }
    });
  }

  // Fetch email from cookies on component mount
  useEffect(() => {
    const emailFromCookie = Cookies.get('email');
    if (emailFromCookie) {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        email: emailFromCookie,
      }));
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      {/* Display alert messages */}
      <Alert message={message} status={type} />
      
      {/* New Password Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <p className="w-full font-bold text-2xl text-center">New Password</p>
        <div className="space-y-2">
          <p>New Password</p>
          <input
            type="password" // Use "password" type for security reasons
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            placeholder="Masukkan Password Baru"
            className="w-full border-2 border-purple rounded-md outline-none p-2 focus:outline-2 focus:outline-[#818cf8]"
          />
        </div>
        {/* Submit button with loading state */}
        <ButtonSubmit loading={loading}>Change Password</ButtonSubmit>
      </form>
      
      {/* Button to navigate back to login form */}
      <button
        type="button"
        onClick={() => onFormChange("login")}
        className="hover:text-purple hover:text-opacity-90 active:text-opacity-50 pb-14"
      >
        Back to login?
      </button>
    </div>
  )
}

export default NewPassword;