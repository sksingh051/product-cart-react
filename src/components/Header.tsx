import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
  const { cartCount, openCart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("search")) {
      setSearchQuery("");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      navigate("/");  
      return;
    }

    const timer = setTimeout(() => {
      navigate(`/search?q=${searchQuery}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between gap-4">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-[#6c5ce7] min-w-fit cursor-pointer"
        >
          Mini Shop
        </h1>

        {/* search bar */}
        <div className="flex-1 max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full border border-gray-200 rounded-full px-5 py-2 text-sm text-gray-700 outline-none focus:border-[#6c5ce7] transition-colors"
          />
        </div>

        <button
          onClick={openCart}
          className="cursor-pointer flex items-center gap-2 bg-[#6c5ce7] text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-[#5a4bd1] transition-colors min-w-fit"
        >
          🛒 Cart
          <span className="bg-white text-[#6c5ce7] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
}
