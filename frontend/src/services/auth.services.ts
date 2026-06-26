import axios from "axios";
import type { GoogleAuthPayload, AuthResponse, ApiResponse } from "../types/auth";
// import { getToken } from "../utils/storage";
import { baseUrl } from '../config';

const API_BASE_URL = import.meta.env.VITE_AUTH_SERVICE_URL || baseUrl;

export const loginWithGoogle = async (payload: GoogleAuthPayload) => {
  const googleResponse = await axios.post<ApiResponse<AuthResponse>>(
    `${API_BASE_URL}/api/v0/auth/login-google`,
    payload,
    { withCredentials: true },
  );
  console.log("googleResponse.data -> ", googleResponse.data);
  return googleResponse.data.data;
};

export const updateUserRole = async (role: string) => {
  const response = await apiClient.put<ApiResponse<{ updatedRole: unknown; token: string }>>(
    "/api/v0/auth/add-role",
    { role },
  );
  return response.data.data;
};

export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// apiClient.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers = config.headers ?? {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });