import { useEffect, useState } from "react";
import { fetchHeroProducts } from "../api/api";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

export default function HeroCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [current, setCurrent] = useState(0);

  // fetch products for carousel images
  useEffect(() => {
    fetchHeroProducts().then((data) => setProducts(data));
  }, []);
  
  // Image changes in every 2 seconds
  useEffect(() => {
    if (products.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 2000);

    //stop the timer when component unmounts
    return () => clearInterval(timer);
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="h-105 bg-gray-100 flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full h-156 overflow-hidden bg-gray-100">

      {/* SLIDES — all images stacked, only current one is visible */}
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`cursor-pointer absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* background image, blurred and zoomed */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
            style={{ backgroundImage: `url(${product.thumbnail})` }}
          />
          <div className="absolute inset-0 bg-black/40" />

         
          <img
            src={product.thumbnail}
            alt={product.title}
            className="absolute inset-0 m-auto max-h-80 max-w-125 object-contain drop-shadow-2xl"
          />

          <div className="absolute bottom-12 left-8">
            <p className="text-white text-3 xl font-bold drop-shadow">
              {product.title}
            </p>
            <p className="text-white/70 text-sm mt-1">
              Explore our collection
            </p>
          </div>
        </div>
      ))}

      {/* LEFT arrow */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + products.length) % products.length)}
        className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg transition-colors z-10"
      >
        ‹
      </button>

      {/* RIGHT arrow */}
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % products.length)}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg transition-colors z-10"
      >
        ›
      </button>

      {/* DOT indicators at the bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`cursor-pointer rounded-full transition-all ${
              index === current
                ? "bg-white w-6 h-2"   // active dot is wider
                : "bg-white/40 w-2 h-2" // inactive dot is small
            }`}
          />
        ))}
      </div>
    </div>
  );
}