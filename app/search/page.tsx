"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

// Моковые товары (все товары со всего сайта)
const allProducts = [
  { id: 1, name: "Кровать Татьяна", price: 49990, oldPrice: 69990, brand: "Италия", material: "массив", inStock: true },
  { id: 2, name: "Шкаф Верона", price: 89900, brand: "Турция", material: "ЛДСП", inStock: true },
  { id: 3, name: "Тумба Лондон", price: 15900, brand: "Италия", material: "массив", inStock: false },
  { id: 4, name: "Комод Николь", price: 34900, brand: "Китай", material: "МДФ", inStock: true },
  { id: 5, name: "Зеркало Венеция", price: 8900, brand: "Италия", material: "стекло", inStock: true },
  { id: 6, name: "Кровать София", price: 69900, oldPrice: 89900, brand: "Турция", material: "массив", inStock: true },
  { id: 7, name: "Стол обеденный", price: 24900, brand: "Италия", material: "массив", inStock: true },
  { id: 8, name: "Диван угловой", price: 129900, oldPrice: 159900, brand: "Турция", material: "ткань", inStock: true },
  { id: 9, name: "Постельное белье", price: 4990, brand: "Турция", material: "хлопок", inStock: true },
  { id: 10, name: "Свеча ароматическая", price: 890, brand: "Италия", material: "воск", inStock: true },
  { id: 11, name: "Диффузор", price: 1290, brand: "Италия", material: "стекло", inStock: true },
  { id: 12, name: "Плед", price: 2990, oldPrice: 4990, brand: "Китай", material: "шерсть", inStock: true },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  // Фильтрация товаров по поисковому запросу
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Кнопка назад */}
        <div className="mb-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
          >
            ← На главную
          </a>
        </div>

        <h1 className="text-3xl font-light text-gray-900 mb-6">Поиск</h1>

        {/* Форма поиска */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Что ищем?"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-gray-900 placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Найти
            </button>
          </div>
        </form>

        {/* Результаты */}
        {query && (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Найдено: {filteredProducts.length} товаров по запросу "{query}"
            </p>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Ничего не найдено</p>
                <p className="text-sm text-gray-400 mt-2">
                  Попробуйте изменить поисковый запрос
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    image=""
                    isNew={false}
                    isSale={!!product.oldPrice}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {!query && (
          <div className="text-center py-12 text-gray-400">
            Введите поисковый запрос
          </div>
        )}
      </div>
    </div>
  );
}