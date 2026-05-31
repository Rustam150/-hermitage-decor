"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const { user } = useAuth();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Верхняя строка: лого, поиск, иконки */}
        <div className="flex items-center justify-between gap-6 py-3">
          <Link href="/" className="shrink-0">
            <span className="text-xl font-light tracking-wide text-gray-800">
              HERMITAGE<span className="font-semibold">DECOR</span>
            </span>
          </Link>

          {/* Поиск — только на десктопе (ИСПРАВЛЕН) */}
          <form action="/search" method="GET" className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                name="q"
                placeholder="Поиск товаров..."
                className="w-full px-5 py-2.5 pr-12 border border-gray-300 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition bg-white"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400 hover:text-amber-500 transition" />
              </button>
            </div>
          </form>

          {/* Иконки */}
          <div className="flex items-center gap-4 shrink-0">
            <button onClick={() => setIsMobileSearchOpen(true)} className="md:hidden p-1">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            
            <Link href={user ? "/account" : "/login"} className="hidden md:flex flex-col items-center group">
              <User className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition" />
              <span className="text-[11px] text-gray-500 group-hover:text-amber-600 mt-0.5">
                {user ? "Профиль" : "Войти"}
              </span>
            </Link>
            <Link href={user ? "/account" : "/login"} className="md:hidden p-1">
              <User className="w-5 h-5 text-gray-600" />
            </Link>
            
            <Link href="/favorites" className="relative flex flex-col items-center group">
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition" />
              <span className="hidden md:block text-[11px] text-gray-500 group-hover:text-amber-600 mt-0.5">Избранное</span>
              {totalFavorites > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {totalFavorites}
                </span>
              )}
            </Link>
            
            <Link href="/cart" className="relative flex flex-col items-center group">
              <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition" />
              <span className="hidden md:block text-[11px] text-gray-500 group-hover:text-amber-600 mt-0.5">Корзина</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>

        {/* Навигация для десктопа */}
        <nav className="hidden md:flex gap-8 py-2 text-sm font-medium text-gray-700 border-t border-gray-100">
          <a href="#" className="hover:text-amber-600 transition">Каталог</a>
          <div className="relative group">
            <button className="hover:text-amber-600 transition">Комнаты</button>
            <div className="absolute left-0 top-full mt-1 w-[650px] bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Спальня</h4>
                  <ul className="space-y-1 text-sm">
                    <li><Link href="/catalog/spalnya" className="text-gray-600 hover:text-amber-600 block">Все товары</Link></li>
                    <li><Link href="/catalog/spalnya?type=krovati" className="text-gray-600 hover:text-amber-600 block">Кровати</Link></li>
                    <li><Link href="/catalog/spalnya?type=shkafy" className="text-gray-600 hover:text-amber-600 block">Шкафы</Link></li>
                    <li><Link href="/catalog/spalnya?type=tumby" className="text-gray-600 hover:text-amber-600 block">Тумбы</Link></li>
                    <li><Link href="/catalog/spalnya?type=komody" className="text-gray-600 hover:text-amber-600 block">Комоды</Link></li>
                    <li><Link href="/catalog/spalnya?type=zerkala" className="text-gray-600 hover:text-amber-600 block">Зеркала</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Гостиная</h4>
                  <ul className="space-y-1 text-sm">
                    <li><Link href="/catalog/gostinaya" className="text-gray-600 hover:text-amber-600 block">Все товары</Link></li>
                    <li><Link href="/catalog/gostinaya?type=divany" className="text-gray-600 hover:text-amber-600 block">Диваны</Link></li>
                    <li><Link href="/catalog/gostinaya?type=kresla" className="text-gray-600 hover:text-amber-600 block">Кресла</Link></li>
                    <li><Link href="/catalog/gostinaya?type=stoly" className="text-gray-600 hover:text-amber-600 block">Столы</Link></li>
                    <li><Link href="/catalog/gostinaya?type=stellazhi" className="text-gray-600 hover:text-amber-600 block">Стеллажи</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Кухня</h4>
                  <ul className="space-y-1 text-sm">
                    <li><Link href="/catalog/kuhnya" className="text-gray-600 hover:text-amber-600 block">Все товары</Link></li>
                    <li><Link href="/catalog/kuhnya?type=garnitury" className="text-gray-600 hover:text-amber-600 block">Гарнитуры</Link></li>
                    <li><Link href="/catalog/kuhnya?type=stoly" className="text-gray-600 hover:text-amber-600 block">Столы</Link></li>
                    <li><Link href="/catalog/kuhnya?type=stulya" className="text-gray-600 hover:text-amber-600 block">Стулья</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Столовая</h4>
                  <ul className="space-y-1 text-sm">
                    <li><Link href="/catalog/stolovaya" className="text-gray-600 hover:text-amber-600 block">Все товары</Link></li>
                    <li><Link href="/catalog/stolovaya?type=stoly" className="text-gray-600 hover:text-amber-600 block">Столы</Link></li>
                    <li><Link href="/catalog/stolovaya?type=stulya" className="text-gray-600 hover:text-amber-600 block">Стулья</Link></li>
                    <li><Link href="/catalog/stolovaya?type=bufety" className="text-gray-600 hover:text-amber-600 block">Буфеты</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <a href="#" className="hover:text-amber-600 transition">Скидки</a>
          <a href="#" className="hover:text-amber-600 transition">Бренды</a>
          <Link href="/delivery" className="hover:text-amber-600 transition">Доставка</Link>
        </nav>
      </div>

      {/* Мобильный поиск (выезжающий) */}
      {isMobileSearchOpen && (
        <div className="fixed inset-x-0 top-0 z-50 bg-white p-4 shadow-md md:hidden">
          <div className="flex items-center gap-2">
            <form action="/search" method="GET" className="flex-1">
              <input
                type="text"
                name="q"
                placeholder="Поиск товаров..."
                className="w-full px-4 py-2 border border-gray-400 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-500 bg-white"
                autoFocus
              />
            </form>
            <button onClick={() => setIsMobileSearchOpen(false)} className="p-2">
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}