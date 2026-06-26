import { useEffect, useState } from "react";
import { BiMapPin, BiSearch, BiChevronDown } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { UseAppData } from "../context/AppContext";

const Navbar = () => {
  const { isAuth, city } = UseAppData();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const isHome = location.pathname === "/";

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams(search ? { search } : {});
    }, 500);
    return () => clearTimeout(timer);
  }, [search, setSearchParams]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center gap-8 p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-orange-500">
          The Wiggy
        </Link>

        {/* Location */}
        {isHome && (
          <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
            <BiMapPin className="text-orange-500" />
            <span>{city || "Search location"}</span>
            <BiChevronDown className="text-orange-500" />
          </div>
        )}

        {/* Search Bar */}
        {isHome && (
          <div className="flex flex-1 items-center gap-2 rounded-lg border bg-gray-50 px-4 py-2">
            <BiSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish"
              className="w-full bg-transparent text-sm placeholder:text-gray-400 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative">
            <CgShoppingCart size={22} className="text-gray-700" />
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              0
            </span>
          </Link>

          {isAuth ? (
            <Link
              to="/profile"
              className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-orange-500"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
