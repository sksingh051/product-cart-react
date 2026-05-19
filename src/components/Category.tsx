import { useEffect, useState } from "react";
import { fetchCategoryList } from "../api/api.ts";
import { useNavigate } from "react-router";

const categoryIcons: Record<string, string> = {
  "smartphones":
    "https://img.icons8.com/?size=100&id=5wGnhtHODuE9&format=png&color=000000",
  "beauty":
    "https://img.icons8.com/?size=100&id=h3x8tX46HREw&format=png&color=000000",
  "laptops":
    "https://img.icons8.com/?size=100&id=dcP07MTsJKm9&format=png&color=000000",
  "fragrances":
    "https://img.icons8.com/?size=100&id=D6k1GtRhN1xM&format=png&color=000000",
  "skin-care":
    "https://img.icons8.com/?size=100&id=NBd55eSRdEJI&format=png&color=000000",
  "groceries":
    "https://img.icons8.com/?size=100&id=ifv6lIxUNvcj&format=png&color=000000",
  "home-decoration":
    "https://img.icons8.com/?size=100&id=6WmNGzM9j4eN&format=png&color=000000",
  "furniture":
    "https://img.icons8.com/?size=100&id=8GXfjQAEc8uB&format=png&color=000000",
  "tops": "https://img.icons8.com/?size=100&id=mkG6VZiQ2OBM&format=png&color=000000",
  "sports-accessories":
    "https://img.icons8.com/?size=100&id=SMjRXXIK5MOb&format=png&color=000000",
  "kitchen-accessories":
    "https://img.icons8.com/?size=100&id=0EK1_P46A7x6&format=png&color=000000",
  "womens-dresses":
    "https://img.icons8.com/?size=100&id=XvOeugltWB6v&format=png&color=000000",
  "womens-shoes":
    "https://img.icons8.com/?size=100&id=rV2nnJE9CsoS&format=png&color=000000",
  "mens-shirts":
    "https://img.icons8.com/?size=100&id=16596&format=png&color=000000",
  "mens-shoes":
    "https://img.icons8.com/?size=100&id=TiQuaZcBPUoI&format=png&color=000000",
  "mens-watches":
    "https://img.icons8.com/?size=100&id=zDcutukmjWLS&format=png&color=000000",
  "womens-watches":
    "https://img.icons8.com/?size=100&id=30396&format=png&color=000000",
  "womens-bags":
    "https://img.icons8.com/?size=100&id=sVJnI3XsHHih&format=png&color=000000",
  "womens-jewellery":
    "https://img.icons8.com/?size=100&id=sU0LIfdzT7WG&format=png&color=000000",
  sunglasses:
    "https://img.icons8.com/?size=100&id=cytStk1hmMEG&format=png&color=000000",
  vehicle:
    "https://img.icons8.com/?size=100&id=iCc4Jhkr6cRU&format=png&color=000000",
  motorcycle:
    "https://img.icons8.com/?size=100&id=iCc4Jhkr6cRU&format=png&color=000000",
  lighting:
    "https://img.icons8.com/?size=100&id=RpVMAmrJv4bu&format=png&color=000000",
  "mobile-accessories":
    "https://img.icons8.com/?size=100&id=EzOsXerB0C4t&format=png&color=000000",
    tablets : 
    "https://img.icons8.com/?size=100&id=AmTwHAmMSi1f&format=png&color=000000"
};

export default function Category() {
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategoryList().then((data) => {
      setCategoryList(data);
    });
  }, []);

  return (
    <div className="px-6 py-8">
     
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Shop by Category
      </h2>

      {/* Grid of cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categoryList.map((category) => (
          <div
          onClick={() => navigate(`/category/${category}`)}
          key={category}
          className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm border border-gray-100 cursor-pointer hover:border-[#6c5ce7] hover:shadow-md transition-all"
          >
            <img
              src={categoryIcons[category]}
              alt={category}
              className="w-10 h-10 object-contain"
            />
            <span className="text-sm font-medium text-gray-700 capitalize">
              {category.replace(/-/g, " ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}