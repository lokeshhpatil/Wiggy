import { useNavigate } from "react-router-dom";
import { UseAppData } from "../context/AppContext";
import {
  BiPackage,
  BiLogOut,
  BiUser,
  BiHeart,
  BiLocationPlus,
} from "react-icons/bi";

const Profile = () => {
  const { user, setIsAuth, setUser } = UseAppData();
  const navigate = useNavigate();
  const firstLetter = user?.name?.charAt(0).toUpperCase() || "";

  const handleLogout = () => {
    setIsAuth(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-md">
        {/* Profile Header */}
        <div className="rounded-2xl bg-white shadow-sm p-6 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white">
              {firstLetter}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
          <div
            onClick={() => navigate("/orders")}
            className="flex items-center gap-4 p-5 cursor-pointer hover:bg-orange-50 transition-colors border-b border-gray-100"
          >
            <BiPackage className="text-orange-500" size={22} />
            <span className="text-gray-700 font-medium">My Orders</span>
          </div>

          <div
            onClick={() => navigate("/favorites")}
            className="flex items-center gap-4 p-5 cursor-pointer hover:bg-orange-50 transition-colors border-b border-gray-100"
          >
            <BiHeart className="text-orange-500" size={22} />
            <span className="text-gray-700 font-medium">Favorites</span>
          </div>

          <div
            onClick={() => navigate("/edit-profile")}
            className="flex items-center gap-4 p-5 cursor-pointer hover:bg-orange-50 transition-colors border-b border-gray-100"
          >
            <BiUser className="text-orange-500" size={22} />
            <span className="text-gray-700 font-medium">Edit Profile</span>
          </div>

          <div
            onClick={() => navigate("/addresses")}
            className="flex items-center gap-4 p-5 cursor-pointer hover:bg-orange-50 transition-colors border-b border-gray-100"
          >
            <BiLocationPlus className="text-orange-500" size={22} />
            <span className="text-gray-700 font-medium">Addresses</span>
          </div>
          <div
            onClick={handleLogout}
            className="flex items-center gap-4 p-5 cursor-pointer hover:bg-red-50 transition-colors"
          >
            <BiLogOut className="text-red-500" size={22} />
            <span className="text-red-500 font-medium">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
