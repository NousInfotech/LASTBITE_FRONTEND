import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/auth"; // Replace 'localhost' with your machine's IP for physical devices

// Request OTP
export const requestOtp = async (mobileNumber) => {
  try {
    const response = await axios.post(`${BASE_URL}/request-otp`, {
      mobileNumber,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error requesting OTP:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
};

// Login or Signup
export const loginOrSignup = async (mobileNumber, otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/login-signup`, {
      mobileNumber,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error during login/signup:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
};

// Update User
export const updateUser = async (userId, name, email) => {
  try {
    const response = await axios.post(`${BASE_URL}/update-user`, {
      userId,
      name,
      email,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
};
