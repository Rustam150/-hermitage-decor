"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Кнопка бургера */}
      <button onClick={toggleMenu} className="p-1">
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* Выезжающее меню */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-lg font-light tracking-wider">
              HERMITAGE<span className="font-bold">DECOR</span>
            </span>
            <button onClick={closeMenu}>
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* Основные ссылки */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Меню</h3>
              <div className="space-y-2">
                <Link href="/" onClick={closeMenu} className="block py-2 text-gray-800 hover:text-amber-600">Главная</Link>
                <Link href="/catalog/spalnya" onClick={closeMenu} className="block py-2 text-gray-800 hover:text-amber-600">Каталог</Link>
                <div className="py-2 text-gray-400 font-medium">Комнаты</div>
                <div className="pl-4 space-y-2">
                  <Link href="/catalog/spalnya" onClick={closeMenu} className="block py-1 text-sm text-gray-600 hover:text-amber-600">Спальня</Link>
                  <Link href="/catalog/gostinaya" onClick={closeMenu} className="block py-1 text-sm text-gray-600 hover:text-amber-600">Гостиная</Link>
                  <Link href="/catalog/stolovaya" onClick={closeMenu} className="block py-1 text-sm text-gray-600 hover:text-amber-600">Столовая</Link>
                  <Link href="/catalog/kuhnya" onClick={closeMenu} className="block py-1 text-sm text-gray-600 hover:text-amber-600">Кухня</Link>
                  <Link href="/catalog/myagkaya" onClick={closeMenu} className="block py-1 text-sm text-gray-600 hover:text-amber-600">Мягкая мебель</Link>
                  <Link href="/catalog/posuda" onClick={closeMenu} className="block py-1 text-sm text-gray-600 hover:text-amber-600">Посуда</Link>
                  <Link href="/catalog/aromaty" onClick={closeMenu} className="block py-1 text-sm text-gray-600 hover:text-amber-600">Ароматы</Link>
                  <Link href="/catalog/tekstil" onClick={closeMenu} className="block py-1 text-sm text-gray-600 hover:text-amber-600">Текстиль</Link>
                  <Link href="/catalog/lighting" onClick={closeMenu} className="block py-1 text-sm text-gray-600 hover:text-amber-600">Освещение</Link>
                  <Link href="/catalog/novinki" onClick={closeMenu} className="block py-1 text-sm text-gray-600 hover:text-amber-600">Новинки</Link>
                  <Link href="/catalog/skidki" onClick={closeMenu} className="block py-1 text-sm text-gray-600 hover:text-amber-600">Скидки</Link>
                </div>
                <Link href="/delivery" onClick={closeMenu} className="block py-2 text-gray-800 hover:text-amber-600">Доставка</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}