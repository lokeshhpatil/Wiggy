import { useEffect, useState } from "react";
import type { RestaurantType } from "../types/auth";
import axios from "axios";

const RESTAURANT_BASE_URL =
  import.meta.env.VITE_RESTAURANT_SERVICE_URL || "http://localhost:5001";

const Restaurant = () => {
  const [, setRestaurant] = useState<RestaurantType | null>(null);
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const fetchRestaurant = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${RESTAURANT_BASE_URL}/api/v0/restaurants/`,
        { withCredentials: true },
      );
      console.log("restaurantData -> ", data);
      setRestaurant(data.data.restaurant);
    } catch (error) {
      console.log("Error fetching restaurant:", error);
      setError("Failed to fetch restaurant data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchRestaurant();
  }, []);

  return <div>Restaurant Page</div>;
};

export default Restaurant;
