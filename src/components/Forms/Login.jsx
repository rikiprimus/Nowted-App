import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api/apiAuth";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import useLoading from "../../hooks/useLoading";
import useMessage from "../../hooks/useMessage";
import ButtonSubmit from "../ButtonSubmit";
import Alert from "../Alert";

const Login = ({ onFormChange }) => {
  const { message, type, showMessage } = useMessage();
  const [loading, withLoading] = useLoading();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    withLoading(async () => {
      try {
        await login(credentials);
        navigate("/home");
      } catch (error) {
        showMessage(error.message, "error");
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <Alert message={message} status={type} />
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <p className="w-full font-bold text-2xl text-center">Sign-In</p>
        <div className="space-y-2">
          <p>Email</p>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            autoComplete="current-email"
            placeholder="Enter email"
            className="w-full border-2 border-purple rounded-md outline-none p-2 focus:outline-2 focus:outline-[#818cf8]"
          />
        </div>
        <div className="space-y-2">
          <p>Password</p>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            placeholder="Enter Password"
            className="w-full border-2 border-purple rounded-md outline-none p-2 focus:outline-2 focus:outline-[#818cf8]"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => onFormChange("forgotpassword")}
            className="hover:text-purple active:text-opacity-50"
          >
            Forgot Password ?
          </button>
          <button
            type="button"
            onClick={() => onFormChange("register")}
            className="hover:text-purple active:text-opacity-50"
          >
            Sign-up !
          </button>
        </div>
        <ButtonSubmit loading={loading}>Login</ButtonSubmit>
      </form>
      <div className="space-y-4 pb-14">
        <p className="font-semibold text-center">Login with others:</p>
        <button className="w-[250px] flex items-center justify-center gap-4 border border-purple border-opacity-40 p-2 rounded-full hover:bg-purple hover:text-white active:bg-opacity-40">
          <img src={google} alt="Google logo" className="w-6" />
          <p>Login with Google</p>
        </button>
        <button className="w-[250px] flex items-center justify-center gap-4 border border-purple border-opacity-40 p-2 rounded-full hover:bg-purple hover:text-white active:bg-opacity-40">
          <img src={facebook} alt="Facebook logo" className="w-6" />
          <p>Login with Facebook</p>
        </button>
      </div>
    </div>
  );
};

export default Login;