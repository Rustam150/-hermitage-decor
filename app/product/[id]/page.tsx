"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, ShoppingCart, Zap, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import QuickOrderModal from "@/components/QuickOrderModal";

// Моковые данные товаров
const productsData: Record<number, any> = {
  1: {
    id: 1,
    name: "Кровать Татьяна",
    price: 49990,
    oldPrice: 69990,
    category: "Спальня",
    slug: "spalnya",
    brand: "Италия",
    material: "массив дуба",
    country: "Италия",
    inStock: true,
    description: "Элегантная кровать из массива дуба с мягким изголовьем. Идеально подходит для классической спальни. Размеры: 160x200 см.",
    images: ["", "", ""],
    specs: {
      "Размер спального места": "160x200 см",
      "Материал": "массив дуба",
      "Обивка": "велюр",
      "Цвет": "бежевый",
      "Страна производства": "Италия",
      "Гарантия": "24 месяца"
    }
  },
  2: {
    id: 2,
    name: "Шкаф Верона",
    price: 89900,
    category: "Спальня",
    slug: "spalnya",
    brand: "Турция",
    material: "ЛДСП",
    country: "Турция",
    inStock: true,
    description: "Вместительный шкаф-купе с зеркальными дверями. Три отделения, штанга для плечиков и выдвижные ящики.",
    images: ["", "", ""],
    specs: {
      "Размеры": "200x60x240 см",
      "Материал": "ЛДСП",
      "Цвет": "венге",
      "Страна производства": "Турция",
      "Гарантия": "12 месяцев"
    }
  },
  3: {
    id: 3,
    name: "Тумба Лондон",
    price: 15900,
    category: "Спальня",
    slug: "spalnya",
    brand: "Италия",
    material: "массив",
    country: "Италия",
    inStock: false,
    description: "Стильная прикроватная тумба с двумя ящиками. Отличное решение для хранения мелочей.",
    images: ["", "", ""],
    specs: {
      "Размеры": "50x40x50 см",
      "Материал": "массив",
      "Цвет": "орех",
      "Страна производства": "Италия",
      "Гарантия": "12 месяцев"
    }
  },
  4: {
    id: 4,
    name: "Комод Николь",
    price: 34900,
    category: "Спальня",
    slug: "spalnya",
    brand: "Китай",
    material: "МДФ",
    country: "Китай",
    inStock: true,
    description: "Четырёхсекционный комод с плавными фасадами. Подходит для спальни или гостиной.",
    images: ["", "", ""],
    specs: {
      "Размеры": "80x45x90 см",
      "Материал": "МДФ",
      "Цвет": "белый",
      "Страна производства": "Китай",
      "Гарантия": "12 месяцев"
    }
  },
  5: {
    id: 5,
    name: "Зеркало Венеция",
    price: 8900,
    category: "Спальня",
    slug: "spalnya",
    brand: "Италия",
    material: "стекло",
    country: "Италия",
    inStock: true,
    description: "Настенное зеркало в резной деревянной раме. Придаст шарм любому интерьеру.",
    images: ["", "", ""],
    specs: {
      "Размеры": "60x90 см",
      "Материал рамы": "дерево",
      "Страна производства": "Италия",
      "Гарантия": "6 месяцев"
    }
  },
  6: {
    id: 6,
    name: "Кровать София",
    price: 69900,
    oldPrice: 89900,
    category: "Спальня",
    slug: "spalnya",
    brand: "Турция",
    material: "массив",
    country: "Турция",
    inStock: true,
    description: "Современная кровать с мягким изголовьем и подсветкой. Размеры: 180x200 см.",
    images: ["", "", ""],
    specs: {
      "Размер спального места": "180x200 см",
      "Материал": "массив",
      "Обивка": "экокожа",
      "Цвет": "серый",
      "Страна производства": "Турция",
      "Гарантия": "24 месяца"
    }
  }
};

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const product = productsData[Number(id)];
  const liked = isFavorite(product?.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-2">Товар не найден</h1>
          <a href="/" className="text-gray-500 hover:text-black">Вернуться на главную</a>
        </div>
      </div>
    );
  }

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: ""
    });
  };

  const toggleFavorite = () => {
    if (liked) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        image: ""
      });
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* КНОПКА НАЗАД */}
        <div className="mb-4">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
          >
            ← Назад к товарам
          </button>
        </div>

        {/* Хлебные крошки */}
        <div className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-black">Главная</a> /{" "}
          <a href={`/catalog/${product.slug}`} className="hover:text-black">
            {product.category}
          </a> /{" "}
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Левая колонка — фото */}
          <div className="lg:w-1/2">
            <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
              🖼️ Фото товара
            </div>
            <div className="flex gap-3 mt-4">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`w-20 h-20 bg-gray-100 rounded-lg ${mainImage === idx ? 'ring-2 ring-gray-900' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Правая колонка — информация */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-light text-gray-900 mb-2">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-semibold text-gray-900">
                {product.price.toLocaleString()} ₽
              </span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {product.oldPrice.toLocaleString()} ₽
                </span>
              )}
              {product.oldPrice && (
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              )}
            </div>

            <div className="mb-4">
              {product.inStock ? (
                <span className="text-green-600 text-sm">✓ В наличии</span>
              ) : (
                <span className="text-red-500 text-sm">✗ Нет в наличии</span>
              )}
            </div>

            {/* Выбор количества */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-gray-700">Количество:</span>
              <div className="flex items-center border border-gray-400 rounded-lg">
                <button 
                  onClick={decreaseQuantity} 
                  className="px-3 py-1.5 hover:bg-gray-100 text-gray-900 font-medium"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-gray-900 font-medium">{quantity}</span>
                <button 
                  onClick={increaseQuantity} 
                  className="px-3 py-1.5 hover:bg-gray-100 text-gray-900 font-medium"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                В корзину
              </button>
              <button
                onClick={toggleFavorite}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* КНОПКА БЫСТРОГО ЗАКАЗА — ОБНОВЛЕНА */}
            <button
              onClick={() => setIsQuickOrderOpen(true)}
              className="w-full mb-8 border border-gray-900 text-gray-900 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Быстрый заказ (1 клик)
            </button>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Описание</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Характеристики</h3>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-100">
                      <td className="py-2 text-gray-500 w-1/3">{key}</td>
                      <td className="py-2 text-gray-800">{value as string}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО БЫСТРОГО ЗАКАЗА */}
      <QuickOrderModal
        isOpen={isQuickOrderOpen}
        onClose={() => setIsQuickOrderOpen(false)}
        product={{
          id: product.id,
          name: product.name,
          price: product.price
        }}
      />
    </div>
  );
}