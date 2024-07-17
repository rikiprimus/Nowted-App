import React, { useState, useEffect } from "react";
import { newpassword } from '../../services/api/apiAuth';
import Cookies from 'js-cookie';
import useLoading from "../../hooks/useLoading";
import useMessage from "../../hooks/useMessage";
import ButtonSubmit from "../ButtonSubmit";
import Alert from "../Alert";

const NewPassword = ({ onFormChange }) => {
  const { message, type, showMessage } = useMessage();
  const [loading, withLoading] = useLoading();
  const [credentials, setCredentials] = useState({
    email: null,
    password: '',
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
        const result = await newpassword(credentials)
        showMessage(result.message , 'success');
        onFormChange('login'); 
      } catch (error) {
        showMessage(error.message , 'error');
      }
    })
  }

  useEffect(() => {
    const emailFromCookie = Cookies.get('email');
    if (emailFromCookie) {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        email: emailFromCookie,
      }));
    }
  }, [])

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <Alert message={message} status={type} />
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <p className="w-full font-bold text-2xl text-center">New Password</p>
        <div className="space-y-2">
          <p>New Password</p>
          <input
            type="text"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            placeholder="Masukan Password Baru"
            className="w-full border-2 border-purple rounded-md outline-none p-2 focus:outline-2 focus:outline-[#818cf8]"
          />
        </div>
        <ButtonSubmit loading={loading}>Change Password</ButtonSubmit>
      </form>
      <button
        type="button"
        onClick={() => onFormChange("login")}
        className="hover:text-purple hover:text-opacity-90 active:text-opacity-50 pb-14"
      >
        back to login ?
      </button>
    </div>
  )
}

export default NewPassword