import { useEffect, useState } from "react";
import type { RestaurantType } from "../types/auth";
import axios from "axios";
import Loading from "../components/Loading";
import AddRestaurant from "./AddRestaurant";
import RestaurantProfile from "../components/RestaurantProfile";
import { BiFoodMenu, BiPlusCircle, BiBarChart } from "react-icons/bi";

const RESTAURANT_BASE_URL =
  import.meta.env.VITE_RESTAURANT_SERVICE_URL || "http://localhost:5001";

type SellerTab = "menu" | "add-item" | "sales";

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<SellerTab>("menu");

  const fetchRestaurant = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${RESTAURANT_BASE_URL}/api/v0/restaurants/`,
        { withCredentials: true },
      );
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

  if (loading) return <Loading />;
  if (!restaurant) return <AddRestaurant />;

  const tabs = [
    { key: "menu", label: "Menu", icon: BiFoodMenu },
    { key: "add-item", label: "Add Item", icon: BiPlusCircle },
    { key: "sales", label: "Sales", icon: BiBarChart },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Profile */}
      <RestaurantProfile
        restaurant={restaurant}
        onUpdate={setRestaurant}
        isSeller={true}
      />

      {/* Tabs Section */}
      <div className="mx-auto mt-6 max-w-4xl px-4 pb-8">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          {/* Tab Buttons */}
          <div className="flex border-b border-gray-100">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key as SellerTab)}
                className={`flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition-all ${
                  tab === key
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {tab === "menu" && (
              <div className="text-center text-gray-400 py-8">
                <BiFoodMenu size={48} className="mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium">Menu Items</p>
                <p className="text-sm">Your menu items will appear here</p>
              </div>
            )}
            {tab === "add-item" && (
              <div className="text-center text-gray-400 py-8">
                <BiPlusCircle size={48} className="mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium">Add New Item</p>
                <p className="text-sm">Add items to your menu</p>
              </div>
            )}
            {tab === "sales" && (
              <div className="text-center text-gray-400 py-8">
                <BiBarChart size={48} className="mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium">Sales Dashboard</p>
                <p className="text-sm">Your sales analytics will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
