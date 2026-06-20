import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../services/auth.services";
import { setToken } from "../utils/storage";
import { useState } from "react";


export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const triggerGoogleLogin = useGoogleLogin({
    flow:"auth-code",
    onSuccess: async(codeResponse) => {
      setIsLoading(false);
      setError(null);
      console.log("codeResponse -> ", codeResponse);
      const coderes = codeResponse;
      try {
        const data = await loginWithGoogle({code : coderes.code });
        console.log("reading data from useGoogel Auth : ", data)
        setToken(data.token);
        console.log("Reading token from useGoogleAuth: ", data.token);
        navigate("/");
      } catch (error) {
        console.error("Backend authentication failed:", error);
        setError('Failed to authenticate with our servers. Please try again.');
      }finally{
        setIsLoading(false);
      }
  
    },
    onError: (errorResponse) => {
      console.error("Google popup failed:", errorResponse);
      setError('Google login was closed or failed.');
    },
  });
  return { 
    triggerGoogleLogin, 
    isLoading, 
    error 
  };
} 