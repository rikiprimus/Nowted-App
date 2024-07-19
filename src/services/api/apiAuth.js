import instance from './axios';
import Cookies from 'js-cookie';

// Function to log in
export async function login(credentials) {
  try {
    const response = await instance.post(`/auth/login`, credentials);
    const { token } = response?.data;

    // Save token to cookies with 7 days expiry
    Cookies.set('token', token, { expires: 7 });
    Cookies.set('user', JSON.stringify(response?.data?.data), { expires: 7 });

    return response?.data?.data; // Return user data after successful login
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

// Function to register
export async function register(credentials) {
  try {
    const response = await instance.post(`/auth/register`, credentials);
    const { email } = credentials;

    // Save email to cookies with 7 days expiry
    Cookies.set('email', email, { expires: 7 });

    return response?.data; // Return server response after successful registration
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

// Function to initiate forgot password process
export async function forgotpassword(credentials) {
  try {
    const response = await instance.post(`/auth/forgotpassword`, credentials);
    const { email } = credentials;

    // Save email to cookies with 7 days expiry
    Cookies.set('email', email, { expires: 7 });

    return response?.data?.data; // Return server response after initiating forgot password
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

// Function to set new password after reset
export async function newpassword(credentials) {
  try {
    const response = await instance.post(`/auth/newpassword`, credentials);
    return response?.data?.message; // Return server response after setting new password
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

// Function to verify OTP (One Time Password)
export async function verify(credentials) {
  try {
    const response = await instance.post(`/auth/verify`, credentials);
    return response?.data?.message; // Return server response after OTP verification
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

// Function to logout
export function logout() {
  const token = Cookies.get('token');

  if (token) {
    Cookies.remove('token', { path: '' });
    window.location.reload();
    return 'Token removed successfully';
  } else {
    return 'Token not found';
  }
}