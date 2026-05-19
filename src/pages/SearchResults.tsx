import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchedProduct } from "../api/api";
import type { Products } from "../types/type.ts";
import { useCart } from "../context/CartContext";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";  

  const { addToCart } = useCart();
  const [products, setProducts] = useState<Products[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query) return;

    setIsSearching(true);
    fetchSearchedProduct(query).then((data) => {
      setProducts(data);
      setIsSearching(false);
    });
  }, [query]);

  if (isSearching) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        Searching...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        No products found for {query}
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Results for {query}
        <span className="text-base font-normal text-gray-400 ml-2">
          ({products.length} items)
        </span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-gray-50 h-40 flex items-center justify-center p-3">
              <img src={p.thumbnail} alt={p.title} className="h-full object-contain" />
            </div>
            <div className="p-3 flex flex-col gap-2">
              <span className="text-sm font-bold text-gray-800 line-clamp-2">{p.title}</span>
              <span className="text-xs text-gray-400 line-clamp-2">{p.description}</span>
              <button
                onClick={() => addToCart(p)}
                className="mt-1 self-start bg-[#f0eeff] text-[#6c5ce7] border border-[#d6cfff] rounded-full px-4 py-1 text-sm font-bold hover:bg-[#6c5ce7] hover:text-white transition-colors"
              >
                🛒 ${p.price.toFixed(2)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}