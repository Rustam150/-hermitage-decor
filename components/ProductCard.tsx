"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
}

export default function ProductCard({
  id,
  name,
  price,
  oldPrice,
  image,
  isNew,
  isSale,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const liked = isFavorite(id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (liked) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ id, name, price, oldPrice, image });
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300">
      <a href={`/product/${id}`} className="block">
        <div className="relative bg-gray-100 rounded-t-xl overflow-hidden aspect-square">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              📷 Фото
            </div>
          )}

          <div className="absolute top-2 left-2 flex gap-2">
            {isNew && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded">
                Новинка
              </span>
            )}
            {isSale && oldPrice && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
              </span>
            )}
          </div>

          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-100 transition z-10"
          >
            <Heart
              className={`w-4 h-4 ${
                liked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>
      </a>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900">
          <a href={`/product/${id}`} className="hover:underline">
            {name}
          </a>
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-semibold text-gray-900">
            {price.toLocaleString()} ₽
          </span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {oldPrice.toLocaleString()} ₽
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart({ id, name, price, quantity: 1, image })}
          className="w-full mt-3 bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition"
        >
          В корзину
        </button>
      </div>
    </div>
  );
}