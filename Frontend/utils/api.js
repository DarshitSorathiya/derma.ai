import axios from "axios";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post("/api/users/register", userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};
