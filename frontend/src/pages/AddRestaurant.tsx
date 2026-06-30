import { useState, useRef } from "react";
import { UseAppData } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import { BiImageAdd, BiStore, BiPhone, BiMap } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const RESTAURANT_BASE_URL =
  import.meta.env.VITE_RESTAURANT_SERVICE_URL || "http://localhost:5001";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { location } = UseAppData();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Restaurant name is required";
    if (!description.trim()) errs.description = "Description is required";
    if (!phone.trim()) errs.phone = "Phone is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmit(true);
    console.log("Submitting..."); // Add this

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("phone", phone);
    formData.append("latitude", location?.latitude?.toString() || "");
    formData.append("longitude", location?.longitude?.toString() || "");
    formData.append("formattedAddress", location?.formattedAddress || "");
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        `${RESTAURANT_BASE_URL}/api/v0/restaurants`,
        formData,
        {
          withCredentials: true,
          timeout: 30000,
        },
      );
      if (response.status === 201) {
        toast.success("Restaurant added successfully!");
        navigate("/restaurants");
        console.log("response of restaurant add -> ", response);
        setName("");
        setDescription("");
        setPhone("");
        setImage(null);
        setPreview("");
      }
    } catch (error: any) {
      const message =
        error?.code === "ECONNABORTED"
          ? "The request timed out. Please try again."
          : error.response?.data?.message ||
            "Failed to add restaurant. Please try again.";
      toast.error(message);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg space-y-5 rounded-2xl bg-white p-6 shadow-sm"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Add Your Restaurant
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the details to get started
          </p>
        </div>

        {/* Image Upload */}
        <div
          onClick={() => fileRef.current?.click()}
          className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-orange-500 hover:bg-orange-50"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-40 w-full rounded-lg object-cover"
            />
          ) : (
            <>
              <BiImageAdd className="text-4xl text-gray-400" />
              <span className="text-sm font-medium text-gray-500">
                Upload restaurant image
              </span>
              <span className="text-xs text-gray-400">Click to browse</span>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            hidden
          />
        </div>

        {/* Name */}
        <div>
          <div className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2">
            <BiStore className="text-gray-400" size={18} />
            <input
              placeholder="Restaurant name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent text-sm placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          {errors.name && (
            <p className="mt-1 pl-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="Description (cuisine, specialities, etc.)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-lg border bg-gray-50 p-3 text-sm placeholder:text-gray-400 focus:border-orange-500 focus:outline-none"
          />
          {errors.description && (
            <p className="mt-1 pl-1 text-xs text-red-500">
              {errors.description}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <div className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2">
            <BiPhone className="text-gray-400" size={18} />
            <input
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent text-sm placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 pl-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Location (read-only) */}
        {location?.formattedAddress && (
          <div className="flex items-center gap-2 rounded-lg border bg-orange-50 px-3 py-2">
            <BiMap className="text-orange-500" size={18} />
            <span className="text-sm text-gray-700 truncate">
              {location.formattedAddress}
            </span>
          </div>
        )}

        <button
          onClick={() => console.log("Button clicked")}
          type="submit"
          disabled={submit}
          className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submit ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Adding Restaurant...
            </span>
          ) : (
            "Add Restaurant"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
