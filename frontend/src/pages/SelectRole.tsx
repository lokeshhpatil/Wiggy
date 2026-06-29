import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserRole } from "../services/auth.services";
import { UseAppData } from "../context/AppContext";
import type { Role } from "../types/auth";

const SelectRole = () => {
  const allowedRoles: Role[] = ["user", "restaurant", "rider", "admin"];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const navigate = useNavigate();
  const { setUser } = UseAppData();

  const addRole = async (role: Role) => {
    try {
      const data = await updateUserRole(role);
      console.log("Role added successfully:", data);
      return data;
    } catch (error) {
      console.error("Error adding role:", error);
      throw error;
    }
  };
  const handleSubmit = async () => {
    if (!selectedRole || loading) return;

    setLoading(true);
    setError(null);
    try {
      const data = await addRole(selectedRole);
      console.log("setUser(data.updatedRole);", data.updatedRole.role);
      if (data?.updatedRole) {
        setUser((prevUser) => ({
          ...prevUser,
          ...data.updatedRole,
          role: data.updatedRole.role,
        }));
      }
      navigate("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update role. Please try again.";
      setError(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Select Your Role
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          Choose how you want to continue
        </p>

        <div className="mt-8 space-y-3">
          {allowedRoles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                selectedRole === role
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium capitalize">{role}</span>

                {selectedRole === role && (
                  <span className="text-xl font-bold text-blue-600">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {selectedRole && (
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectRole;
