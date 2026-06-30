import axios from "axios";
import type { GoogleAuthPayload, AuthResponse, ApiResponse, Role, UpdateRoleResponse } from "../types/auth";
import { baseUrl, restaurantBaseUrl } from '../config';

const API_BASE_URL = import.meta.env.VITE_AUTH_SERVICE_URL || baseUrl;
export const API_RESTAURANT_URL = import.meta.env.VITE_RESTAURANT_SERVICE_URL || restaurantBaseUrl

export const loginWithGoogle = async (payload: GoogleAuthPayload) => {
  const googleResponse = await axios.post<ApiResponse<AuthResponse>>(
    `${API_BASE_URL}/api/v0/auth/login-google`,
    payload,
    { withCredentials: true },
  );
  console.log("googleResponse.data -> ", googleResponse.data);
  return googleResponse.data.data;
};

export const updateUserRole = async (role: Role):Promise<UpdateRoleResponse> => {
  const response = await apiClient.put<ApiResponse<UpdateRoleResponse>>(
    "/api/v0/auth/role",
    { role },
  );
  return response.data.data;
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});