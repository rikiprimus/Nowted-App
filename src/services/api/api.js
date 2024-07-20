import instance from "./axios";
import Cookies from 'js-cookie';
import { decryptData } from "../../utils/cookieHelper";

// Function to fetch all data
export async function fetchAll(url) {
  try {
    const response = await instance.get(url);
    return response.data?.data; // Return the data array from response
  } catch (error) {
    throw new Error(error.response?.data?.message); // Throw error with server message
  }
}

// Function to fetch data by ID or other parameter
export async function fetchBySomething(url, params) {
  try {
    const response = await instance.get(`${url}/${params}`);
    return response.data; // Return data from response
  } catch (error) {
    throw new Error(error.response?.data?.message); // Throw error with server message
  }
}

// Function to create new data
export async function create(url, data) {
  try {
    const response = await instance.post(url, data);
    return response.data; // Return data from response after creation
  } catch (error) {
    throw new Error(error.response?.data?.message); // Throw error with server message
  }
}

// Function to update existing data by ID
export async function update(url, id, data) {
  try {
    const response = await instance.put(`${url}/${id}`, data);
    return response.data; // Return data from response after update
  } catch (error) {
    throw new Error(error.response?.data?.message); // Throw error with server message
  }
}

// Function to delete data by ID
export async function deleted(url, id) {
  try {
    const response = await instance.delete(`${url}/${id}`);
    return response.data; // Return data from response after deletion
  } catch (error) {
    throw new Error(error.response?.data?.message); // Throw error with server message
  }
}

// Function to get cookie value by name
export function getCookie(name) {
  const cookieData = Cookies.get(name);
  if (cookieData) {
    return decryptData(cookieData);
  }
}