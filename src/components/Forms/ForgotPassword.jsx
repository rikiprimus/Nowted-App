import React, { useState } from "react";
import { forgotpassword } from "../../services/api/apiAuth";
import useLoading from "../../hooks/useLoading";
import useMessage from "../../hooks/useMessage";
import ButtonSubmit from "../ButtonSubmit";
import Alert from "../Alert";

const ForgotPassword = ({ onFormChange }) => {
  const { message, type, showMessage } = useMessage();
  const [loading, withLoading] = useLoading();
  const [credentials, setCredentials] = useState({
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    withLoading(async () => {
      try {
        const result = await forgotpassword(credentials)
        showMessage(result.message , 'success');
        onFormChange('verify', 'forgotpassword')
      } catch (error) {
        showMessage(error.message , 'error');
      }
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <Alert message={message} status={type} />
      <form onSubmit={handleSubmit} className="w-full space-y-8">
        <p className="w-full font-bold text-2xl text-center">Forgot Password</p>
        <div className="space-y-2">
          <p>Email</p>
          <input
            type="text"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            autoComplete="current-email"
            placeholder="Masukan email"
            className="w-full border-2 border-purple rounded-md outline-none p-2 focus:outline-2 focus:outline-[#818cf8]"
          />
        </div>
        <ButtonSubmit loading={loading}>Send Email</ButtonSubmit>
      </form>
      <button
        type="button"
        onClick={() => onFormChange("login")}
        className="hover:text-purple hover:text-opacity-90 active:text-opacity-50 pb-14"
      >
        back to login ?
      </button>
    </div>
  );
};

export default ForgotPassword;
