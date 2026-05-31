"use client";

import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Верхняя шапка */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Верхняя строка: лого, поиск, иконки */}
          <div className="flex items-center justify-between gap-6 py-3">
            <Link href="/" className="shrink-0">
              <span className="text-xl font-light tracking-wide text-gray-800">
                HERMITAGE<span className="font-semibold">DECOR</span>
              </span>
            </Link>

            <form action="/search" method="GET" className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  name="q"
                  placeholder="Поиск товаров..."
                  className="w-full px-5 py-2.5 pr-12 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-400 hover:text-amber-500 transition" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-4 shrink-0">
              <Link href={user ? "/account" : "/login"} className="hidden md:flex flex-col items-center group">
                <User className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition" />
                <span className="text-[11px] text-gray-500 group-hover:text-amber-600 mt-0.5">
                  {user ? "Профиль" : "Войти"}
                </span>
              </Link>
              <Link href="/favorites" className="relative flex flex-col items-center group">
                <Heart className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition" />
                <span className="text-[11px] text-gray-500 group-hover:text-amber-600 mt-0.5">Избранное</span>
                {totalFavorites > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {totalFavorites}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="relative flex flex-col items-center group">
                <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition" />
                <span className="text-[11px] text-gray-500 group-hover:text-amber-600 mt-0.5">Корзина</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button className="md:hidden">
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Навигация (Каталог, Комнаты, Скидки, Бренды, Доставка) */}
          <nav className="hidden md:flex gap-8 py-2 text-sm font-medium text-gray-700 border-t border-gray-100">
            <a href="#" className="hover:text-amber-600 transition">Каталог</a>
            
            {/* КРАСИВОЕ БОЛЬШОЕ МЕНЮ "КОМНАТЫ" КАК У HOFF */}
            <div className="relative group">
              <button className="hover:text-amber-600 transition">Комнаты</button>
              <div className="absolute left-0 top-full mt-1 w-screen max-w-7xl bg-white shadow-2xl rounded-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Колонка 1: Спальня */}
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-4">Спальня</h4>
                      <ul className="space-y-2 text-sm">
                        <li><Link href="/catalog/spalnya" className="text-gray-600 hover:text-amber-600 block py-1">Все товары</Link></li>
                        <li><Link href="/catalog/spalnya?type=krovati" className="text-gray-600 hover:text-amber-600 block py-1">Кровати</Link></li>
                        <li><Link href="/catalog/spalnya?type=shkafy" className="text-gray-600 hover:text-amber-600 block py-1">Шкафы</Link></li>
                        <li><Link href="/catalog/spalnya?type=tumby" className="text-gray-600 hover:text-amber-600 block py-1">Тумбы</Link></li>
                        <li><Link href="/catalog/spalnya?type=komody" className="text-gray-600 hover:text-amber-600 block py-1">Комоды</Link></li>
                        <li><Link href="/catalog/spalnya?type=zerkala" className="text-gray-600 hover:text-amber-600 block py-1">Зеркала</Link></li>
                      </ul>
                    </div>

                    {/* Колонка 2: Гостиная */}
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-4">Гостиная</h4>
                      <ul className="space-y-2 text-sm">
                        <li><Link href="/catalog/gostinaya" className="text-gray-600 hover:text-amber-600 block py-1">Все товары</Link></li>
                        <li><Link href="/catalog/gostinaya?type=divany" className="text-gray-600 hover:text-amber-600 block py-1">Диваны</Link></li>
                        <li><Link href="/catalog/gostinaya?type=kresla" className="text-gray-600 hover:text-amber-600 block py-1">Кресла</Link></li>
                        <li><Link href="/catalog/gostinaya?type=stoly" className="text-gray-600 hover:text-amber-600 block py-1">Столы</Link></li>
                        <li><Link href="/catalog/gostinaya?type=stellazhi" className="text-gray-600 hover:text-amber-600 block py-1">Стеллажи</Link></li>
                      </ul>
                    </div>

                    {/* Колонка 3: Кухня */}
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-4">Кухня</h4>
                      <ul className="space-y-2 text-sm">
                        <li><Link href="/catalog/kuhnya" className="text-gray-600 hover:text-amber-600 block py-1">Все товары</Link></li>
                        <li><Link href="/catalog/kuhnya?type=garnitury" className="text-gray-600 hover:text-amber-600 block py-1">Гарнитуры</Link></li>
                        <li><Link href="/catalog/kuhnya?type=stoly" className="text-gray-600 hover:text-amber-600 block py-1">Столы</Link></li>
                        <li><Link href="/catalog/kuhnya?type=stulya" className="text-gray-600 hover:text-amber-600 block py-1">Стулья</Link></li>
                      </ul>
                    </div>

                    {/* Колонка 4: Столовая */}
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-4">Столовая</h4>
                      <ul className="space-y-2 text-sm">
                        <li><Link href="/catalog/stolovaya" className="text-gray-600 hover:text-amber-600 block py-1">Все товары</Link></li>
                        <li><Link href="/catalog/stolovaya?type=stoly" className="text-gray-600 hover:text-amber-600 block py-1">Столы</Link></li>
                        <li><Link href="/catalog/stolovaya?type=stulya" className="text-gray-600 hover:text-amber-600 block py-1">Стулья</Link></li>
                        <li><Link href="/catalog/stolovaya?type=bufety" className="text-gray-600 hover:text-amber-600 block py-1">Буфеты</Link></li>
                      </ul>
                    </div>

                  </div>

                  {/* Нижняя панель с акцией */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Link href="/catalog/skidki" className="flex items-center justify-between bg-amber-50 rounded-xl p-4 hover:bg-amber-100 transition">
                      <div>
                        <span className="font-semibold text-gray-900">Скидка до 50%</span>
                        <p className="text-sm text-gray-600">На товары для спальни</p>
                      </div>
                      <span className="text-amber-600">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <a href="#" className="hover:text-amber-600 transition">Скидки</a>
            <a href="#" className="hover:text-amber-600 transition">Бренды</a>
            <Link href="/delivery" className="hover:text-amber-600 transition">Доставка</Link>
          </nav>
        </div>
      </header>

      {/* Быстрые ссылки (категории) */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {[
              { name: "Спальня", slug: "spalnya" },
              { name: "Гостиная", slug: "gostinaya" },
              { name: "Столовая", slug: "stolovaya" },
              { name: "Кухня", slug: "kuhnya" },
              { name: "Мягкая мебель", slug: "myagkaya" },
              { name: "Посуда", slug: "posuda" },
              { name: "Ароматы", slug: "aromaty" },
              { name: "Текстиль", slug: "tekstil" },
              { name: "Новинки", slug: "novinki" },
              { name: "Скидки", slug: "skidki" },
            ].map((item) => (
              <Link
                key={item.name}
                href={`/catalog/${item.slug}`}
                className="text-center py-2 px-1 rounded-lg text-sm font-medium text-gray-700 hover:text-white hover:bg-amber-600 transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Блок акции */}
        <div className="relative rounded-2xl overflow-hidden mb-10 bg-gradient-to-r from-amber-800 to-amber-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 p-8 md:p-12">
            <div className="max-w-md">
              <span className="text-amber-200 text-sm font-medium tracking-wider"> ЛИМИТИРОВАННОЕ ПРЕДЛОЖЕНИЕ</span>
              <h2 className="text-3xl md:text-4xl font-light text-white mt-2">Акция месяца</h2>
              <p className="text-amber-100 text-lg mt-1">Скидка до 30% на мебель для спальни</p>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-white text-sm">27 апреля – 31 мая</span>
                <a href="/catalog/spalnya" className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
                  Выбрать →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Сетка акционных категорий */}
        <div className="mb-16">
          <h3 className="text-xl font-medium text-gray-900 mb-5">Выберите категорию</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Постельное белье", img: "https://ir.ozone.ru/s3/multimedia-j/6536829967.jpg", slug: "tekstil" },
              { name: "Свечи", img: "https://avatars.mds.yandex.net/i?id=c96f3de9f87a83029cec9c6d3996f8d9391c4f16-10707439-images-thumbs&n=13", slug: "aromaty" },
              { name: "Диффузоры", img: "https://avatars.mds.yandex.net/i?id=68c81801a0f3b87665746a7269d3103aa2ce91d3-10870819-images-thumbs&n=13", slug: "aromaty" },
              { name: "Кровати", img: "https://avatars.mds.yandex.net/i?id=d84d2b030715d79b153add41ade40b64b0c7979b-5492373-images-thumbs&n=13", slug: "spalnya" },
              { name: "Столы", img: "https://avatars.mds.yandex.net/i?id=822e37196bdebc4766cc14d5c7a3cc605fd0c938-8334793-images-thumbs&n=13", slug: "stolovaya" },
              { name: "Пледы", img: "https://avatars.mds.yandex.net/i?id=07a3c32afc7de8537d39de47b0999c0d5fef681b-7086169-images-thumbs&n=13", slug: "tekstil" },
              { name: "Посуда", img: "https://avatars.mds.yandex.net/i?id=56c49b8dd8e26c70af7fe7eca54bb3802baea5cc-10640350-images-thumbs&n=13", slug: "posuda" },
              { name: "Вазы", img: "https://avatars.mds.yandex.net/i?id=65c02b39a16c5d17b5bab65e079d9e7ba60e60d2-5233110-images-thumbs&n=13", slug: "posuda" },
              { name: "Подушки", img: "https://avatars.mds.yandex.net/i?id=a8cb661d113fbe4ac09e115f56445ef117930871-5087196-images-thumbs&n=13", slug: "tekstil" },
            ].map((item) => (
              <Link
                key={item.name}
                href={`/catalog/${item.slug}`}
                className="group text-center"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-gray-800 text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Популярные товары */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-medium text-gray-900">Популярные товары</h3>
            <a href="#" className="text-sm text-gray-500 hover:text-black">
              Смотреть все →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { id: 1, name: "Кровать Татьяна", price: 49990, oldPrice: 69990, isSale: true, image: "https://meb-online.ru/upload/resize_cache/iblock/6fa/530_530_140cd750bba9870f18aada2478b24840a/item_302.jpg" },
              { id: 2, name: "Шкаф Верона", price: 89900, isNew: true, image: "https://avatars.mds.yandex.net/i?id=6beb7a1db938847778774962d42c5b886a5a24cb-12752873-images-thumbs&n=13" },
              { id: 3, name: "Стол обеденный", price: 24900, image: "https://avatars.mds.yandex.net/i?id=a9db41ca0e5c9c028294ba5ccfe9091e4a00e8d6-5384958-images-thumbs&n=13" },
              { id: 4, name: "Диван угловой", price: 129900, oldPrice: 159900, isSale: true, image: "https://avatars.mds.yandex.net/i?id=ba34d7dc25e1ccda75769752993f507caad80892-3085767-images-thumbs&n=13" },
            ].map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                image={product.image}
                isNew={product.isNew}
                isSale={product.isSale}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}