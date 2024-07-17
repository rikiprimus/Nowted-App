import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import backgroundlayer from "../assets/backgroundlayer.png";
import logodark from "../assets/logodark.svg";
import Login from "../components/Forms/Login";
import Register from "../components/Forms/Register";
import ForgotPassword from "../components/Forms/ForgotPassword";
import NewPassword from "../components/Forms/NewPassword";
import Verify from "../components/Forms/Verify";

const Auth = () => {
  const [form, setForm] = useState('login'); // State to manage which form to display
  const [initialMode, setInitialMode] = useState(''); // State to manage initial mode for Verify component

  // Function to handle form changes and initial mode setting
  const handleFormChange = (type, from) => {
    setForm(type); // Set the form type (login, register, forgotpassword, newpassword, verify)
    setInitialMode(from); // Set the initial mode for Verify component if applicable
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      {/* Background image */}
      <div className="absolute -z-20 inset-0">
        <img
          className="h-full w-full object-cover"
          src={backgroundlayer}
          alt="Background"
        />
      </div>
      {/* Overlay with color and blur effect */}
      <div className="absolute inset-0 -z-10 bg-opacity-40 bg-dark-1 backdrop-blur-lg"></div>

      {/* Authentication form container */}
      <div className="w-[500px] flex flex-col items-center gap-5 bg-light-background rounded-lg p-8">
        <img src={logodark} alt="Logo" className="w-[150px]" />
        {/* Render different forms based on the 'form' state */}
        {form === 'login' ? (
          <Login onFormChange={handleFormChange} />
        ) : form === 'register' ? (
          <Register onFormChange={handleFormChange} />
        ) : form === 'forgotpassword' ? (
          <ForgotPassword onFormChange={handleFormChange} />
        ) : form === 'newpassword' ? (
          <NewPassword onFormChange={handleFormChange} />
        ) : (
          <Verify onFormChange={handleFormChange} mode={initialMode} />
        )}
      </div>
    </div>
  );
};

export default Auth;
