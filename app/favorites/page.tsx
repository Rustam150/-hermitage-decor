"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function FavoritesPage() {
  const { items, removeFromFavorites, totalFavorites } = useFavorites();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
            >
              ← На главную
            </Link>
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-8">Избранное</h1>
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">У вас пока нет избранных товаров</p>
            <Link href="/" className="mt-4 inline-block text-gray-900 underline">
              Перейти к покупкам
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
          >
            ← На главную
          </Link>
        </div>

        <h1 className="text-3xl font-light text-gray-900 mb-8">
          Избранное ({totalFavorites})
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((product) => (
            <div key={product.id} className="group relative">
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    {product.image || "📷 Фото"}
                  </div>
                  {product.oldPrice && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                      </span>
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromFavorites(product.id);
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-100 transition"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </Link>

              <div className="mt-3">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.id}`} className="hover:underline">
                    {product.name}
                  </Link>
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-semibold text-gray-900">
                    {product.price.toLocaleString()} ₽
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.oldPrice.toLocaleString()} ₽
                    </span>
                  )}
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                      image: product.image
                    })
                  }
                  className="w-full mt-3 bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}