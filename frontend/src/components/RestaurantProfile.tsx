import { useState } from "react";
import type { RestaurantType } from "../types/auth";
import axios from "axios";
import { API_RESTAURANT_URL } from "../services/auth.services";
import toast from "react-hot-toast";
import { BiEdit, BiSave, BiStore, BiPhone, BiTime } from "react-icons/bi";

interface RestaurantProfileProps {
  restaurant: RestaurantType;
  isSeller: boolean;
  onUpdate: (restaurant: RestaurantType) => void;
}

const RestaurantProfile = ({
  restaurant,
  isSeller,
  onUpdate,
}: RestaurantProfileProps) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(restaurant.name);
  const [description, setDescription] = useState(restaurant.description);
  const [phone, setPhone] = useState<string>(
    restaurant.phone != null ? String(restaurant.phone) : ""
  );
  // const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(restaurant.isOpen ?? true);
  const [loading, setLoading] = useState(false);

  const toggleOpen = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API_RESTAURANT_URL}/api/v0/restaurants/status`,
        { status: !open },
        { withCredentials: true },
      );
      setOpen(!open);
      toast.success(`Restaurant ${!open ? "opened" : "closed"} successfully!`);
      onUpdate(data.restaurant);
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
      console.log(error, "in restaurant profile");
    } finally {
      setLoading(false);
    }
  };

  const saveChanges = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API_RESTAURANT_URL}/api/v0/restaurants`,
        { name, description, phone },
        { withCredentials: true },
      );
      toast.success("Restaurant updated successfully!");
      onUpdate(data.restaurant);
      setEditMode(false);
    } catch (error) {
      toast.error("Something went wrong! Try again.");
      console.log(error, "in restaurant profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-xl overflow-hidden rounded-2xl bg-white shadow-sm">
        {/* Restaurant Image */}
        {restaurant.image && (
          <div className="relative">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="h-52 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        <div className="space-y-4 p-6">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {editMode ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border p-2 text-lg font-semibold focus:border-orange-500 focus:outline-none"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-800">
                  {restaurant.name}
                </h2>
              )}
              <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                <BiStore size={14} />
                <span>
                  {restaurant.autoLocation?.formattedAddress ||
                    "Location unavailable"}
                </span>
              </div>
            </div>

            {isSeller && !editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="rounded-lg p-2 text-gray-400 hover:bg-orange-50 hover:text-orange-500"
              >
                <BiEdit size={20} />
              </button>
            )}
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  open ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {open ? "Open" : "Closed"}
            </span>
          </div>

          {/* Description */}
          {editMode ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-lg border p-3 text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-gray-600">
              {restaurant.description}
            </p>
          )}

          {/* Phone */}
          <div className="flex items-center gap-2">
            <BiPhone className="text-gray-400" size={16} />
            {editMode ? (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-lg border p-2 text-sm focus:border-orange-500 focus:outline-none"
              />
            ) : (
              <span className="text-sm text-gray-600">
                {restaurant.phone || "Phone not available"}
              </span>
            )}
          </div>

          {/* Created Date */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <BiTime size={14} />
            <span>
              Joined: {new Date(restaurant.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Action Buttons */}
          {isSeller && (
            <div className="flex gap-3 pt-4">
              {editMode && (
                <button
                  onClick={saveChanges}
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-50"
                >
                  <BiSave size={18} />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              )}
              <button
                onClick={toggleOpen}
                disabled={loading}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  open
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-green-50 text-green-600 hover:bg-green-100"
                }`}
              >
                {open ? "Close Restaurant" : "Open Restaurant"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
