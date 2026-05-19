import { useEffect, useState } from "react";
import { fetchSepcificCategory } from "../api/api.ts";
import { useCart } from "../context/CartContext";
import { useParams } from "react-router";
import type { Products } from "../types/type";

export function CategoryPage() {
  const { addToCart } = useCart();
  const { categoryName } = useParams<{ categoryName: string }>();
  const [data, setData] = useState<Products[]>([]);

  useEffect(() => {
    async function getSpecificProduct() {
      if (!categoryName) return;
      const data = await fetchSepcificCategory(categoryName);
      setData(data);
    }
    getSpecificProduct();
  }, [categoryName]);

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
        {categoryName?.replace(/-/g, " ")}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
          >
            <div className="bg-gray-50 h-40 flex items-center justify-center p-3">
              <img
                src={p.thumbnail}
                alt={p.title}
                className="h-full object-contain"
              />
            </div>

            <div className="p-3 flex flex-col gap-2">
              <span className="text-sm font-bold text-gray-800 line-clamp-2">
                {p.title}
              </span>
              <span className="text-xs text-gray-400 line-clamp-2">
                {p.description}
              </span>

              <button
                onClick={() => addToCart(p)}
                className="cursor-pointer mt-1 self-start bg-[#f0eeff] text-[#6c5ce7] border border-[#d6cfff] rounded-full px-4 py-1 text-sm font-bold hover:bg-[#6c5ce7] hover:text-white transition-colors"
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
