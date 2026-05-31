"use client";

import Link from "next/link";
import { Home, Menu, Tag, Sparkles } from "lucide-react";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function MobileBottomNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
        <div className="flex justify-around items-center py-2">
          <Link href="/" className="flex flex-col items-center gap-0.5">
            <Home className="w-5 h-5 text-gray-600" />
            <span className="text-[10px] text-gray-500">Главная</span>
          </Link>
          
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center gap-0.5"
          >
            <Menu className="w-5 h-5 text-gray-600" />
            <span className="text-[10px] text-gray-500">Каталог</span>
          </button>
          
          <Link href="/catalog/novinki" className="flex flex-col items-center gap-0.5">
            <Sparkles className="w-5 h-5 text-gray-600" />
            <span className="text-[10px] text-gray-500">Новинки</span>
          </Link>
          
          <Link href="/catalog/skidki" className="flex flex-col items-center gap-0.5">
            <Tag className="w-5 h-5 text-gray-600" />
            <span className="text-[10px] text-gray-500">Скидки</span>
          </Link>
        </div>
      </div>

      {/* Каталог (большое меню как на десктопе) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto md:hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Каталог</h2>
            <button onClick={() => setIsMenuOpen(false)} className="p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            {/* Комнаты */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Комнаты</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/catalog/spalnya" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Спальня</span>
                </Link>
                <Link href="/catalog/gostinaya" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Гостиная</span>
                </Link>
                <Link href="/catalog/stolovaya" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Столовая</span>
                </Link>
                <Link href="/catalog/kuhnya" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Кухня</span>
                </Link>
                <Link href="/catalog/myagkaya" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Мягкая мебель</span>
                </Link>
                <Link href="/catalog/posuda" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Посуда</span>
                </Link>
                <Link href="/catalog/aromaty" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Ароматы</span>
                </Link>
                <Link href="/catalog/tekstil" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Текстиль</span>
                </Link>
                <Link href="/catalog/lighting" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Освещение</span>
                </Link>
              </div>
            </div>

            {/* Другие разделы */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Разделы</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/catalog/novinki" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Новинки</span>
                </Link>
                <Link href="/catalog/skidki" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Скидки</span>
                </Link>
                <Link href="/delivery" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Доставка</span>
                </Link>
                <Link href="/favorites" onClick={() => setIsMenuOpen(false)} className="bg-gray-50 p-3 rounded-xl text-center hover:bg-amber-50 transition">
                  <span className="text-gray-800">Избранное</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}