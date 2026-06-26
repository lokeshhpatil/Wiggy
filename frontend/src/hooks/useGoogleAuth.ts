import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../services/auth.services";
// import { setToken } from "../utils/storage";
import { useState } from "react";
import toast from "react-hot-toast";
import { UseAppData } from "../context/AppContext";

export const useGoogleAuth = () => {

  const { setIsAuth, setUser } = UseAppData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const triggerGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      setIsLoading(false);
      setError(null);
      console.log("codeResponse -> ", codeResponse);
      const code = codeResponse.code;
      try {
        const data = await loginWithGoogle({ code });
        console.log("reading data from useGoogleAuth : ", data);
        // setToken(data.token);
        setUser(data.user);
        console.log("setUser(data.user);", data.user)
        setIsAuth(true);
        console.log("Reading token from useGoogleAuth: ", data.token);
        toast.success("Login Successful");
        navigate("/");
      } catch (error) {
        console.error("Backend authentication failed:", error);
        toast.error("Something went wrong.");
        setError("Failed to authenticate with our servers. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google popup failed:", errorResponse);
      setError("Google login was closed or failed.");
    },
  });
  return {
    triggerGoogleLogin,
    isLoading,
    error,
  };
}; 