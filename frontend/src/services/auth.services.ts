import axios from "axios";
import type { GoogleAuthPayload, AuthResponse, ApiResponse } from "../types/auth";

const API_BASE_URL = import.meta.env.VITE_AUTH_SERVICE_URL || "";

export const loginWithGoogle = async (payload: GoogleAuthPayload) => {
  const googleResponse = await axios.post<ApiResponse<AuthResponse>>(
    `${API_BASE_URL}/api/v0/auth/login-google`,
    payload,
    { withCredentials: true },
  );
  console.log("googleResponse.data -> ", googleResponse.data);
  return googleResponse.data.data;
};

