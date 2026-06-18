// import React from 'react'

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../main";
import { setToken } from "../utils/storage";
// import type { GoogleAuthPayload } from "../types/auth";

type GoogleAuthResult = {
  code: string;
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const googleResponse = async (authResult: GoogleAuthResult) => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${authService}/api/v0/auth/google-login`,
        {
          code: authResult["code"],
        },
      );
      console.log(`result.data.token: ${result.data.token}`);
      setToken(result.data.token);
    } catch (error) {
      console.log("Error while login using google authentication", error);
    } finally {
      setLoading(false);
    }
  };

  return <div className="text-black text-2xl">LoginPage</div>;
};

export default LoginPage;
