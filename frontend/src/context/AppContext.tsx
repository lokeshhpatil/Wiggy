import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser, Location, AppContextType } from "../types/auth";
import { apiClient } from "../services/auth.services";

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}
export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  const [location, setLocation] = useState<Location | null>(null);
  const [loadingLocation, setLocationLoading] = useState(true);
  const [city, setCity] = useState("Fetching city details...  ");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await apiClient.get("/api/v0/auth/profile");
        console.log("User profile data -> ", data);
        setUser(data.data);
        setIsAuth(true);
        setError(null);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsAuth(false);
        setUser(null);
        if (axios.isAxiosError(error)) {
          // Inside this block, TypeScript now guarantees 'error' has properties like 'response' and 'status'
          if (error.response?.status === 401) {
            setError(null);
          } else if (!error.response) {
            setError(
              "Cannot connect to the server. Please check your internet connection.",
            );
          } else {
            // You can even safely access the backend's specific error message if it exists
            setError(
              error.response.data?.message ||
                "An unexpected server error occurred.",
            );
          }
        } else if (error instanceof Error) {
          // Inside this block, TypeScript knows 'error' has a 'message' property
          setError(error.message);
        }
        // Step 4: The absolute fallback
        else {
          setError("An unexpected error occurred while loading your profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      return alert("Please Allow Location Access to use this app");
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      setLocationLoading(false);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        );
        const data = await response.json();
        console.log("Reverse geocoding data -> ", data);
        setLocation({
          latitude,
          longitude,
          formattedAddress: data.display_name || "Address not found",
        });
        setCity(
          data.address.city ||
            data.address.town ||
            data.address.village ||
            "City not found",
        );
        setCity(
          data.address.city ||
            data.address.town ||
            data.address.village ||
            "City not found",
        );
      } catch (error) {
        console.log("Error fetching city details:", error);
      }
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuth,
        setIsAuth,
        loading,
        setLoading,
        setUser,
        user,
        // Provide a non-null fallback so the context value matches AppContextType
        location: location ?? {
          latitude: 0,
          longitude: 0,
          formattedAddress: "",
        },
        city,
        loadingLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const UseAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    console.log("UseAppData must be used within an AppProvider");
    throw new Error("UseAppData must be used within an AppProvider");
  }
  return context;
};
