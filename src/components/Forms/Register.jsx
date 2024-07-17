import React, { useState } from "react";
import { register } from "../../services/api/apiAuth";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import useLoading from "../../hooks/useLoading";
import useMessage from "../../hooks/useMessage";
import Alert from "../Alert";
import ButtonSubmit from "../ButtonSubmit";

const Register = ({ onFormChange }) => {
  const { message, type, showMessage } = useMessage();
  const [loading, withLoading] = useLoading();
  const [credentials, setCredentials] = useState({
    name: "",
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
        const result = await register(credentials);
        showMessage(result.message, "success");
        onFormChange("verify", "register");
      } catch (error) {
        showMessage(error.message, "error");
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <Alert message={message} status={type} />
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <p className="w-full font-bold text-2xl text-center">Sign-Up</p>
        <div className="space-y-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            required
            autoComplete="current-name"
            placeholder="Enter your name"
            className="w-full border-2 border-purple rounded-md outline-none p-2 focus:outline-2 focus:outline-[#818cf8]"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            autoComplete="current-email"
            placeholder="Enter your email"
            className="w-full border-2 border-purple rounded-md outline-none p-2 focus:outline-2 focus:outline-[#818cf8]"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            className="w-full border-2 border-purple rounded-md outline-none p-2 focus:outline-2 focus:outline-[#818cf8]"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => onFormChange("verify", "register")}
            className="hover:text-purple hover:text-opacity-90 active:text-opacity-50"
          >
            Verify
          </button>
          <button
            type="button"
            onClick={() => onFormChange("login")}
            className="hover:text-purple hover:text-opacity-90 active:text-opacity-50"
          >
            Already have an account?
          </button>
        </div>
        <ButtonSubmit loading={loading}>Register</ButtonSubmit>
      </form>
      <div className="space-y-4 pb-14">
        <p className="w-full font-semibold text-center">Register with others:</p>
        <button className="w-[250px] flex items-center justify-center gap-4 border border-purple border-opacity-40 p-2 rounded-full hover:bg-purple hover:text-white active:bg-opacity-40">
          <img src={google} alt="logo" className="w-6" />
          <p>Register with Google</p>
        </button>
        <button className="w-[250px] flex items-center justify-center gap-4 border border-purple border-opacity-40 p-2 rounded-full hover:bg-purple hover:text-white active:bg-opacity-40">
          <img src={facebook} alt="logo" className="w-6" />
          <p>Register with Facebook</p>
        </button>
      </div>
    </div>
  );
};

export default Register;
