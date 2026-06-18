import axios from "axios";
import type { GoogleAuthPayload } from "../types/auth";

const API_BASE_URL = import.meta.env.VITE_AUTH_SERVICE_URL || '';

export const loginWithGoogle = async(payload: GoogleAuthPayload) => {
  const googleResponse = await axios.post(
    `${API_BASE_URL}/api/v0/auth/login-google`,
    payload
  );
  return googleResponse.data;
}
